import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";

const About = () => {
  const data = getListPage("about/_index.md");
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;

  const ctaAbout1 = getListPage("about/call-to-action-about-1.md");
  const ctaAbout2 = getListPage("about/call-to-action-about-2.md");



  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />


      <CallToAction data={ctaAbout1} />
      <CallToAction data={ctaAbout2} />

    </>
  );
};

export default About;
