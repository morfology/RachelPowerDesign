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
  data = shuffleArray(data);
  
// Example usage:
const dividedArrays = divideArrayIntoFour(data);

//console.log(dividedArrays);



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
            <Card data={dividedArrays[0]}/>
            <Card data={dividedArrays[1]}/>
            <Card data={dividedArrays[2]}/>
            <Card data={dividedArrays[3]}/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;










interface RPDImage {
  image: string;
}

interface RPDImageDataProps {
  data: RPDImage[];
}

//const DemoSlider: React.FC<DemoSliderProps> = ({ data }) => {


const Card = ( {data} : RPDImageDataProps) => {
  
  return (
    <div className="grid gap-4">
      {data.map(({ image }) => 
      (<div>
        <img className="h-auto max-w-full rounded-lg" src={image} alt="" />
      </div>))}



  </div>
  );
};


function shuffleArray(array :any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function divideArrayIntoFour(array :any[]) {
  const length = array.length;
  const chunkSize = Math.ceil(length / 4);
  const result = [];

  for (let i = 0; i < 4; i++) {
    result.push(array.slice(i * chunkSize, (i + 1) * chunkSize));
  }
  return result;
}


