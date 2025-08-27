#!/bin/bash
# Usage: ./scripts/test-sitemap.sh <base-url> <label>
# Script to fetch and compare sitemap.xml and robots.txt files
# Example: ./scripts/test-sitemap.sh https://rachelpowerdesign.com live
# Example: ./scripts/test-sitemap.sh http://localhost:3000 local

set -e

base_url=$1
label=$2

if [[ -z "$base_url" || -z "$label" ]]; then
    echo "Usage: $0 <base-url> <label>"
    echo "Example: $0 https://rachelpowerdesign.com live"
    echo "Example: $0 http://localhost:3000 local"
    exit 1
fi

# Remove trailing slash
base_url=${base_url%/}

echo "🗺️  Fetching sitemap files from: $base_url"
echo "📝 Saving to: ./.tmp-sitemap/$label/"

mkdir -p ./.tmp-sitemap/$label

# Function to fetch and format XML/text files
fetch_file() {
    local url=$1
    local filename=$2
    local file_type=$3
    echo "  → $url"
    
    local response=$(curl -s -w "%{http_code}" "$url" -o "./.tmp-sitemap/$label/$filename.raw")
    local http_code="${response: -3}"
    
    if [[ "$http_code" == "200" ]]; then
        if [[ "$file_type" == "xml" ]]; then
            # Format XML nicely and extract URLs with priorities
            xmllint --format "./.tmp-sitemap/$label/$filename.raw" > "./.tmp-sitemap/$label/$filename" 2>/dev/null || {
                # Fallback if xmllint is not available
                cat "./.tmp-sitemap/$label/$filename.raw" > "./.tmp-sitemap/$label/$filename"
            }
            
            # Extract URL summary for easy comparison
            grep -o '<loc>[^<]*</loc>' "./.tmp-sitemap/$label/$filename.raw" | \
            sed 's/<loc>//g; s/<\/loc>//g' | \
            sort > "./.tmp-sitemap/$label/${filename}-urls.txt"
            
            # Extract priorities and change frequencies
            grep -E '<(loc|priority|changefreq)>' "./.tmp-sitemap/$label/$filename.raw" | \
            paste - - - | \
            sed 's/<loc>//g; s/<\/loc>//g; s/<priority>//g; s/<\/priority>//g; s/<changefreq>//g; s/<\/changefreq>//g' | \
            sort > "./.tmp-sitemap/$label/${filename}-summary.txt"
            
            local url_count=$(wc -l < "./.tmp-sitemap/$label/${filename}-urls.txt")
            echo "    ✅ $url_count URLs found and formatted"
        else
            # Handle robots.txt
            cat "./.tmp-sitemap/$label/$filename.raw" | \
            sort > "./.tmp-sitemap/$label/$filename"
            
            local line_count=$(wc -l < "./.tmp-sitemap/$label/$filename")
            echo "    ✅ $line_count lines saved"
        fi
        
        rm "./.tmp-sitemap/$label/$filename.raw"
    else
        echo "    ❌ HTTP $http_code - File not found"
        echo "HTTP $http_code - Not found" > "./.tmp-sitemap/$label/$filename"
    fi
}

# Fetch sitemap.xml
fetch_file "$base_url/sitemap.xml" "sitemap.xml" "xml"

# Fetch robots.txt  
fetch_file "$base_url/robots.txt" "robots.txt" "txt"

# If this is local, normalize URLs for better comparison
if [[ "$label" == "local" ]]; then
    echo "🔄 Normalizing URLs for comparison..."
    if [[ -f "./.tmp-sitemap/$label/sitemap.xml" ]]; then
        sed -i '' 's|http://localhost:300[0-9]|https://rachelpowerdesign.com|g' ./.tmp-sitemap/$label/sitemap*.* 2>/dev/null || true
    fi
    if [[ -f "./.tmp-sitemap/$label/robots.txt" ]]; then
        sed -i '' 's|http://localhost:300[0-9]|https://rachelpowerdesign.com|g' ./.tmp-sitemap/$label/robots.txt 2>/dev/null || true
    fi
    echo "   ✅ URLs normalized"
fi

echo ""
echo "✅ Sitemap analysis complete!"
echo "📁 Files saved in: ./.tmp-sitemap/$label/"
echo ""
echo "📊 Quick Analysis:"
if [[ -f "./.tmp-sitemap/$label/sitemap.xml-urls.txt" ]]; then
    url_count=$(wc -l < "./.tmp-sitemap/$label/sitemap.xml-urls.txt")
    echo "   📄 Total URLs in sitemap: $url_count"
    
    # Show priority distribution
    if [[ -f "./.tmp-sitemap/$label/sitemap.xml-summary.txt" ]]; then
        echo "   🎯 Priority distribution:"
        awk '{print $2}' "./.tmp-sitemap/$label/sitemap.xml-summary.txt" | sort | uniq -c | sort -nr | while read count priority; do
            echo "      Priority $priority: $count URLs"
        done
        
        echo "   ⏰ Change frequency distribution:"
        awk '{print $3}' "./.tmp-sitemap/$label/sitemap.xml-summary.txt" | sort | uniq -c | sort -nr | while read count freq; do
            echo "      $freq: $count URLs"
        done
    fi
fi
echo ""
echo "🔍 To compare with another environment:"
echo "  git diff --no-index ./.tmp-sitemap/live/sitemap.xml ./.tmp-sitemap/local/sitemap.xml"
echo "  git diff --no-index ./.tmp-sitemap/live/robots.txt ./.tmp-sitemap/local/robots.txt"
echo ""
echo "📋 To see URL lists:"
echo "  diff ./.tmp-sitemap/live/sitemap.xml-urls.txt ./.tmp-sitemap/local/sitemap.xml-urls.txt"
echo ""
echo "📊 To see priority/frequency changes:"
echo "  diff ./.tmp-sitemap/live/sitemap.xml-summary.txt ./.tmp-sitemap/local/sitemap.xml-summary.txt"