/**
 * Gallery
 */
import { getListPage } from "@/lib/contentParser";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import PageHeader from "@/partials/PageHeader";
import Grid from "@/lib/Grid"

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
      <PageHeader title={title} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <Grid />
      </div>
    </>
  );
};

export default Gallery;

