import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";
import { Frontmatter, PostContent } from "@/types";

const contentPath = "src/content";
const appPath = "src/app";

// Helper function to read file content
const readFile = (filePath: string): string => {
  return fs.readFileSync(filePath, "utf-8");
};

// Helper function to parse frontmatter
const parseFrontmatter = (raw: Record<string, unknown>): Frontmatter => {
  const rawString = JSON.stringify(raw);
  return JSON.parse(rawString) as Frontmatter;
};


// get list page data, ex: _index.md
export const getListPage = (filePath: string): PostContent => {
  let pageDataPath = path.join(contentPath, filePath);

  // Fallback base for pages is the "app" folder
  if (!fs.existsSync(pageDataPath)) {
    pageDataPath = path.join(appPath, filePath);
  }

  if (!fs.existsSync(pageDataPath)) {
    notFound();
  }

  const pageData = readFile(pageDataPath);
  const { content, data: frontmatter } = matter(pageData);

  return {
    frontmatter: parseFrontmatter(frontmatter),
    content
  };
}

// get all single pages, ex: blog/post.md
export const getAllSinglePages = (folder: string): Array<PostContent> => {

  const folderPath = path.join(contentPath, folder);

  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    notFound();
  }

  const filesPath = fs.readdirSync(folderPath);
  const sanitizeFiles = filesPath.filter((file) => file.endsWith(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/),
  );

  const singlePages: Array<PostContent> = filterSingleFiles.map((filename): PostContent => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(folderPath, filename);
    const pageData = readFile(filePath);
    const { content, data: frontmatter } = matter(pageData);
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;

    return {
      frontmatter: parseFrontmatter(frontmatter),
      slug: url,
      content
    };
  });

  const publishedPages = singlePages.filter(
    (page) => !page.frontmatter.draft && page,
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date(),
  );

  return filterByDate;
};
