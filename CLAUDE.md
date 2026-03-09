# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Astro development server
- `npm run build` - Production build (static site generation)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks
- `npm run tsc` - TypeScript/Astro type checking
- `npm run format` - Format code with Prettier

## Architecture Overview

This is an Astro 5 interior design portfolio website built with TypeScript and Tailwind CSS. It generates a fully static site deployed to Cloudflare Pages.

### Content Management System
- **Content Location**: All content stored as Markdown/MDX files in `src/content/`
- **Content Collections**: Defined in `src/content/config.ts` using Astro's Content Layer API with `glob` loader
- **Frontmatter**: YAML metadata in markdown files controls page behavior and SEO
- **MDX Shortcodes**: Components like `<Testimonial>`, `<Accordion>`, `<Button>`, `<Notice>` are imported in `.mdx` files from `src/components/shortcodes/`

### Key Directories
- `src/pages/` - Astro page routes (file-based routing)
- `src/content/` - Markdown/MDX content files organized by collection type
- `src/layouts/` - Astro layout components (BaseLayout, Header, Footer, etc.)
- `src/components/react/` - React island components (interactive client-side)
- `src/components/shortcodes/` - Astro shortcode components for MDX content
- `src/lib/` - Core utilities (text conversion, slug helpers)
- `src/styles/` - CSS files (Tailwind + custom styles)
- `src/config/` - JSON configuration files
- `public/images/` - Static image assets organized by project

### React Islands (Interactive Components)
- `ImageSlider.tsx` - Swiper-based image carousel (`client:visible`)
- `ContactForm.tsx` - Formik form posting to Railway (`client:visible`)
- `SearchModal.tsx` - Full-text search modal (`client:load`)
- `Grid.tsx` - Lazy-loading gallery grid (`client:visible`)

### Content Collections
10 collections: projects, services, pages, about, homepage, sections, contact, gallery, categories, tags

### Astro 5 Content Layer Notes
- Uses `glob` loader (not `type: 'content'`) to include `_index.md` files
- Entry IDs via `entry.id` (not `entry.slug`)
- Standalone `render(entry)` function from `astro:content` (not `entry.render()`)

### Styling System
- Tailwind CSS with custom configuration in `tailwind.config.js`
- CSS layers: `main.css`, `base.css`, `navigation.css`, `buttons.css`, `search.css`, `components.css`, `utilities.css`

### External Services
- **Form submissions**: POST to `https://form-handler-production.up.railway.app/submit-form` (Railway)
- **Analytics**: Google Tag Manager (`G-TQ9WZXP0X9`)
- **Hosting**: Cloudflare Pages (static)

## Important Notes

- All content files using JSX components must be `.mdx` (not `.md`)
- Build output is fully static HTML in `dist/` directory
- No Node.js server required at runtime
- Images should be organized in `public/images/` by project or category
