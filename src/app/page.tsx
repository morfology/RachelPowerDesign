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
          src="/images/farnham/living-1-2880.webp"
          alt="Rachel Power Design"
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRuoBAABXRUJQVlA4IN4BAACQCQCdASouAB0APpE8mkiloyKhKrgMALASCWIAnTLtBZhaYbbNIq3W7TGQYIaL4hnBiKfwFr5RpLpJlkpOG4WtVap7J3CHZcLsDxyuQFyoWIfJXoQAAP7+hBTx2LLCxdpj6zoqdqR8o6I9r5beBle362clr1AEa+/Xkd59Mbr8yXTgSuGKVM3+Qb4+oMEwEjCa0Dh/6z1/O9mXjtzGLpGQTaN/AmnSXOl8noGi8hC8DTGHwKsjio+hj+Yr+TgZlzNjDLhSx97g/Uu1y3XVcmWxfiu/jDc7EwGnqk77kPfR1NbFTaQ+2a86ypqzFRSRFUcS24uNEDOS9wGWGpIKRX77+O/yAh1kkmBROzk+ZtKWuv+B3azWujMlwMdAncLKOoVDXla/lr5o0BDayAbSO4/iGJcZy96N8flOY01q712FQw3iLG8xwdKxPre7F/x/2Zq6lARamJqCIVIdFJzNBQy/6cHRB7I5uN4DOCKHMuXlszaUamoRCUsrFtsElfird2icWXm/g1gHJzjx8rvDkmVTjUGqQuUAMzydRQl8w4ZbZEiJCJAJzgI+9pNtMC2zv6BSGJCJkpYJNNzBSvYg0lKeBiIsBWh1Cx3Vss0bn1EhnxEdeHLmmVORNiptXAAA"

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
