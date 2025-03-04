import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";

export default () => {

  const data = getListPage("services/design-consultation/_index.md");
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

      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-10">
              <div className="content mb-10">
                <MDXContent content={content} />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}