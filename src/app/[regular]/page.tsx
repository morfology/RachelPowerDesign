// [regular]/page.tsx => http://localhost:3000/elements
//                       http://localhost:3000/privacy-policy

import MDXContent from "@/helpers/MDXContent";
import { getAllSinglePages, findPageForSlug } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import { getPostMetadata } from "@/lib/pageMeta";

const folder = "pages";

// remove dynamicParams
export const dynamicParams = false;

// get metadata for the page
export const generateMetadata = ({ params }: { params: { regular: string } }) => 
  getPostMetadata(findPageForSlug(params.regular, folder))
;

// generate static params
export const generateStaticParams = () => 
  getAllSinglePages(folder)
    .map((page) => ({regular: page.slug}))
;

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
