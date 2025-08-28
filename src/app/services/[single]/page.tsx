//=> app/services/[single]/page.tsx

import MDXContent from "@/helpers/MDXContent";
import { getAllSinglePages, findPageForSlug } from "@/lib/contentParser";
import { PostContent } from "@/types";
import PageHeader from "@/components/PageHeader";
import { getPostMetadata } from "@/lib/pageMeta";

const services_folder = "services";

// remove dynamicParams
export const dynamicParams = false;

// generate static params - makes sure we get the meta data for our service pages!
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: PostContent[] = getAllSinglePages(services_folder);

  const paths = posts.map((post) => ({
    single: post.slug || '',
  }));

  return paths;
};

// get metadata for the page
export const generateMetadata = ({ params }: { params: { single: string } }) => 
  getPostMetadata(findPageForSlug(params.single, services_folder))
;



const ServicePage = ({ params }: { params: { single: string } }) /*: JSX.Element*/ => {

  const posts: PostContent[] = getAllSinglePages(services_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const { heading } = frontmatter;

  return (
    <>
      <PageHeader heading={heading || '?'} />
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


