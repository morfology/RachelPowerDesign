import { getAllSinglePages } from "@/lib/contentParser";
import { slugify } from "@/lib/utils/textConverter";
import { PostContent } from "@/types";

/**
 * This function is used to aggregate the taxonomy items (tags or categories) across all pages
 * in a specified folder. It returns an array of objects, each containing the name of the item
 * and its count.
 * 
 * @param folder - The folder where the pages are located.
 * @param taxonomy - The taxonomy to be aggregated (e.g., "tags" or "categories").
 * @returns An array of objects with the name and count of each item
 *          [ { name: 'tag-1', count: 5 } , ... ]
 */

export type CountedItem = {
  name: string;
  count: number;
};

export const getTaxonomyAggr = (folder: string, taxonomy: string): CountedItem[] => {

  const pages: PostContent[] = getAllSinglePages(folder);
  
  // Here we simplify the pages as a flat array of objects with the properties
  // we may use: [ { title, tags: [ ], categories: [ ] }, .. ]

  const simplerPages: Record<string, unknown>[] = pages.map(
    ({ frontmatter: { title, tags, categories } }) => 
      ({ title, tags, categories }))
  ;

  // Now get each distinct item and count
  return countItems(simplerPages, taxonomy);
};

/**
 * This function counts the occurrences of items in a specific key of an array of objects.
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
