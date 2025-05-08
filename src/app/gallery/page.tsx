/**
 * Gallery
 */
// import { getListPage } from "@/lib/contentParser";
// import { RegularPage } from "@/types";
import PageHeader from "@/partials/PageHeader";
import Grid from "@/lib/Grid"

// for all regular pages
const Gallery = () => {


  //const pageData: RegularPage = getListPage("gallery/_index.md");
  //const { heading } = pageData.frontmatter;

  return (
    <>
      <PageHeader title={'Gallery'} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <Grid />
      </div>
    </>
  );
};

export default Gallery;

