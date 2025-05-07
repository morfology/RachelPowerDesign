import { getSinglePage } from "@/lib/contentParser";
import { slugify } from "@/lib/utils/textConverter";

// get all taxonomies from frontmatter
export const getTaxonomy = (folder: string, name: string): Array<string> => {
  const singlePages = getSinglePage(folder);
  const taxonomyPages = singlePages.map((page) => page.frontmatter.categories);
  const taxonomies = [];
  for (let i = 0; i < taxonomyPages?.length; i++) {
    const taxonomyArray = taxonomyPages[i];
    for (let j = 0; j < taxonomyArray?.length; j++) {
      taxonomies.push(slugify(taxonomyArray[j]));
    }
  }
  const taxonomy = [...new Set(taxonomies)];

  return taxonomy;
};

// @MP 2024-01-02 tags[] to by dynamic based on name?
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAllTaxonomy = (folder: string, name: string) => {
  const singlePages = getSinglePage(folder);
  const taxonomyPages = singlePages.map((page) => page.frontmatter.categories);
  const taxonomies = [];
  for (let i = 0; i < taxonomyPages?.length; i++) {
    const taxonomyArray = taxonomyPages[i];
    for (let j = 0; j < taxonomyArray?.length; j++) {
      taxonomies.push(slugify(taxonomyArray[j]));
    }
  }

  return taxonomies;
};
