// [/src/app/about/page.tsx] => http://localhost:3000/about

import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { getPageMetadata } from "@/lib/pageMeta";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";

export const generateMetadata = () => getPageMetadata("about/_index.md");

const About = () => {

  const data = getListPage("about/_index.md");
  const { frontmatter, content } = data;
  const { heading } = frontmatter;

  const ctaAbout1 = getListPage("about/call-to-action-about-1.md");
  const ctaAbout2 = getListPage("about/call-to-action-about-2.md");

  //const data: RegularPage = getListPage("pages/services.md");
  // @MP CTA could be inline in MDX file

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
