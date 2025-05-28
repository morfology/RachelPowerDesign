#!/bin/bash

# This script processes images using ImageMagick.
# It resizes images to a specified width and saves them in a destination directory.
# Ensure ImageMagick is installed
# Usage: processImg <source_file_name> <dest_file_base> <width>
if ! command -v magick &> /dev/null; then
  echo "ImageMagick is not installed. Please install it to use this script."
  exit 1
fi

# Constants
IDEAL_HERO_WIDTH=2880
IDEAL_MEDIUM='1200'
IDEAL_MEDIUM_PORTRAIT='x800'


# Ensure the source and destination directories are set correctly
# You can change these paths as needed 
img_src=~/Downloads/Website_photos
img_dest=~/git/RPD/public/images

processImg() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: processImg <source_file_name> <dest_file_base> <width>"
    return 1
  fi

  width="$3"
  src="$1"
  dest="$2-$width.webp"

  rm -f $dest
  magick  "$src" -resize "$width" "$dest"
  identify $dest
}


# processImg "$img_src/Boundstone/0mt9ad8vmi3ppd006jay8w.jpg" $img_dest/farnham/hero "2880"
# processImg "$img_src/Boundstone/2qfiy6jyzatzd2u39lvd4o.jpg" $img_dest/farnham/hallway $IDEAL_MEDIUM_PORTRAIT

processImg "$img_src/Boundstone/4wqxncun6lj7ue67rikm69.jpg" $img_dest/farnham/kitchen-sink $IDEAL_MEDIUM
