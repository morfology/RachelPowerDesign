#!/bin/bash
# Usage: ./scripts/test-canonical-urls.sh <base-url> <label> [--use-local-sitemap]
# Script to extract and compare canonical URLs from all pages in sitemap
# Example: ./scripts/test-canonical-urls.sh https://rachelpowerdesign.com live
# Example: ./scripts/test-canonical-urls.sh http://localhost:3000 local
# Example: ./scripts/test-canonical-urls.sh http://localhost:3000 local --use-local-sitemap

set -e

base_url=$1
label=$2
use_local_sitemap=$3

if [[ -z "$base_url" || -z "$label" ]]; then
    echo "Usage: $0 <base-url> <label> [--use-local-sitemap]"
    echo "Example: $0 https://rachelpowerdesign.com live"
    echo "Example: $0 http://localhost:3000 local"
    echo "Example: $0 http://localhost:3000 local --use-local-sitemap"
    echo ""
    echo "Options:"
    echo "  --use-local-sitemap  Use local ./public/sitemap.xml instead of fetching from URL"
    echo "                      (useful for testing local builds before deployment)"
    exit 1
fi

# Remove trailing slash
base_url=${base_url%/}

echo "🔗 Testing canonical URLs from: $base_url"
echo "📝 Saving to: ./.tmp-canonical/$label/"

mkdir -p ./.tmp-canonical/$label

# Function to get sitemap URLs
get_sitemap_urls() {
    local sitemap_file="./.tmp-canonical/$label/sitemap.xml"
    
    if [[ "$use_local_sitemap" == "--use-local-sitemap" ]]; then
        echo "📋 Using local sitemap from ./public/sitemap.xml"
        if [[ ! -f "./public/sitemap.xml" ]]; then
            echo "❌ Local sitemap not found. Please run 'npm run build' first to generate sitemap."
            echo "   Or remove --use-local-sitemap flag to fetch from URL."
            exit 1
        fi
        cp "./public/sitemap.xml" "$sitemap_file"
    else
        echo "📋 Fetching sitemap from: $base_url/sitemap.xml"
        local response=$(curl -s -w "%{http_code}" "$base_url/sitemap.xml" -o "$sitemap_file")
        local http_code="${response: -3}"
        
        if [[ "$http_code" != "200" ]]; then
            echo "❌ Failed to fetch sitemap (HTTP $http_code)"
            echo "   Try using --use-local-sitemap flag or ensure sitemap exists at $base_url/sitemap.xml"
            exit 1
        fi
    fi
    
    # Extract URLs from sitemap
    grep -o '<loc>[^<]*</loc>' "$sitemap_file" | sed 's/<loc>//g; s/<\/loc>//g' > "./.tmp-canonical/$label/sitemap-urls.txt"
    
    local url_count=$(wc -l < "./.tmp-canonical/$label/sitemap-urls.txt")
    echo "✅ Found $url_count URLs in sitemap"
    
    # Clean up sitemap file
    rm "$sitemap_file"
}

# Function to extract canonical URL from a page
extract_canonical() {
    local url=$1
    local file_prefix=$2
    
    # Generate a readable page name from URL
    local page_name=$(echo "$url" | sed "s|$base_url||" | sed 's|^/||' | sed 's|/$||')
    if [[ -z "$page_name" ]]; then
        page_name="Homepage"
    fi
    
    echo "  → Testing: $page_name ($url)"
    
    # Fetch the page and extract canonical URL
    local response=$(curl -s -w "%{http_code}" "$url" -o "./.tmp-canonical/$label/${file_prefix}.html")
    local http_code="${response: -3}"
    
    if [[ "$http_code" == "200" ]]; then
        # Extract canonical URL from link rel="canonical" (Next.js format)
        local canonical_url=$(grep -o '<link rel="canonical" href="[^"]*"' "./.tmp-canonical/$label/${file_prefix}.html" | sed 's/.*href="\([^"]*\).*/\1/' | head -1)
        
        # Fallback: check for canonical with different attribute order
        if [[ -z "$canonical_url" ]]; then
            canonical_url=$(grep -o '<link[^>]*rel="canonical"[^>]*href="[^"]*"' "./.tmp-canonical/$label/${file_prefix}.html" | sed 's/.*href="\([^"]*\).*/\1/' | head -1)
        fi
        
        # Additional fallback: check og:url as secondary canonical reference
        if [[ -z "$canonical_url" ]]; then
            canonical_url=$(grep -o '<meta[^>]*property="og:url"[^>]*content="[^"]*"' "./.tmp-canonical/$label/${file_prefix}.html" | sed 's/.*content="\([^"]*\).*/\1/' | head -1)
        fi
        
        if [[ -n "$canonical_url" ]]; then
            echo "$url|$canonical_url|$page_name" >> "./.tmp-canonical/$label/canonical-urls.txt"
            echo "    ✅ Canonical: $canonical_url"
        else
            echo "$url|MISSING|$page_name" >> "./.tmp-canonical/$label/canonical-urls.txt"
            echo "    ❌ No canonical URL found"
        fi
    else
        echo "$url|ERROR_$http_code|$page_name" >> "./.tmp-canonical/$label/canonical-urls.txt"
        echo "    ❌ HTTP $http_code - Page not found"
    fi
    
    # Clean up HTML file
    rm -f "./.tmp-canonical/$label/${file_prefix}.html"
}

