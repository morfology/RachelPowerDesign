import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MDXContent = ({ content }: { content: any }) => {
  interface IMdxOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    remarkPlugins?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rehypePlugins?: any[];
  }
  const mdxOptions: IMdxOptions = {
    remarkPlugins: [remarkGfm],
  };

  return (
    <>
      {/* @ts-ignore @MP fixme */}
      <MDXRemote
        source={content}
        components={shortcodes}
        options={{ mdxOptions }}
      />
    </>
  );
};

export default MDXContent;
