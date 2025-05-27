# Image Sizes

## Next

Even with Next best not to bloat.

| Use Case                      | Ideal Source Width          | Why                                            |
| ----------------------------- | --------------------------- | ---------------------------------------------- |
| **Hero image**                | \~2880px max                | High-res + full-width on desktops/retina       |
| **Full-width content images** | 1600–1920px                 | For sharp visuals, keeps build size reasonable |
| **Half-width / grid images**  | 800–1200px                  | Plenty of room for responsive needs            |
| **Thumbnails**                | 400–600px                   | Avoid massive source files here                |
| **Icons / logos**             | Vector (SVG) or \~100–300px | Tiny, crisp, and fast                          |


## 💡  If Not Using next/image
Then yes — 2880px is probably overkill, and you should export versions like:

1920.webp (desktop max)
1280.webp (laptop/tablet)
768.webp (mobile)

And use srcset.