# Get URLs from sitemap
get_sitemap_urls

# Initialize results file
echo "# Canonical URL Test Results for $label environment" > "./.tmp-canonical/$label/canonical-urls.txt"
echo "# Format: PAGE_URL|CANONICAL_URL|PAGE_NAME" >> "./.tmp-canonical/$label/canonical-urls.txt"
echo "" >> "./.tmp-canonical/$label/canonical-urls.txt"

echo ""
echo "🧪 Testing canonical URLs for each page..."

# Test each URL from sitemap
counter=1
while read -r url; do
    # Skip empty lines
    [[ -z "$url" ]] && continue
    
    # Generate file prefix for temporary files
    file_prefix=$(echo "$url" | sed "s|$base_url||" | sed 's|[^a-zA-Z0-9]|_|g' | sed 's/^_//' | sed 's/_$//')
    if [[ -z "$file_prefix" ]]; then
        file_prefix="homepage"
    fi
    
    # Add counter for uniqueness and progress tracking
    file_prefix="${counter}_${file_prefix}"
    
    extract_canonical "$url" "$file_prefix"
    counter=$((counter + 1))
done < "./.tmp-canonical/$label/sitemap-urls.txt"

echo ""
echo "✅ Canonical URL analysis complete!"
echo "📁 Results saved in: ./.tmp-canonical/$label/"

# Generate summary
echo ""
echo "📊 Quick Analysis:"
if [[ -f "./.tmp-canonical/$label/canonical-urls.txt" ]]; then
    total_pages=$(grep -v "^#" "./.tmp-canonical/$label/canonical-urls.txt" | grep -v "^$" | wc -l)
    missing_canonical=$(grep -c "MISSING" "./.tmp-canonical/$label/canonical-urls.txt" || echo "0")
    error_pages=$(grep -c "ERROR_" "./.tmp-canonical/$label/canonical-urls.txt" || echo "0")
    valid_canonical=$((total_pages - missing_canonical - error_pages))
    
    echo "   📄 Total pages tested: $total_pages"
    echo "   ✅ Pages with canonical URLs: $valid_canonical"
    echo "   ❌ Pages missing canonical: $missing_canonical"
    echo "   🚫 Pages with errors: $error_pages"
    
    # Show canonical URL patterns
    echo ""
    echo "🔍 Canonical URL patterns found:"
    grep -v "^#" "./.tmp-canonical/$label/canonical-urls.txt" | grep -v "^$" | grep -v "MISSING\|ERROR_" | \
    cut -d'|' -f2 | sort | uniq -c | sort -nr | while read count pattern; do
        if [[ "$count" -gt 1 ]]; then
            echo "   $pattern (appears $count times)"
        fi
    done
    
    # Check for potential issues
    echo ""
    echo "🔍 Potential Issues:"
    
    # Check for localhost URLs in canonical (should not happen in production)
    localhost_count=$(grep -c "localhost" "./.tmp-canonical/$label/canonical-urls.txt" || echo "0")
    if [[ "$localhost_count" -gt 0 ]]; then
        echo "   ⚠️  Found $localhost_count pages with localhost in canonical URL"
    fi
    
    # Check for HTTP vs HTTPS consistency
    http_count=$(grep -o "http://[^|]*" "./.tmp-canonical/$label/canonical-urls.txt" | wc -l || echo "0")
    https_count=$(grep -o "https://[^|]*" "./.tmp-canonical/$label/canonical-urls.txt" | wc -l || echo "0")
    if [[ "$http_count" -gt 0 && "$https_count" -gt 0 ]]; then
        echo "   ⚠️  Mixed HTTP/HTTPS canonical URLs found"
    fi
    
    # Check for trailing slashes
    trailing_slash_count=$(grep -c "[^/]/|" "./.tmp-canonical/$label/canonical-urls.txt" || echo "0")
    if [[ "$trailing_slash_count" -gt 0 ]]; then
        echo "   ⚠️  Found canonical URLs with trailing slashes"
    fi
fi

echo ""
echo "🔍 To compare with another environment:"
echo "  diff ./.tmp-canonical/live/canonical-urls.txt ./.tmp-canonical/local/canonical-urls.txt"
echo ""
echo "📋 To see detailed results:"
echo "  cat ./.tmp-canonical/$label/canonical-urls.txt"
echo ""
echo "📊 To see which URLs were tested from sitemap:"
echo "  cat ./.tmp-canonical/$label/sitemap-urls.txt"
echo ""
echo "🔧 To test specific page manually:"
echo "  curl -s \"$base_url/about\" | grep -o '<link rel=\"canonical\" href=\"[^\"]*\"'"
echo ""
echo "💡 Usage Tips:"
echo "  • To test local build: npm run build && $0 http://localhost:3000 local --use-local-sitemap"
echo "  • To test live site: $0 https://rachelpowerdesign.com live"
echo "  • All URLs from sitemap.xml are automatically tested"
echo "  • Use --use-local-sitemap to test before deployment"