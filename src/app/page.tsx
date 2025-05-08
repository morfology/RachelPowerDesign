import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { PostContent } from "@/types";
import Image from "next/image";
import CallToAction from "@/partials/CallToAction";


const Home = () => {
  const homepage: PostContent = getListPage("homepage/_index.md");
  const { frontmatter } = homepage;
  // const {
  //   banner,
  // }: {
  //   banner: { title: string; image: string; content?: string; button?: Button };
  // } = frontmatter;
  const banner = frontmatter.banner;

  // Combine the CallToAction data into a single array
  const ctaData = [
    getListPage("homepage/call-to-action-intro.md"),

  ];






  return (
    <>
  
      <div className="relative h-screen text-white overflow-hidden">

        {/**** Big page image */}
        <div className="absolute inset-0">
          <Image
            className="object-cover object-center"
            src="/images/farnham/living-1.jpg"
            alt="Rachel Power Design"
            priority
            placeholder="blur"
            blurDataURL="/images/farnham/living-1-blur.jpg"
            fill // 👈 This makes it cover the entire parent div!
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>


        {/* <ImageSlider data={dataSlider} /> */}


        {/**** Big Hero Text and strapline */}
        <div  className="relative z-10 flex flex-col justify-center items-center h-full text-center text-theme-light">
          <h1 style={{ color: 'rgba(244, 244, 244, 0.60)' }} className="mb-4 text-7xl leading-tight text-theme-light"
            dangerouslySetInnerHTML={markdownify(banner?.title || 'test')}
          />


          {/* <div style={{ color: 'green' }}>
            123
          <Image
                    width={800}
                    height={300}
                    src={config.site.logo}
                    alt={'test'}
                    
                    priority
                    
                  
                  />
          </div> */}

          {/* <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="250 0 156 72"
            >
              <path
                d="M336.06,68.82V.09h25.73c5.82,0,10.83.93,15.02,2.8,4.19,1.86,7.41,4.55,9.67,8.05,2.26,3.51,3.39,7.75,3.39,12.72s-1.13,9.02-3.39,12.52c-2.26,3.51-5.48,6.21-9.67,8.1-4.19,1.9-9.2,2.85-15.02,2.85h-21.71l3.24-3.44v25.14h-7.27ZM343.33,44.27l-3.24-3.54h21.51c6.87,0,12.09-1.49,15.66-4.46,3.56-2.98,5.35-7.19,5.35-12.62s-1.78-9.76-5.35-12.77c-3.57-3.01-8.79-4.52-15.66-4.52h-21.51l3.24-3.44v41.34Z"
                fill="currentColor"
              />
              <path
                d="M266.45,68.74l17.77-24.94h7.86l-17.68,24.94h-7.95ZM314.08,68.74v-25.14l3.24,3.34h-21.7c-5.83,0-10.84-.93-15.03-2.8-4.19-1.87-7.41-4.55-9.67-8.05-2.26-3.5-3.39-7.67-3.39-12.52s1.13-9.21,3.39-12.72c2.26-3.5,5.48-6.19,9.67-8.05,4.19-1.87,9.2-2.8,15.03-2.8h25.73v68.74h-7.27ZM314.08,2.85l3.24,3.44h-21.51c-6.87,0-12.09,1.51-15.66,4.52-3.57,3.01-5.35,7.27-5.35,12.77s1.78,9.66,5.35,12.67c3.56,3.01,8.79,4.52,15.66,4.52h21.51l-3.24,3.44V2.85Z"
                fill="currentColor"
              />
            </svg> */}

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
