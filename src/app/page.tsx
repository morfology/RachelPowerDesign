import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Button } from "@/types";
import Link from "next/link";
import ImageFallback from "@/helpers/ImageFallback";
import Image from "next/image";
import CallToAction from "@/partials/CallToAction";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const { frontmatter } = homepage;
  const {
    banner,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
  } = frontmatter;


  // Combine the CallToAction data into a single array
  const ctaData = [
    // getListPage("sections/call-to-action-design-consult.md"),
    // getListPage("sections/call-to-action-design.md"),
    // getListPage("sections/call-to-action-architecture.md"),
    // getListPage("sections/call-to-action-procurement.md"),
    getListPage("homepage/call-to-action-intro.md"),

  ];






  return (
    <>
      <SeoMeta />

      <div className="relative h-screen text-white overflow-hidden">

        {/**** Big page image */}
        <div className="absolute inset-0">
          {/* <img 
          src="https://images.unsplash.com/photo-1615875474908-f403116f5287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Background Image" 
          className="object-cover object-center w-full h-full" /> */}

          <Image
            className="object-cover object-center w-full h-full"
            src={'/images/farnham/living-1.jpg'}
            width={1200}
            height={500}
            alt={'Rachel Power Design'}
            priority={true}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* <ImageSlider data={dataSlider} /> */}


        {/**** Big Hero Text and strapline */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="mb-4 text-7xl leading-tight text-theme-light"  
            dangerouslySetInnerHTML={markdownify(banner.title)}
            />
          {/* <p className="text-lg text-gray-300 mb-8 max-w-prose"
            dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
            /> */}
        </div>
      </div>


      {/* Iterate over the ctaData array to render CallToAction components */}
      {ctaData.map((cta, index) => (
        <CallToAction key={index} data={cta} />
      ))}





      {/* "banner" markup is used here */}
      {/* <section className="section pt-14">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-7 md:col-9 mb-8 text-center">
              <h1
                className="mb-4 text-h3 lg:text-h1"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              <p
                className="mb-8"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
              {banner.button!.enable && (
                <Link
                  className="btn btn-primary"
                  href={banner.button!.link}
                  target={
                    banner.button!.link.startsWith("http") ? "_blank" : "_self"
                  }
                  rel="noopener"
                >
                  {banner.button!.label}
                </Link>
              )}
            </div>
            {banner.image && (
              <div className="col-12">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto"
                  width="800"
                  height="420"
                  alt="banner image"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section> */}


    </>
  );
};

export default Home;
