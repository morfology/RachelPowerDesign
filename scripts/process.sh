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

processChipsteadImg() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: processChipstead <srcname e.g. UK_1> <destname e.g. hall>  <width e.g. 1200>"
    return 1
  fi
  processImg "$img_src/Chipstead/Hazelwood Ln, Chipstead, Coulsdon, $1.jpg" $img_dest/chipstead/$2 $3
}

processChipsteadImg UK_1 hall $IDEAL_LARGE


















# Process images for the 'farnham' project
# processImg "$img_src/Boundstone/0mt9ad8vmi3ppd006jay8w.jpg" $img_dest/farnham/hero $IDEAL_HERO
# processImg "$img_src/Boundstone/2qfiy6jyzatzd2u39lvd4o.jpg" $img_dest/farnham/hallway $IDEAL_LARGE_PORTRAIT
# processImg "$img_src/Boundstone/4wqxncun6lj7ue67rikm69.jpg" $img_dest/farnham/kitchen-sink $IDEAL_LARGE
# processImg "$img_src/Boundstone/0mt9ad8vmi3ppd006jay8w.jpg" $img_dest/farnham/living-1 $IDEAL_LARGE
# processImg "$img_src/Boundstone/8g8mjq2oztq242adyxenvl.jpg" $img_dest/farnham/diner $IDEAL_LARGE
# processImg "$img_src/Boundstone/8ifa2ry7oo6ewqaj63crrb.jpg" $img_dest/farnham/kids $IDEAL_LARGE
# processImg "$img_src/Boundstone/bcm0jkn4a6gwpon4088rw.jpg" $img_dest/farnham/snug $IDEAL_LARGE
# processImg "$img_src/Boundstone/c78xcjgggntoxd204dzsm.jpg" $img_dest/farnham/kids-2 $IDEAL_LARGE
# processImg "$img_src/Boundstone/ch9wwez7v3wp5yvcb9w12k.jpg" $img_dest/farnham/rainbow $IDEAL_LARGE
# processImg "$img_src/Boundstone/d52bc0hvadke3fo4hzw3bp.jpg" $img_dest/farnham/teepee $IDEAL_LARGE
# processImg "$img_src/Boundstone/eh8d1nri61kt0744wmttm.jpg" $img_dest/farnham/living-2 $IDEAL_LARGE
# processImg "$img_src/Boundstone/eydg6idp6ch8k5z8bo41c6.jpg" $img_dest/farnham/kitchen $IDEAL_LARGE
# processImg "$img_src/Boundstone/gldmw8xhckt4qspl8dg88k.jpg" $img_dest/farnham/bathroom $IDEAL_LARGE
# processImg "$img_src/Boundstone/gso0m56wyaqo47sz8d0g1.jpg" $img_dest/farnham/living-3 $IDEAL_LARGE
# processImg "$img_src/Boundstone/jy178mm8viwlgijld1hmc.jpg" $img_dest/farnham/bed $IDEAL_LARGE
# processImg "$img_src/Boundstone/m553ii51dfn9e7q3scws6.jpg" $img_dest/farnham/kitchen-2 $IDEAL_LARGE
# processImg "$img_src/Boundstone/mwgsi3p7rkenyyrep7nkag.jpg" $img_dest/farnham/seating $IDEAL_LARGE
# processImg "$img_src/Boundstone/n4d8c9wyn6t4f5ggt8rts.jpg" $img_dest/farnham/wardrobe $IDEAL_LARGE
# processImg "$img_src/Boundstone/pucu2t8whhovgkjv1xmbeg.jpg" $img_dest/farnham/seating-2 $IDEAL_LARGE
# processImg "$img_src/Boundstone/qf8exy78y92q59b5f7dt3.jpg" $img_dest/farnham/bathroom $IDEAL_LARGE
# processImg "$img_src/Boundstone/rciwj4vsctpvb861xj1n.jpg" $img_dest/farnham/kichen-3 $IDEAL_LARGE
# processImg "$img_src/Boundstone/sggc2cbgxkvbtaj3ws2v.jpg" $img_dest/farnham/loo $IDEAL_LARGE
# processImg "$img_src/Boundstone/yi428v97ynkkq5piahqjn.jpg" $img_dest/farnham/kids-3 $IDEAL_LARGE

# processImg "$img_src/Boundstone/new.jpg" $img_dest/farnham/new $IDEAL_LARGE
# processImg "$img_src/Boundstone/new.jpg" $img_dest/farnham/new $IDEAL_LARGE
