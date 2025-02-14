import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage, getListPageApp } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";

const Services = () => {

  const data = getListPageApp("services/design-consultation/_index.md");

  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;


  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
    </>
  );
};

export default Services;
