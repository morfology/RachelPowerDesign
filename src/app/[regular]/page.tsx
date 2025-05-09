// src/app/[regular]/page.tsx => http://localhost:3000/elements
// "pages" folder

import MDXContent from "@/helpers/MDXContent";
import { getAllSinglePages } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import { PostContent } from "@/types";
import { getPageMetadata } from "@/lib/pageMeta";

// remove dynamicParams
export const dynamicParams = false;

export const generateMetadata = () => getPageMetadata("pages/elements.md");

// generate static params
export const generateStaticParams = () => {
  const pages = getAllSinglePages("pages");

  return pages.map((page) => ({
    regular: page.slug,
  }));
};

// for all regular pages
const RegularPages = ({ params }: { params: { regular: string } }) => {

  const regularData: Array<PostContent> = getAllSinglePages("pages");
  const data: PostContent = regularData.filter(
    (page) => page.slug === params.regular,
  )[0];

  const { frontmatter, content } = data;
  const { heading } = frontmatter;

  return (
    <>
      <PageHeader heading={heading || '?'} />
      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={content} />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegularPages;
