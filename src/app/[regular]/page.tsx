//=> app/[regular]/page.tsx

import MDXContent from "@/helpers/MDXContent";
import { getAllSinglePages } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import { PostContent, RegularPage } from "@/types";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const getRegularPages = getAllSinglePages("pages");

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }));

  return regularPages;
};

// for all regular pages
const RegularPages = ({ params }: { params: { regular: string } }) => {

  const regularData: Array<PostContent> = getAllSinglePages("pages");
  const data: PostContent = regularData.filter(
    (page: RegularPage) => page.slug === params.regular,
  )[0];

  const { frontmatter, content } = data;
  const { heading } = frontmatter;

  return (
    <>
      <PageHeader title={heading || '?'} />
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
