#!/bin/bash

base_dir=~/git/RPD/public/images

function find_images() {
  if [ -z "$1" ]; then
    echo "Usage: find_images <subdirectory>"
    return 1
  fi
  
  find "$base_dir/$1" -type f -name "*webp" | while read -r file; do
    echo " - $file" | sed 's|.*\(/images.*\)| - \1|'
  done
}

# find_images "farnham"
find_images "chipstead"
