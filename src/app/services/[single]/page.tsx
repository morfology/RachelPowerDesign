// A dynamic route "services" page, using content from the markdown
// file of the same name e.g. /services/service-a

import config from "@/config/config.json";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import PageHeader from "@/partials/PageHeader";

const { services_folder } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: Post[] = getSinglePage(services_folder);

  const paths = posts.map((post) => ({
    single: post.slug!,
  }));

  return paths;
};

export default ({ params }: { params: { single: string } }) => {

  const posts: Post[] = getSinglePage(services_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const {
    title,
    meta_title,
    description,
    image
  } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      ZZZ
      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={content} />
          </div>
        </div>
      </section>
    </>
  );
}


