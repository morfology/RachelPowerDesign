import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";

const Services = () => {
  const data: RegularPage = getListPage("pages/services.md");
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

      <section className="section-sm">
        <CallToAction data={ctaStyle} />
        <CallToAction data={ctaDesign} />
        <CallToAction data={ctaProject} />

        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              {image && (
                <ImageFallback
                  className="mx-auto mb-6 rounded-lg"
                  src={image}
                  width={200}
                  height={200}
                  alt={title}
                />
              )}
              <div className="content">
                <MDXContent content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
