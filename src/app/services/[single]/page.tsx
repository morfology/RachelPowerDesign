//=> app/services/[single]/page.tsx

// A dynamic route "services" page, using content from the markdown
// file of the same name e.g. /services/service-a

import config from "@/config/config.json";
import MDXContent from "@/helpers/MDXContent";
import { getAllSinglePages } from "@/lib/contentParser";
import { PostContent } from "@/types";
import PageHeader from "@/partials/PageHeader";

const { services_folder } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: PostContent[] = getAllSinglePages(services_folder);

  const paths = posts.map((post) => ({
    single: post.slug || '',
  }));

  return paths;
};

const ServicePage = ({ params }: { params: { single: string } }) /*: JSX.Element*/ => {

  const posts: PostContent[] = getAllSinglePages(services_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const { title } = frontmatter;

  return (
    <>
      <PageHeader title={title} />
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

//ServicePage.displayName = "ServicePage";

export default ServicePage;


