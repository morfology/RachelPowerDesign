# Framework Migration Assessment: Next.js to Astro

## Current State Analysis

This Next.js 13 site is essentially a **static content site running on a server framework**.

- Zero API routes
- Zero middleware
- All content read from markdown at build time via `fs.readFileSync`
- `output: 'standalone'` means a full Node.js server runs on Railway to serve pre-built pages
- `--max-old-space-size=312` memory hack required for builds

## Recommendation: Migrate to Astro

### Why Astro over 11ty

- Content Collections are purpose-built for our `src/content/` structure
- Existing React components (ImageSlider/Swiper, SearchModal, ContactForm) can be reused as islands
- Built-in image optimization replaces `next/image` without a runtime server
- Tailwind config transfers directly
- First-class Cloudflare Pages adapter
- MDX support built-in

### Migration Difficulty: 6/10 (Moderate)

Most effort is repetitive template conversion, not complex problem-solving.

### Interactive Components (12 "use client" components)

| Component | Migration approach |
|-----------|-------------------|
| ImageSlider (Swiper) | Keep as React island with `client:visible` |
| SearchModal | Keep as React island with `client:load` |
| ContactForm (Formik) | Keep as React island or simplify to vanilla JS |
| CookieBanner | Convert to vanilla JS `<script>` |
| Header (mobile nav) | Convert to vanilla JS or CSS-only |
| Accordion | Replace with `<details>` element |
| ThemeProvider | CSS class toggle with inline script |
| Others (Footer, Logo, Grid, ImageFallback, SearchResult) | Static Astro components |

### Key Migration Tasks

1. **Project setup** - Astro + Tailwind + React integration
2. **Content Collections** - Define schemas matching current frontmatter types
3. **Page routes** - Convert 14 Next.js pages to Astro pages
4. **Layouts/components** - Convert JSX templates to `.astro` files
5. **Interactive islands** - Port React components with `client:` directives
6. **Images** - Replace `next/image` with `astro:assets`
7. **Search** - Keep JSON generation script, port client-side search
8. **SEO/Sitemap** - Use `@astrojs/sitemap`
9. **Dark mode** - Inline script for theme switching

### Benefits

- **No runtime server** - static HTML on Cloudflare Pages (free tier)
- **Faster page loads** - minimal JS hydration vs full React hydration
- **Simpler deployments** - git push triggers Cloudflare build
- **Lower cost** - free hosting vs Railway compute costs
- **Better DX for content** - Astro Content Collections with type-safe frontmatter

### Risks / Watch Items

- If server-side features are ever needed, would require Cloudflare Workers
- Swiper works in React islands but could be replaced with lighter alternative
- Form handler remains on Railway (separate service, unaffected)
- MDX migration from `next-mdx-remote` to Astro's built-in MDX
