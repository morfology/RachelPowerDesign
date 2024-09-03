/**
 * Gallery
 */
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import imageConfig from "@/config/images.json";

// for all regular pages
const Gallery = () => {

  const pageData: RegularPage = getListPage("gallery/_index.md");
  const { title, meta_title, description, image } = pageData.frontmatter;

  let data = null
  data  = imageConfig    
    // Filter images that match the detail
    .filter(x => x.image && x.image.indexOf(`detail`) > 0)
  ;




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




          {/* Initial Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card data={data}/>


            
            <div className="grid gap-4">
              <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="" />
              </div>
              <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="" />
              </div>
              <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="" />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="" />
              </div>
              <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" />
              </div>
              <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="" />
              </div>
              <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="" />
              </div>
            </div>



          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;


const Card = ({ data }: { data: any }) => {
  
  return (
    <div className="grid gap-4">
      {data.map(({ image }) => 
      (<div>
        <img className="h-auto max-w-full rounded-lg" src={image} alt="" />
      </div>))}



    <div>
      <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="" />
    </div>
    <div>
      <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="" />
    </div>
    <div>
      <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="" />
    </div>
  </div>
  );
};