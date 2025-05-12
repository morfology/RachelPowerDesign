// [/src/app/about/page.tsx] => http://localhost:3000/about

import MDXContent from "@/helpers/MDXContent";
import { getPageFromPath } from "@/lib/contentParser";
import { getPostMetadata } from "@/lib/pageMeta";
import PageHeader from "@/components/PageHeader";
import CallToAction from "@/components/CallToAction";

export const generateMetadata = () => getPostMetadata(getPageFromPath("about/_index.md"));

const About = () => {

  const page = getPageFromPath("about/_index.md");
  const ctaAbout1 = getPageFromPath("about/call-to-action-about-1.md");
  const ctaAbout2 = getPageFromPath("about/call-to-action-about-2.md");

  return (
    <>
      <PageHeader heading={page.frontmatter.heading || '?'} />

      <CallToAction data={ctaAbout1} />
      <CallToAction data={ctaAbout2} />

      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={page.content} />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
