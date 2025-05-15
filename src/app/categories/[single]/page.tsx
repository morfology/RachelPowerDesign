// categories/[single]/page.tsx => http://localhost:3000/categories/family-home-refresh

import ProjectCard from "@/components/ProjectCard";
import { getAllSinglePages, findPageForSlug } from "@/lib/contentParser";
import { getTaxonomyAggr } from "@/lib/taxonomyParser";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/components/PageHeader";
import { PostContent } from "@/types";
import { getPostMetadata } from "@/lib/pageMeta";

const categories_taxonomy = "categories";
const categories_folder = "categories";
const projects_folder = "projects";

type StaticParams = () => { single: string }[];

// remove dynamicParams
export const dynamicParams = false;

// get metadata for the page
export const generateMetadata = ({ params }: { params: { single: string } }) => 
  getPostMetadata(findPageForSlug(params.single, categories_folder))
;

// generate static params
export const generateStaticParams: StaticParams = () =>
  getTaxonomyAggr(projects_folder, categories_taxonomy)
    .map((item) => item.name).map((category) => 
      ({single: category}))
    ;

const CategorySingle = ({ params }: { params: { single: string } }) => {

  console.warn(`/categories/${params.single}`)

  const posts: PostContent[] = getAllSinglePages(projects_folder);
  const filterByTags = taxonomyFilter(posts, categories_taxonomy, params.single);

  return (
    <>
      <PageHeader heading={humanize(params.single)} />
      <div className="section-sm pb-0">
        <div className="container">
          <div className="row">
            {filterByTags.map((post: PostContent, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <ProjectCard data={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySingle;
