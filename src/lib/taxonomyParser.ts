import { getAllSinglePages } from "@/lib/contentParser";
import { slugify } from "@/lib/utils/textConverter";
import { PostContent } from "@/types";

// get all taxonomies from frontmatter
// export const getTaxonomy = (folder: string, name: string): Array<string> => {

//   const taxonomies = getAllTaxonomy(folder, name);

//   // Dedupe
//   const taxonomy = [...new Set(taxonomies)];

//   return taxonomy;
// };

// // @MP 2024-01-02 tags[] to by dynamic based on name?
// export const getAllTaxonomy = (folder: string, _uname: string): Array<string> => {

//   const singlePages: PostContent[] = getAllSinglePages(folder);


//   const taxonomyPages = singlePages.map((page) => page.frontmatter.categories);
//   const taxonomies = [];
//   for (let i = 0; i < taxonomyPages?.length; i++) {
//     const taxonomyArray = taxonomyPages[i];
//     for (let j = 0; j < taxonomyArray?.length; j++) {
//       taxonomies.push(slugify(taxonomyArray[j]));
//     }
//   }

//   return taxonomies;
// };

export type CountedItem = {
  name: string;
  count: number;
};

// @MP 2024-01-02 tags[] to by dynamic based on name?
export const getTaxonomyAggr = (folder: string, taxonomy: string): CountedItem[] => {

  const singlePages: PostContent[] = getAllSinglePages(folder);
  
  // Here we simplify the pages creating a new array of objects
  // with only the properties we need.
  // [ { tags: [ ], categories: [ ] } ]

  const mappedPages: Record<string, unknown>[] = singlePages.map(
    ({ frontmatter: { title, tags, categories } }) => 
      ({ title, tags, categories }))
  ;

  const taxCounts = countItems(mappedPages, taxonomy);
  return taxCounts;
};


/**
 * Counts the occurrences of items in a specific key of an array of objects.
 * @param items - The array of objects to count items from.
 * @param key   - The key whose values will be counted (an array)
 * @returns An array of objects with the name and count of each item.
 */
function countItems(items: Array<Record<string, unknown>>, key: string) : CountedItem[] {

  const counts = new Map<string, number>();

  for (const item of items) {

    const values = item[key];
    if (Array.isArray(values)) {

      for (const value of values) {
        //value.toLowerCase();
        const name = slugify(value.toLowerCase());
        counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    }
  }

  return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
}
