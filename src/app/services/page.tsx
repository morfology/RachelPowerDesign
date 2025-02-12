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

  // Combine the CallToAction data into a single array
  const ctaData = [
    getListPage("sections/call-to-action-design-consult.md"),
    getListPage("sections/call-to-action-style.md"),
    getListPage("sections/call-to-action-design.md"),
    getListPage("sections/call-to-action-project.md"),
  ];

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      {/* Iterate over the ctaData array to render CallToAction components */}
      {ctaData.map((cta, index) => (
        <CallToAction key={index} data={cta} />
      ))}
    </>
  );
};

export default Services;
