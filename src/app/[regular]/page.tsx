//=> app/[regular]/page.tsx

import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import { RegularPage } from "@/types";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const getRegularPages = getSinglePage("pages");

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }));

  return regularPages;
};

// for all regular pages
const RegularPages = ({ params }: { params: { regular: string } }) => {
  const regularData = getSinglePage("pages");
  const data = regularData.filter(
    (page: RegularPage) => page.slug === params.regular,
  )[0];
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;

  return (
    <>
      <PageHeader title={title} />
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
