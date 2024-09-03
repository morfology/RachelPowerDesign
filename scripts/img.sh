#!/bin/bash

# Directory to search
search_dir="/Users/marcpower/git/RPD/public/images"

# Find all files with "detail" in their name
find "$search_dir" -type f -name "*detail*" | while read -r file; do
  echo "{ \"image\": \"$file\" },"
done
