# Migration Tasks: Next.js → Astro

## Phase 1: Project Setup

- [ ] Initialize new Astro project alongside existing Next.js code
- [ ] Install core dependencies: `astro`, `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/mdx`, `@astrojs/sitemap`
- [ ] Install React dependencies: `react`, `react-dom`, `@types/react`
- [ ] Configure `astro.config.mjs` (React integration, Tailwind, sitemap, MDX)
- [ ] Copy and adapt `tailwind.config.js` for Astro (colors, fonts, plugins)
- [ ] Set up `tsconfig.json` for Astro
- [ ] Configure Google Fonts (Open Sans, Oswald) in base layout

## Phase 2: Content Collections

- [ ] Define content collection schemas in `src/content/config.ts`
  - [ ] `projects` schema (heading, title, description, date, draft, author, image, categories, tags, button, slideshow, folder)
  - [ ] `services` schema
  - [ ] `pages` schema (about, privacy-policy, cookies, elements, etc.)
  - [ ] `homepage` schema
  - [ ] `sections` schema (call-to-action blocks)
  - [ ] `contact` schema
  - [ ] `gallery` schema
  - [ ] `categories` schema
  - [ ] `tags` schema
- [ ] Validate all existing markdown files parse against new schemas
- [ ] Migrate `config.json` site settings to Astro-compatible config

## Phase 3: Base Layouts

- [ ] Create `src/layouts/BaseLayout.astro` (replaces `src/app/layout.tsx`)
  - [ ] HTML `<head>` with meta tags, OG tags, canonical URLs
  - [ ] Google Tag Manager script
  - [ ] Font loading
  - [ ] Dark mode inline script (replaces ThemeProvider/next-themes)
- [ ] Create `src/layouts/DefaultLayout.astro` (header + content + footer)
- [ ] Convert `Header` to `Header.astro` with vanilla JS mobile menu
- [ ] Convert `Footer` to `Footer.astro` (static component)
- [ ] Convert `Logo` to `Logo.astro` (static component)
- [ ] Convert `PageHeader` to `PageHeader.astro`
- [ ] Implement `CookieBanner.astro` with vanilla JS (localStorage)
- [ ] Port `TwSizeIndicator` for dev mode

## Phase 4: Static Components

- [ ] Convert `ProjectCard.tsx` → `ProjectCard.astro`
- [ ] Convert `Pagination.tsx` → `Pagination.astro`
- [ ] Convert `CallToAction.tsx` → `CallToAction.astro`
- [ ] Convert `Social.tsx` → `Social.astro`
- [ ] Convert `StructuredData.tsx` → `StructuredData.astro`

## Phase 5: Interactive Islands (Keep as React)

- [ ] Port `ImageSlider.tsx` as React island (`client:visible`) with Swiper
- [ ] Port `SearchModal.tsx` as React island (`client:load`)
- [ ] Port `SearchResult.tsx` as React sub-component of SearchModal
- [ ] Port `ContactForm.tsx` as React island (`client:visible`)
  - [ ] Retain Formik form handling
  - [ ] Retain POST to `https://form-handler-production.up.railway.app/submit-form`
- [ ] Port `Grid.tsx` (lazy-loading gallery) as React island (`client:visible`)

## Phase 6: Shortcodes / MDX Components

- [ ] Replace `Accordion.tsx` with `<details>`/`<summary>` HTML element
- [ ] Convert `Button.tsx` → `Button.astro`
- [ ] Convert `Notice.tsx` → `Notice.astro`
- [ ] Convert `Testimonial.tsx` → `Testimonial.astro`
- [ ] Set up MDX component mapping (replaces `next-mdx-remote` shortcodes)

## Phase 7: Page Routes

