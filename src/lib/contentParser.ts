import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";
import { Frontmatter, PostContent } from "@/types";

const contentPath = "src/content";
const appPath = "src/app";

/**
 * This function gets the specified page data from the content folder.
 * @param filePath - relative path to the file e.g. _index.md
 * @returns object with frontmatter and content
 */
export const getPageFromPath = (filePath: string): PostContent => {
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

/**
 * Find page withe the specified slug
 */
export const findPageForSlug = (slug: string, folder: string): PostContent => {

  return getAllSinglePages(folder)
    .filter((page) => page.slug === slug) [ 0 ]
  ;
}


/**
 * This function gets all single pages from the specified folder.
 * @param folder - The folder where the pages are located.
 * @returns An array of objects with frontmatter and content
 */
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

// Helper function to read file content
const readFile = (filePath: string): string => {
  return fs.readFileSync(filePath, "utf-8");
};

// Helper function to parse frontmatter
const parseFrontmatter = (raw: Record<string, unknown>): Frontmatter => {
  const rawString = JSON.stringify(raw);
  return JSON.parse(rawString) as Frontmatter;
};
