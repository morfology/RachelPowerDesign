import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const buttonSchema = z.object({
  enable: z.boolean(),
  label: z.string(),
  link: z.string(),
}).optional();

// Custom glob pattern that includes _index.md files
const mdGlob = (dir: string) => glob({
  pattern: '**/*.{md,mdx}',
  base: `src/content/${dir}`,
});

const projects = defineCollection({
  loader: mdGlob('projects'),
  schema: z.object({
    heading: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    image: z.string().optional(),
    folder: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    draft: z.boolean().default(false),
    slideshow: z.array(z.string()).default([]),
    button: buttonSchema,
  }),
});

const services = defineCollection({
  loader: mdGlob('services'),
  schema: z.object({
    heading: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    button: buttonSchema,
  }),
});

const pages = defineCollection({
  loader: mdGlob('pages'),
  schema: z.object({
    heading: z.string(),
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const about = defineCollection({
  loader: mdGlob('about'),
  schema: z.object({
    heading: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    enable: z.boolean().default(true),
    image: z.string().optional(),
    button: buttonSchema,
  }),
});

const homepage = defineCollection({
  loader: mdGlob('homepage'),
  schema: z.object({
    heading: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    enable: z.boolean().default(true),
    image: z.string().optional(),
    button: buttonSchema,
    banner: z.object({
      heading: z.string(),
      content: z.string(),
      image: z.string(),
      button: buttonSchema,
    }).optional(),
  }),
});

const sections = defineCollection({
  loader: mdGlob('sections'),
  schema: z.object({
    enable: z.boolean().default(true),
    heading: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    button: buttonSchema,
  }),
});

const contact = defineCollection({
  loader: mdGlob('contact'),
  schema: z.object({
    heading: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const gallery = defineCollection({
  loader: mdGlob('gallery'),
  schema: z.object({
    heading: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const categories = defineCollection({
  loader: mdGlob('categories'),
  schema: z.object({
    title: z.string().optional(),
    heading: z.string().optional(),
    description: z.string().optional(),
  }),
});

const tags = defineCollection({
  loader: mdGlob('tags'),
  schema: z.object({
    title: z.string().optional(),
    heading: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  projects,
  services,
  pages,
  about,
  homepage,
  sections,
  contact,
  gallery,
  categories,
  tags,
};
