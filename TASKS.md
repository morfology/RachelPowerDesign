# Migration Tasks: Next.js → Astro

## Phase 1: Project Setup

- [x] Initialize new Astro project alongside existing Next.js code
- [x] Install core dependencies: `astro`, `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/mdx`, `@astrojs/sitemap`
- [x] Install React dependencies: `react`, `react-dom`, `@types/react`
- [x] Configure `astro.config.mjs` (React integration, Tailwind, sitemap, MDX)
- [x] Copy and adapt `tailwind.config.js` for Astro (colors, fonts, plugins)
- [x] Set up `tsconfig.json` for Astro
- [x] Configure Google Fonts (Open Sans, Oswald) in base layout

## Phase 2: Content Collections

- [x] Define content collection schemas in `src/content/config.ts`
  - [x] `projects` schema (heading, title, description, date, draft, author, image, categories, tags, button, slideshow, folder)
  - [x] `services` schema
  - [x] `pages` schema (about, privacy-policy, cookies, elements, etc.)
  - [x] `homepage` schema
  - [x] `sections` schema (call-to-action blocks)
  - [x] `contact` schema
  - [x] `gallery` schema
  - [x] `categories` schema
  - [x] `tags` schema
- [x] Validate all existing markdown files parse against new schemas
- [x] Migrate `config.json` site settings to Astro-compatible config

## Phase 3: Base Layouts

- [x] Create `src/layouts/BaseLayout.astro` (replaces `src/app/layout.tsx`)
  - [x] HTML `<head>` with meta tags, OG tags, canonical URLs
  - [x] Google Tag Manager script
  - [x] Font loading
  - [ ] Dark mode inline script (replaces ThemeProvider/next-themes)
- [x] Convert `Header` to `Header.astro` with vanilla JS mobile menu
- [x] Convert `Footer` to `Footer.astro` (static component)
- [x] Convert `PageHeader` to `PageHeader.astro`
- [x] Implement `CookieBanner.astro` with vanilla JS (localStorage)
- [ ] Port `TwSizeIndicator` for dev mode

## Phase 4: Static Components

- [x] Convert `ProjectCard.tsx` → `ProjectCard.astro`
- [x] Convert `Pagination.tsx` → `Pagination.astro`
- [x] Convert `CallToAction.tsx` → `CallToAction.astro`
- [x] Convert `Social.tsx` → integrated into `Footer.astro`

## Phase 5: Interactive Islands (Keep as React)

- [x] Port `ImageSlider.tsx` as React island (`client:visible`) with Swiper
- [x] Port `SearchModal.tsx` as React island (`client:load`)
- [x] Port `SearchResult.tsx` as React sub-component of SearchModal
- [x] Port `ContactForm.tsx` as React island (`client:visible`)
  - [x] Retain Formik form handling
  - [x] Retain POST to `https://form-handler-production.up.railway.app/submit-form`
- [x] Port `Grid.tsx` (lazy-loading gallery) as React island (`client:visible`)

## Phase 6: Shortcodes / MDX Components

- [x] Convert `Accordion.tsx` → `Accordion.astro` (uses `<details>`/`<summary>`)
- [x] Convert `Button.tsx` → `Button.astro`
- [x] Convert `Notice.tsx` → `Notice.astro`
- [x] Convert `Testimonial.tsx` → `Testimonial.astro`
- [x] Set up MDX imports in `.mdx` content files
- [x] Rename shortcode-using `.md` files to `.mdx`

## Phase 7: Page Routes

- [x] `/` — Homepage (`src/pages/index.astro`)
- [x] `/about` — About page (`src/pages/about.astro`)
- [x] `/services` — Services listing (`src/pages/services/index.astro`)
- [x] `/services/[slug]` — Individual service pages (`src/pages/services/[slug].astro`)
- [x] `/projects` — Projects listing (`src/pages/projects/index.astro`)
- [x] `/projects/[slug]` — Individual project pages (`src/pages/projects/[slug].astro`)
- [x] `/projects/page/[page]` — Paginated project listing (`src/pages/projects/page/[page].astro`)
- [x] `/contact` — Contact page (`src/pages/contact.astro`)
- [x] `/gallery` — Gallery page (`src/pages/gallery.astro`)
- [x] `/categories` — Categories listing (`src/pages/categories/index.astro`)
- [x] `/categories/[slug]` — Category pages (`src/pages/categories/[slug].astro`)
- [x] `/tags` — Tags listing (`src/pages/tags/index.astro`)
- [x] `/tags/[slug]` — Tag pages (`src/pages/tags/[slug].astro`)
- [x] `/[slug]` — Catch-all for static pages (privacy-policy, cookies, elements)

