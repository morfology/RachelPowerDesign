import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";

const Services = () => {
  //const data: RegularPage = getListPage("pages/services.md");
  const data = getListPage("services/_index.md");

  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;
  const ctaStyle = getListPage("sections/call-to-action-style.md");
  const ctaDesign = getListPage("sections/call-to-action-design.md");
  const ctaProject = getListPage("sections/call-to-action-project.md");

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <CallToAction data={ctaDesign} />
      <CallToAction data={ctaProject} />
      <CallToAction data={ctaStyle} />

    </>
  );
};

export default Services;
