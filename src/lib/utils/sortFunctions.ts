import { PostContent } from "@/types";

// sort by date
export const sortByDate = (array: PostContent[]) : PostContent[] => {
  const sortedArray = array.sort(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (a: any, b: any) =>
      new Date(b.frontmatter.date && b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date && a.frontmatter.date).valueOf(),
  );
  return sortedArray;
};

