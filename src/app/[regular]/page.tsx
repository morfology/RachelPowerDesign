// [regular]/page.tsx => http://localhost:3000/elements
// "pages" folder

import MDXContent from "@/helpers/MDXContent";
import { getAllSinglePages } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import { PostContent } from "@/types";
import { getPageMetadata } from "@/lib/pageMeta";

const folder = "pages";

// remove dynamicParams
export const dynamicParams = false;

export const generateMetadata = ({ params }: { params: { regular: string } }) => {

  console.warn("gmd params: ", params);

  const page = findPageForSlug(params.regular, folder);
  // @MP TODO: generate based on param
  return getPageMetadata("pages/elements.md");
}

// generate static params
export const generateStaticParams = () => {

  return getAllSinglePages(folder)
    .map((page) => ({regular: page.slug}))
  ;
}

/**
 * Find page withe the specified slug
 */
function findPageForSlug(slug: string, folder: string): PostContent {

  return getAllSinglePages(folder)
    .filter((page) => page.slug === slug) [ 0 ]
  ;
}

// for all regular pages
const RegularPages = ({ params }: { params: { regular: string } }) => {

  const page = findPageForSlug(params.regular, folder);

  return (
    <>
      <PageHeader heading={page.frontmatter.heading || '?'} />
      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={page.content} />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegularPages;
