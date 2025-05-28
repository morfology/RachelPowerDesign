# Google webp script
WebP really helps

- Install 
  - `brew install webp`.
- Set quality to 80% and export
  - `cwebp -q 80 input.jpg -o output.webp`



# Imagemagick
Use to output sizes etc.

- `imagemagick`
- `convert`

# Blur an Image File

- (Sqoosh)[https://sqoosh.app] the file
  - Make it really small and blurry

- Convert to Base 64
`base64 -i living-1-blur.jpg`

- Then Prefix with the MIME type e.g. `data:image/webp;base64,Abc...`

- Then add this to the `blurDataURL`

