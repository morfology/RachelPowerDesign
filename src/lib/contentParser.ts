import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";
import { Frontmatter, PostContent } from "@/types";
import config from "@/config/config.json";

const contentPath = config.settings.contentPath;

/**
 * This function gets the specified page data from the content folder.
 * @param filePath - relative path to the file e.g. _index.md
 * @returns object with frontmatter and content
 */
export const getPageFromPath = (filePath: string): PostContent => {

  const pageDataPath = path.join(contentPath, filePath);

  if (!fs.existsSync(pageDataPath)) {
    notFound();
  }

  const pageData = readFile(pageDataPath);
  const { content, data: frontmatter } = matter(pageData);

  return {
    frontmatter: parseFrontmatter(frontmatter),
    content,
    slug: filePath.replace("_index.md", "").replace(/\/$/, "") //@MP create a default slug
  };
}

/**
 * Find page for the specified slug
 */
export const findPageForSlug = (slug: string, folder: string): PostContent => {

  const page = getAllSinglePages(folder)
    .filter((page) => page.slug === slug) [ 0 ]
  ;

  if (!page) { throw new Error(`Post ${folder}/${slug} not found`); }

  // The returned slug is single level, but we need to add the folder
  // name to the slug for the projects @MP 2023-10-01 Find a better way
  if (folder === "projects") {
    page.slug = `projects/${page.slug}`;
  }
  if (folder === "services") {
    page.slug = `services/${page.slug}`;
  }

  return page;
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
  //console.warn(filename, folderPath)
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
