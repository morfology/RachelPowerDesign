// TypeScript declaration file for the project

export type PostContent = {
  frontmatter: Frontmatter;
  content: string;
  slug?: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export type Frontmatter = {

  heading: string;
  title: string;
  date?: string;
  tags: string[];
  draft?: boolean;

  description?: string;
  image?: string;

  folder?: string,
  categories: string[];
  author: string;
  button: Button;

  slideshow?: string[];
  banner?: Record<string, string>;

};

