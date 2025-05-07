//=> /projects/the-project

import config from "@/config/config.json";
import MDXContent from "@/helpers/MDXContent";
import { getAllSinglePages } from "@/lib/contentParser";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import { PostContent } from "@/types";
import Link from "next/link";
import ImageSlider from "@/components/ImageSlider";
import imageConfig from "@/config/images.json";
// import { Metadata } from "next";

const { projects_folder } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// export function generateMetadata({ params }: { params: { single: string } }): Metadata {
//   console.log(params)
//   return {
//     openGraph: {
//       url: `/projects/${params.single}`, // resolves to the project
//     }
//   };
// }

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: PostContent[] = getAllSinglePages(projects_folder);

  const paths = posts.map((post) => ({
    single: post.slug || '',
  }));

  return paths;
};

const PostSingle = ({ params }: { params: { single: string } }) => {
  const posts: PostContent[] = getAllSinglePages(projects_folder);
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const {
    title,
    folder,
    meta_title,
    description,
    image,
    author,
    categories,
    date,
    tags,
  } = frontmatter;

  //console.log(dataSlider)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let imageSliderData: any[] = [];

  // now use location to query the image slider
  if (folder) {

    imageSliderData = imageConfig    
      // Filter images that match the project
      .filter(obj => obj.image && obj.image.includes(`/images/${folder}/`))

      // Filter out images that match the detail
      .filter(obj => obj.image && !obj.image.includes(`detail`))

      // Image slider requires id, we don't use it so just add "any"
      .map(y => ({ id: 'any', image: y.image}))
    ;
  }

  return (
    <>
      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-10">
              {image && (
                <div className="mb-10">
                  <ImageSlider data={imageSliderData} />
                </div>
              )}
              <h1
                dangerouslySetInnerHTML={markdownify(title || 'TEST2')}
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


              {/* <div className="row items-start justify-between">
                <div className="mb-10 flex items-center lg:col-5 lg:mb-0">
                  <h5 className="mr-3">Tags :</h5>
                  <ul>
                    {tags?.map((tag: string) => (
                      <li key={tag} className="inline-block">
                        <Link
                          className="m-1 block rounded bg-theme-light px-3 py-1 hover:bg-primary hover:text-white   "
                          href={`/tags/${slugify(tag)}`}
                        >
                          {humanize(tag)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;


