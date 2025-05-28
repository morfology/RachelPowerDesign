# Image Sizes

## Next

Even with Next best not to bloat.

| Use Case                      | Ideal Source Width (Landscape) | Ideal Source Height (Portrait) | Notes                                                                             |
| ----------------------------- | ------------------------------ | ------------------------------ | --------------------------------------------------------------------------------- |
| **Hero image**                | \~2880px max                   | \~1600-1800px max              | Wide heroes get full-width; portrait heroes use height cap to avoid excess height |
| **Full-width content images** | 1600–1920px                    | 900–1200px                     | Balance sharpness and file size                                                   |
| **Half-width / grid images**  | 800–1200px                     | 800–1000px                     | Grid can handle a bit more height for portraits                                   |
| **Thumbnails**                | 400–600px                      | 400–600px                      | Keep thumbnails square-ish or max height same as width                            |
| **Icons / logos**             | Vector (SVG) or \~100–300px    | Vector (SVG) or \~100–300px    | Vector preferred, else small raster images                                        |


## 💡  If Not Using next/image
Then yes — 2880px is probably overkill, and you should export versions like:

1920.webp (desktop max)
1280.webp (laptop/tablet)
768.webp (mobile)

And use srcset.