- [ ] `/` — Homepage (`src/pages/index.astro`)
- [ ] `/about` — About page (`src/pages/about.astro`)
- [ ] `/services` — Services listing (`src/pages/services/index.astro`)
- [ ] `/services/[slug]` — Individual service pages (`src/pages/services/[slug].astro`)
- [ ] `/projects` — Projects listing (`src/pages/projects/index.astro`)
- [ ] `/projects/[slug]` — Individual project pages (`src/pages/projects/[slug].astro`)
- [ ] `/projects/page/[page]` — Paginated project listing (`src/pages/projects/page/[page].astro`)
- [ ] `/contact` — Contact page (`src/pages/contact.astro`)
- [ ] `/gallery` — Gallery page (`src/pages/gallery.astro`)
- [ ] `/categories` — Categories listing (`src/pages/categories/index.astro`)
- [ ] `/categories/[slug]` — Category pages (`src/pages/categories/[slug].astro`)
- [ ] `/tags` — Tags listing (`src/pages/tags/index.astro`)
- [ ] `/tags/[slug]` — Tag pages (`src/pages/tags/[slug].astro`)
- [ ] `/[slug]` — Catch-all for static pages (privacy-policy, cookies, elements)

## Phase 8: Images

- [ ] Replace all `next/image` usage with Astro `<Image />` or `<Picture />` component
- [ ] Configure image optimization in `astro.config.mjs`
- [ ] Port `ImageFallback` logic (error handling for broken images)
- [ ] Ensure slideshow images in project pages work with ImageSlider island
- [ ] Verify lazy loading and placeholder behavior

## Phase 9: Search

- [ ] Adapt `scripts/jsonGenerator.js` for Astro build pipeline
- [ ] Add JSON generation to Astro build script (pre-build step)
- [ ] Verify SearchModal React island reads from generated JSON correctly
- [ ] Test keyboard navigation (Ctrl+K, arrow keys, Enter)

## Phase 10: SEO & Meta

- [ ] Port `generateMetadata()` logic to Astro `<head>` in layouts
- [ ] Set up canonical URLs using `Astro.url`
- [ ] Configure `@astrojs/sitemap` with correct site URL
- [ ] Port OG image defaults (`/images/og-default.png`)
- [ ] Title template: `%s | Rachel Power Design`
- [ ] Implement structured data (JSON-LD) in head

## Phase 11: Analytics & Tracking

- [ ] Add Google Tag Manager (`G-TQ9WZXP0X9`) via `<script>` in base layout
- [ ] Port RudderStack integration (or remove if unused)
- [ ] Port custom event tracking (search click, phone click)

## Phase 12: Build & Deployment

- [ ] Configure build script: `astro build` (with JSON generation pre-step)
- [ ] Set up Cloudflare Pages deployment
  - [ ] Create Cloudflare Pages project
  - [ ] Connect Git repository
  - [ ] Set build command and output directory
  - [ ] Configure environment variables (`SITE_URL`)
- [ ] Verify static output works (no Node.js server required)
- [ ] Test all pages render correctly
- [ ] Compare bundle size / page weight vs Next.js version

## Phase 13: Testing & QA

- [ ] Visual comparison of all pages (Next.js vs Astro)
- [ ] Test all interactive components:
  - [ ] Image slider navigation
  - [ ] Search modal (open, search, navigate, select)
  - [ ] Contact form submission
  - [ ] Cookie banner (accept, dismiss, persistence)
  - [ ] Mobile navigation menu
  - [ ] Dark mode toggle
  - [ ] Gallery lazy loading
  - [ ] Accordion expand/collapse
- [ ] Test responsive design at all breakpoints
- [ ] Lighthouse audit (performance, accessibility, SEO)
- [ ] Verify all internal links work (no 404s)
- [ ] Verify sitemap.xml generation
- [ ] Test OG meta tags with social media preview tools

## Phase 14: Cleanup & Cutover

- [ ] Remove Next.js dependencies from `package.json`
- [ ] Remove Next.js config files (`next.config.js`, `next-sitemap.config.js`)
- [ ] Remove old `src/app/` directory
- [ ] Remove old `src/lib/contentParser.ts` and `src/lib/taxonomyParser.ts`
- [ ] Update `CLAUDE.md` with new Astro commands
- [ ] Update `README.md`
- [ ] DNS cutover from Railway to Cloudflare Pages
- [ ] Decommission Railway deployment
