/**
 * Gallery
 */
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";

// for all regular pages
const Gallery = () => {

  const pageData: RegularPage = getListPage("gallery/_index.md");
  const { title, meta_title, description, image } = pageData.frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={pageData.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row gx-5">


          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
