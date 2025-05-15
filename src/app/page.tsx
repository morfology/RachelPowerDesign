import { getPageFromPath } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { PostContent } from "@/types";
import Image from "next/image";
import CallToAction from "@/components/CallToAction";


const Home = () => {
  const homepage: PostContent = getPageFromPath("homepage/_index.md");
  const { frontmatter } = homepage;

  // const {
  //   banner,
  // }: {
  //   banner: { title: string; image: string; content?: string; button?: Button };
  // } = frontmatter;
  // const banner = frontmatter.banner;

  // Combine the CallToAction data into a single array
  const ctaData = [
    getPageFromPath("homepage/call-to-action-intro.md"),

  ];

  return (
    <>
  
      <div className="relative h-screen sm:min-h-[500px] text-white overflow-hidden">
      
      {/**** Fullscreen Image with overlay */}
      <div className="absolute inset-0">
        <Image
          className="object-cover object-center"
          src="/images/farnham/living-1.jpg"
          alt="Rachel Power Design"
          priority
          placeholder="blur"
          blurDataURL="/images/farnham/living-1-blur.jpg"
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>

      {/**** Foreground Text */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-theme-light">
        <h1
          style={{ color: 'rgba(244, 244, 244, 0.60)' }}
          className="mb-4 text-7xl leading-tight text-theme-light"
          dangerouslySetInnerHTML={markdownify(frontmatter.heading || 'test')}
        />
      </div>
    </div>

    {ctaData.map((cta, index) => (<CallToAction key={index} data={cta} />))}

    </>
  );
};

export default Home;