## Phase 8: Images

- [x] Add `loading="lazy"`, `decoding="async"`, explicit `width`/`height` to all `<img>` tags
- [x] Hero image: `fetchpriority="high"` + eager loading (above the fold)
- [x] Ensure slideshow images in project pages work with ImageSlider island
- [ ] **Convert 186 JPG/PNG files to WebP** (~240 MB → ~45 MB estimated)
  - Currently: 147 `.jpg` + 22 `.JPG` + 16 `.png` + 1 `.jpeg` = 186 files, 240 MB total, avg 1.3 MB each
  - Already WebP: 116 files, 26 MB total, avg 225 KB each — ~6x smaller
  - Run: `find public/images -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" | while read f; do cwebp -q 80 "$f" -o "${f%.*}.webp" && rm "$f"; done`
  - Then update any frontmatter/config referencing `.jpg`/`.png` paths to `.webp`
- [ ] **Generate responsive srcset sizes** for key images (hero, project cards, gallery)
  - Create 3 sizes per image: 480w, 960w, 1920w
  - Use `<picture>` element with `srcset` and `sizes` attributes
  - Consider a build-time script using `sharp` to batch-generate sizes
- [ ] **Move images to `src/assets/`** for Astro `<Image />` optimization (optional)
  - Astro only optimizes images imported from `src/`, not `public/`
  - Would enable automatic format conversion, responsive srcset, and blur placeholders
  - Requires updating all image references from `/images/...` to imports
  - Biggest win for build-time optimization but largest refactoring effort
- [ ] **Add blur-up placeholder** for lazy-loaded images (improves perceived performance)
  - Generate tiny base64 thumbnails (e.g., 20px wide) at build time
  - Show as CSS background while full image loads

## Phase 9: Search

- [x] Generate search data from content collections at build time (in BaseLayout)
- [x] Integrate SearchModal React island with search data prop
- [ ] Test keyboard navigation (Ctrl+K, arrow keys, Enter)

## Phase 10: SEO & Meta

- [x] Port `generateMetadata()` logic to Astro `<head>` in layouts
- [x] Set up canonical URLs using `Astro.url`
- [x] Configure `@astrojs/sitemap` with correct site URL
- [x] Port OG image defaults (`/images/og-default.png`)
- [x] Title template: `%s | Rachel Power Design`
- [ ] Implement structured data (JSON-LD) in head

## Phase 11: Analytics & Tracking

- [x] Add Google Tag Manager (`G-TQ9WZXP0X9`) via `<script>` in base layout

## Phase 12: Build & Deployment

- [x] Configure build script: `astro build`
- [x] Verify static output works (no Node.js server required)
- [x] 29 pages built successfully in ~4s
- [ ] Set up Cloudflare Pages deployment
  - [ ] Create Cloudflare Pages project
  - [ ] Connect Git repository
  - [ ] Set build command (`npm run build`) and output directory (`dist`)
  - [ ] Configure environment variables (`SITE_URL`)

## Phase 13: Testing & QA

- [ ] Visual comparison of all pages (Next.js vs Astro)
- [ ] Test all interactive components:
  - [ ] Image slider navigation
  - [ ] Search modal (open, search, navigate, select)
  - [ ] Contact form submission
  - [ ] Cookie banner (accept, dismiss, persistence)
  - [ ] Mobile navigation menu
  - [ ] Gallery lazy loading
  - [ ] Accordion expand/collapse
- [ ] Test responsive design at all breakpoints
- [ ] Lighthouse audit (performance, accessibility, SEO)
- [ ] Verify all internal links work (no 404s)
- [x] Verify sitemap.xml generation

## Phase 14: Cleanup & Cutover

- [x] Remove Next.js dependencies from `package.json`
- [x] Remove Next.js config files (`next.config.js`, `next-sitemap.config.js`)
- [x] Remove old `src/app/` directory
- [x] Remove old `src/lib/contentParser.ts` and `src/lib/taxonomyParser.ts`
- [x] Remove old `src/layouts/components/` (replaced by Astro layouts + React islands)
- [x] Remove old `src/layouts/shortcodes/` (replaced by `src/components/shortcodes/`)
- [x] Remove old `src/layouts/helpers/` (no longer needed)
- [x] Update `CLAUDE.md` with new Astro commands
- [x] Update `package.json` scripts for Astro
- [ ] DNS cutover from Railway to Cloudflare Pages
