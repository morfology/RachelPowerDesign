#!/bin/bash
# Usage: ./scripts/test-meta-tags.sh <base-url> <label>
# Simple script to fetch and save meta tags for easy diffing
# Example: ./scripts/test-meta-tags.sh https://rachelpowerdesign.com live
# Example: ./scripts/test-meta-tags.sh http://localhost:3000 local

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

echo "🔍 Fetching meta tags from: $base_url"
echo "📝 Saving to: ./.tmp/$label/"

mkdir -p ./.tmp/$label

# Function to extract meta tags from HTML
extract_meta() {
    local url=$1
    local filename=$2
    echo "  → $url"
    
    curl -s -L "$url" | \
    grep -i '<meta' | \
    sed 's/^[[:space:]]*//' | \
    sort > "./.tmp/$label/$filename"
    
    if [[ ! -s "./.tmp/$label/$filename" ]]; then
        echo "    ⚠️  No meta tags found"
    else
        local count=$(wc -l < "./.tmp/$label/$filename")
        echo "    ✅ $count meta tags saved"
    fi
}

# Test key pages
declare -A pages=(
    ["home"]=""
    ["about"]="/about"
    ["services"]="/services" 
    ["projects"]="/projects"
    ["contact"]="/contact"
    ["gallery"]="/gallery"
    ["categories"]="/categories"
    ["tags"]="/tags"
)

for page_name in "${!pages[@]}"; do
    extract_meta "$base_url${pages[$page_name]}" "$page_name.txt"
done

echo ""
echo "✅ Meta tag extraction complete!"
echo "📁 Files saved in: ./.tmp/$label/"
echo ""
echo "To compare with another environment:"
echo "  diff ./.tmp/live/home.txt ./.tmp/local/home.txt"
echo ""
echo "To see all meta descriptions:"
echo "  grep -i 'name=\"description\"' ./.tmp/$label/*.txt"
