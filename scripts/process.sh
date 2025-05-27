#!/bin/bash

# Directory to search
search_dir="/Users/marcpower/git/RPD/public/images"
img_src=~/Downloads/Website_photos/Boundstone
img_dest=~/git/RPD/public/images/farnham

# This image is 2880x1837
identify $img_dest/living-1-2880.webp

# ls $img_src/0mt9ad8vmi3ppd006jay8w.jpg
# ls .

# cwebp -q 80 $img_src/0mt9ad8vmi3ppd006jay8w.jpg -o $img_src/output.webp


# Find all files with "detail" in their name
# find "$search_dir" -type f -name "*detail*" | while read -r file; do
#   echo "{ \"image\": \"$file\" },"
# done
