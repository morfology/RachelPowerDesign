// http://localhost:3000/gallery

/**
 * Gallery
 */
import PageHeader from "@/components/PageHeader";
import Grid from "@/lib/Grid";
import { getPageFromPath } from "@/lib/contentParser";
import { getPostMetadata } from "@/lib/pageMeta";

export const generateMetadata = () => getPostMetadata(getPageFromPath("gallery/_index.md"));

// for all regular pages
const Gallery = () => {

  return (
    <>
      <PageHeader heading={'Gallery'} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <Grid />
      </div>
    </>
  );
};

export default Gallery;

