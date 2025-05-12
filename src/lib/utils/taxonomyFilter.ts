import { slugify } from "@/lib/utils/textConverter";
import { PostContent } from "@/types";

const taxonomyFilter = (
  posts: PostContent[],
  name: "categories" | "tags", // Restrict to valid keys in frontmatter
  key: string
): PostContent[] =>
  posts.filter((post) =>
    post.frontmatter[name]?.map((item: string) => slugify(item)).includes(key)
  );

export default taxonomyFilter;
