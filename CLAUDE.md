# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Production build (includes JSON generation and sitemap)
- `npm run lint` - Run ESLint checks
- `npm run tsc` - TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run generate-json` - Generate JSON files from markdown content for search functionality

## Architecture Overview

This is a Next.js 13 interior design portfolio website built with TypeScript and Tailwind CSS.

### Content Management System
- **Content Location**: All content stored as Markdown/MDX files in `src/content/`
- **JSON Generation**: Build process converts markdown to JSON files in `.json/` for search functionality via `scripts/jsonGenerator.js`
- **Frontmatter**: YAML metadata in markdown files controls page behavior and SEO
- **Dynamic Content**: Projects, services, and other pages are generated from markdown files

### Key Directories
- `src/app/` - Next.js App Router pages and routing
- `src/content/` - Markdown content files organized by type
- `src/layouts/components/` - Reusable UI components
- `src/layouts/helpers/` - Utility components and helpers
- `src/lib/` - Core utilities including content parsing and taxonomy management
- `public/images/` - Static image assets organized by project

### Build Process
1. `npm run generate-json` creates search-ready JSON from markdown
2. Next.js builds the application
3. `next-sitemap` generates sitemap.xml

### Content Parsing
- Content is parsed using `src/lib/contentParser.ts` 
- Frontmatter structure is defined in TypeScript types
- Taxonomy (tags/categories) handled by `src/lib/taxonomyParser.ts`

### Styling System
- Tailwind CSS with extensive custom configuration
- Design system defined in `tailwind.config.js`
- Component-based approach with reusable UI elements

### Node.js Requirements
- Node.js version: 18.19.0 (defined in package.json engines)
- Memory optimization: Build uses `--max-old-space-size=312` for deployment

## Important Notes

- ESLint errors are ignored during production builds (see next.config.js)
- All content changes require rebuilding JSON files for search to work
- Images should be organized in `public/images/` by project or category
- The build process is optimized for Netlify deployment with standalone output