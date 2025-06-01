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

# processMarciaImg 3_2 light-detail $IDEAL_LARGE
# processMarciaImg 5 utility $IDEAL_LARGE
# processMarciaImg 7 bedroom $IDEAL_LARGE
# processMarciaImg 11 living $IDEAL_LARGE
# processMarciaImg 12_2 dining $IDEAL_LARGE
# processMarciaImg 12 kids $IDEAL_LARGE
# processMarciaImg 13_2 sitting $IDEAL_LARGE
processMarciaImg 14 kitchen $IDEAL_LARGE
processMarciaImg 15_2 chair-detail $IDEAL_LARGE
processMarciaImg 16_2 living-2 $IDEAL_LARGE


# Process images for the 'larkfield' project
# processLarkfieldJpg 16 lamp-detail $IDEAL_LARGE
# processLarkfieldJpg 23 hall $IDEAL_LARGE

# Process images for the 'chipstead' project
# processHorshamImg 01 living $IDEAL_LARGE
# processHorshamImg 02 kitchen-diner $IDEAL_LARGE
# processHorshamImg 03 kitchen $IDEAL_LARGE
# processHorshamImg 04 living-2 $IDEAL_LARGE
# processHorshamImg 05 bedroom $IDEAL_LARGE
# processHorshamImg 06 bedroom-2 $IDEAL_LARGE
# processHorshamImg 07 bathroom $IDEAL_LARGE
# processHorshamImg 08 bedroom-3 $IDEAL_LARGE
# processHorshamImg 09 bedroom-4 $IDEAL_LARGE
# processHorshamImg 10 dressing $IDEAL_LARGE
# processHorshamImg 11 dressing-2 $IDEAL_LARGE
# processHorshamImg 12 bedroom-5 $IDEAL_LARGE
# processHorshamImg 13 bedroom-6 $IDEAL_LARGE
# processHorshamImg 14 stairwell $IDEAL_LARGE
# processHorshamImg 15 snug $IDEAL_LARGE
# processHorshamImg 16 snug-1 $IDEAL_LARGE
# processHorshamImg 17 fireplace $IDEAL_LARGE
# processHorshamImg 18 winerack $IDEAL_LARGE
# processHorshamImg 19 gym $IDEAL_LARGE
# processHorshamImg 20 bedroom-7 $IDEAL_LARGE
# processHorshamImg 21 dressing-3 $IDEAL_LARGE
# processHorshamImg 22 bedroom-8 $IDEAL_LARGE
# processHorshamImg 23 bathroom-2 $IDEAL_LARGE
# processHorshamImg 24 living-3 $IDEAL_LARGE
# processHorshamImg 25 fireplace-2 $IDEAL_LARGE



# Process lodge hill images
# processLodgeImg dressing-room-1 dummy $IDEAL_LARGE
# processLodgeImg dressing-room-1 dummy $IDEAL_LARGE
# processLodgeImg freyas-room dummy $IDEAL_LARGE
# processLodgeImg guest-bedroom dummy $IDEAL_LARGE
# processLodgeImg kitchen-dining-1 dummy $IDEAL_LARGE
# processLodgeImg kitchen dummy $IDEAL_LARGE
# processLodgeImg living-room-1 dummy $IDEAL_LARGE
# processLodgeImg living-room-2 dummy $IDEAL_LARGE
# processLodgeImg living-room-3 dummy $IDEAL_LARGE
# processLodgeImg living-room-4 dummy $IDEAL_LARGE
# processLodgeImg master-bedroom-1 dummy $IDEAL_LARGE
# processLodgeImg master-bedroom-2 dummy $IDEAL_LARGE
# processLodgeImg master-bedroom-3 dummy $IDEAL_LARGE
# processLodgeImg master-bedroom-4 dummy $IDEAL_LARGE
# processLodgeImg Ollie-Room-9 dummy $IDEAL_LARGE
# processLodgeImg kitchen-1 dummy $IDEAL_LARGE
# processLodgeImg kitchen-2 dummy $IDEAL_LARGE
# processLodgeImg kitchen-3 dummy $IDEAL_LARGE
# processLodgeImg kitchen-4 dummy $IDEAL_LARGE
# processLodgeImg kitchen-5 dummy $IDEAL_LARGE
# processLodgeImg kitchen-6 dummy $IDEAL_LARGE
# processLodgeImg kitchen-7 dummy $IDEAL_LARGE
# processLodgeImg kitchen-8 dummy $IDEAL_LARGE
# processLodgeImg kitchen-9 dummy $IDEAL_LARGE

# Process images for the 'chipstead' project
# processChipsteadImg UK_1 hall $IDEAL_LARGE
# processChipsteadImg UK_2 living $IDEAL_LARGE
# processChipsteadImg UK_3 fireplace $IDEAL_LARGE
# processChipsteadImg UK_4 kitchen $IDEAL_LARGE
# processChipsteadImg UK_5 bathroom $IDEAL_LARGE
# processChipsteadImg UK_6 bathroom-2 $IDEAL_LARGE
# processChipsteadImg UK_7 bathroom-3 $IDEAL_LARGE
# processChipsteadImg UK_8 snug $IDEAL_LARGE
# processChipsteadImg UK_10 snug-2 $IDEAL_LARGE
# processChipsteadImg UK_11 kitchen-2 $IDEAL_LARGE
# processChipsteadImg UK_12 living-2 $IDEAL_LARGE
# processChipsteadImg UK_13 window-seat $IDEAL_LARGE
# processChipsteadImg UK_14 living-3 $IDEAL_LARGE
# processChipsteadImg UK_15 snug-3 $IDEAL_LARGE
# processChipsteadImg UK_17 stairwell $IDEAL_LARGE
# processChipsteadImg UK_19 bedroom $IDEAL_LARGE
# processChipsteadImg UK_20 bathroom-4 $IDEAL_LARGE
# processChipsteadImg UK_21 bathroom-5 $IDEAL_LARGE
# processChipsteadImg UK_22 makeup $IDEAL_LARGE
# processChipsteadImg UK_23 bathroom-6 $IDEAL_LARGE
# processChipsteadImg UK_24 kids $IDEAL_LARGE
# processChipsteadImg UK_26 kids-2 $IDEAL_LARGE
# processChipsteadImg UK_27 kids-3 $IDEAL_LARGE
# processChipsteadImg UK_28 bathroom-7 $IDEAL_LARGE
# processChipsteadImg UK_30 gym $IDEAL_LARGE
# processChipsteadImg UK_37 bedroom-detail-light $IDEAL_LARGE
# processChipsteadImg UK_38 bedroom-detail-wardrobe $IDEAL_LARGE


















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
