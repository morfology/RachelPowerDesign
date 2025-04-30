import { slugify } from "@/lib/utils/textConverter";
import { Post } from "@/types";

const taxonomyFilter = (
  posts: Post[],
  name: "categories" | "tags", // Restrict to valid keys in frontmatter
  key: string
): Post[] =>
  posts.filter((post) =>
    post.frontmatter[name]?.map((item: string) => slugify(item)).includes(key)
  );

export default taxonomyFilter;
