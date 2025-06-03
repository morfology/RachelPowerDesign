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
IDEAL_HERO=2880
IDEAL_LARGE='1200'
IDEAL_LARGE_PORTRAIT='x800'


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

processJpg() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: processImg <source_file_name> <dest_file_base> <width>"
    return 1
  fi

  width="$3"
  src="$1"
  dest="$2-$width.jpg"

  rm -f $dest
  magick  "$src" -resize "$width" "$dest"
  identify $dest
}


processChipsteadImg() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: processChipstead <srcname e.g. UK_1> <destname e.g. hall>  <width e.g. 1200>"
    return 1
  fi
  processImg "$img_src/Chipstead/Hazelwood Ln, Chipstead, Coulsdon, $1.jpg" $img_dest/chipstead/$2 $3
}

processLodgeImg() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: processLodge <srcname e.g. UK_1> <destname e.g. hall>  <width e.g. 1200>"
    return 1
  fi
  processImg "$img_dest/lodge-hill/$1.jpg" $img_dest/lodge-hill-rd/$1 $3
}

processHorshamImg() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: processHorshamImg <srcno e.g. 01> <destname e.g. hall>  <width e.g. 1200>"
    return 1
  fi
  processImg "$img_src/Horsham/1 Tennyson Cl, Horsham RH12 5PN, UK_$1.jpg" $img_dest/horsham/$2 $3
}

processLarkfieldJpg() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: processLarkfieldImg <srcno e.g. 01> <destname e.g. hall>  <width e.g. 1200>"
    return 1
  fi
  processJpg "$img_src/Larkfield/RPDesign_-$1.jpg" $img_dest/larkfield/$2 $3
}

processMarciaImg() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: processMarciaImg <srcno e.g. 01> <destname e.g. hall>  <width e.g. 1200>"
    return 1
  fi
  processJpg "$img_src/Marcia/RPDesign Marcia's Home_-$1.jpg" $img_dest/marcia/$2 $3
}



processImg "$img_src/Chipstead/Hazelwood Ln, Chipstead, Coulsdon, UK_3 copy.jpg" $img_dest/chipstead/fireplace-crop $IDEAL_LARGE_PORTRAIT


# processLarkfieldJpg 32 pots-square $IDEAL_LARGE_PORTRAIT

# processMarciaImg 18 dining $IDEAL_LARGE_PORTRAIT


# processLodgeImg dressing-room-1 dummy $IDEAL_LARGE_PORTRAIT

# processImg "$img_dest/lodge-hill/detail-drawings.jpg" $img_dest/farnham/plans $IDEAL_LARGE_PORTRAIT
# processImg "$img_dest/lodge-hill/gues-room-detail-ls.jpg" $img_dest/farnham/fox $IDEAL_LARGE_PORTRAIT
# processImg "$img_dest/lodge-hill/detail-ceiling.jpg" $img_dest/farnham/detail-ceiling $IDEAL_LARGE_PORTRAIT



# Process portrait images for the 'farnham' project
# processImg "$img_src/Boundstone/7e2dkf6qcawnyn29udi20b.jpg" $img_dest/farnham/kids $IDEAL_LARGE_PORTRAIT
# processImg "$img_src/Boundstone/acm4q77c5bh8hmyjnvnua7.jpg" $img_dest/farnham/kids-2 $IDEAL_LARGE_PORTRAIT
# processImg "$img_src/Boundstone/c18fxubfuyekqgj7q4srn8.jpg" $img_dest/farnham/bathroom-shower $IDEAL_LARGE_PORTRAIT
# processImg "$img_src/Boundstone/e3j2dojhld2s4a21jp2g8.jpg" $img_dest/farnham/stairwell $IDEAL_LARGE_PORTRAIT
# processImg "$img_src/Boundstone/ji5gxfoj54efrkmhfgsym.jpg" $img_dest/farnham/bathroom $IDEAL_LARGE_PORTRAIT
# processImg "$img_src/Boundstone/l3klu8hx4vir6zqwxfpz2j.jpg" $img_dest/farnham/bathroom-shower-2 $IDEAL_LARGE_PORTRAIT
# processImg "$img_src/Boundstone/lcbgvb11b11op8hdfaa0h.jpg" $img_dest/farnham/snug $IDEAL_LARGE_PORTRAIT
# processImg "$img_src/Boundstone/y213eigq9txro955f3yin.jpg" $img_dest/farnham/snug-2 $IDEAL_LARGE_PORTRAIT
# processImg "$img_src/Boundstone/q341pouzdvmjqt8n817mq.jpg" $img_dest/farnham/kids-3 $IDEAL_LARGE_PORTRAIT

