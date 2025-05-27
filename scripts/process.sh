#!/bin/bash

# Directory to search
img_src=~/Downloads/Website_photos
img_dest=~/git/RPD/public/images

myfn() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: myfn <source_file_name> <dest_file_base> <width>"
    return 1
  fi

  width="$3"
  src="$1"
  dest="$2-$width.webp"

  rm -f $dest
  magick  "$src" -resize "$width" "$dest"
  identify $dest
}


myfn "$img_src/Boundstone/0mt9ad8vmi3ppd006jay8w.jpg" $img_dest/farnham/hero "2880"
