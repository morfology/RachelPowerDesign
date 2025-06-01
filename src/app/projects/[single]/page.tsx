// projects/[single]/page.tsx => http://localhost:3000/projects/chipstead-renovation

import MDXContent from "@/helpers/MDXContent";
import { getAllSinglePages, findPageForSlug } from "@/lib/contentParser";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import { PostContent } from "@/types";
import Link from "next/link";
import ImageSlider from "@/components/ImageSlider";
import { getPostMetadata } from "@/lib/pageMeta";

const projects_folder = "projects";

// remove dynamicParams
export const dynamicParams = false;

// get metadata for the page
export const generateMetadata = ({ params }: { params: { single: string } }) => 
  getPostMetadata(findPageForSlug(params.single, projects_folder))
;

// generate static params
export const generateStaticParams: () => { single: string }[] = () =>
  getAllSinglePages(projects_folder)
    .map((post) => ({single: post.slug || ''}));

// PostSingle component
const PostSingle = ({ params }: { params: { single: string } }) => {

  const posts: PostContent[] = getAllSinglePages(projects_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const {
    heading,
    image,
    categories,
    slideshow
  } = frontmatter;

  console.warn(`/projects/${params.single}`);
  //console.warn('PostSingle', imageConfig);

  return (
    <>
      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-10">
              {image && (
                <div className="mb-10">
                  <ImageSlider data={slideshow || []} />
                </div>
              )}
              <h1
                dangerouslySetInnerHTML={markdownify(heading || '?')}
                className="h2 mb-4"
              />
              <div className="content mb-10">
                <MDXContent content={content} />
              </div>

              <div className=" mb-10">              
                    {categories?.map((cat: string) => (
                      <div key={cat} className="inline-block">
                        <Link
                          className="m-1 block rounded bg-theme-light px-3 py-1 hover:bg-primary hover:text-white   "
                          href={`/categories/${slugify(cat)}`}
                        >
                          {humanize(cat)}
                        </Link>
                      </div>
                    ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;


