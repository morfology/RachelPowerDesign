// [/src/app/about/page.tsx] => http://localhost:3000/about

import MDXContent from "@/helpers/MDXContent";
import { getPageFromPath } from "@/lib/contentParser";
import { getPageMetadata } from "@/lib/pageMeta";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";

export const generateMetadata = () => getPageMetadata("about/_index.md");

const About = () => {

  const data = getPageFromPath("about/_index.md");
  const { frontmatter, content } = data;
  const { heading } = frontmatter;

  const ctaAbout1 = getPageFromPath("about/call-to-action-about-1.md");
  const ctaAbout2 = getPageFromPath("about/call-to-action-about-2.md");

  return (
    <>
      <PageHeader heading={heading || '?'} />

      <CallToAction data={ctaAbout1} />
      <CallToAction data={ctaAbout2} />

      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={content} />
          </div>
        </div>
      </section>


    </>
  );
};

export default About;
