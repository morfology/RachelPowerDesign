//=> app/about/page.tsx

import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { getPageMetadata } from "@/lib/pageMeta";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";
import { Metadata } from "next";


export const generateMetadata = (): Metadata => getPageMetadata("about/_index.md");

const About = () => {
  const data = getListPage("about/_index.md");
  const { frontmatter, content } = data;
  const { heading /*, meta_title, description, image* --- Meta */ } = frontmatter;

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
