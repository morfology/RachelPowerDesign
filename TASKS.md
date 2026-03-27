# Astro Site — Outstanding Tasks

## Deployment

- [ ] Deploy to Cloudflare Pages (or repoint Railway to this branch)
- [ ] DNS cutover from Railway (Next.js) to new deployment
- [ ] Verify .co.uk and .com domains both resolve correctly with redirects

## Gallery

- [ ] Rebuild gallery page from scratch
- [ ] Curate gallery image set (images.json currently has 45 valid entries)

## Testing

- [ ] Test interactive components:
  - [ ] Image slider navigation
  - [ ] Contact form submission
  - [ ] Accordion expand/collapse
  - [ ] Search keyboard navigation (Ctrl+K, arrow keys, Enter)
- [ ] Test responsive design at all breakpoints
- [ ] Lighthouse audit (performance, accessibility, SEO)

## Image Optimization (Future)

- [ ] Generate responsive srcset sizes for key images (480w, 960w, 1920w)
- [ ] Consider moving images to `src/assets/` for Astro `<Image />` optimization
- [ ] Add blur-up placeholders for lazy-loaded images

## Nice to Have

- [ ] Implement structured data (JSON-LD) in `<head>` (config exists at `src/config/structured-data.json`)
- [ ] ESLint config update for Astro (currently React/TS only)
