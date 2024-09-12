import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import PageHeader from "@/partials/PageHeader";

const About = () => {
  const data: RegularPage = getListPage("about/_index.md");
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

      {/* <section className="section-sm">
        <div className="bg-gray-900 text-white py-20">



          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row items-center">

            <div className="lg:w-1/2 lg:ml-12">
              <ImageFallback
                className="mx-auto mb-6 zrounded-lg shadow-lg hover:shadow-xl transition duration-200"
                src={image}
                width={300}
                height={300}
                alt={title}
              />
            </div>

            <div className="lg:w-1/2 prose">
                <MDXContent content={content} />
              </div>


            </div>
          </div>
        </div>
      </section> */}


      <section className="section-sm">
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

export default About;
