#!/bin/bash

# Directory to search
img_src=~/Downloads/Website_photos/Boundstone
img_dest=~/git/RPD/public/images/farnham

myfn() {
  if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "Usage: myfn <source_file_name> <dest_file_base> <width>"
    return 1
  fi

  width="$3"
  src="$img_src/$1"
  dest="$img_src/$2-$width.webp"

  rm -f $dest
  magick  "$src" -resize "$width" "$dest"
  identify $dest
  # echo "✅ Converted $src → $dest at width $width px"
}


# ls $img_src/0mt9ad8vmi3ppd006jay8w.jpg
# ls .

# cwebp -q 80 $img_src/0mt9ad8vmi3ppd006jay8w.jpg -o $img_src/output.webp

myfn 0mt9ad8vmi3ppd006jay8w.jpg output "2880"
