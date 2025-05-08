//=> app/categories/[single]/page.tsx

import ProjectCard from "@/components/ProjectCard";
import config from "@/config/config.json";
import { getAllSinglePages } from "@/lib/contentParser";
import { getTaxonomyAggr } from "@/lib/taxonomyParser";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import { PostContent } from "@/types";

const { projects_folder } = config.settings;
type StaticParams = () => { single: string }[];

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: StaticParams = () => {
  const categories: Array<string> = getTaxonomyAggr(projects_folder, "categories").map((item) => item.name);

  console.warn("cats", categories)
  const paths = categories.map((category) => ({
    single: category,
  }));

  return paths;
};

const CategorySingle = ({ params }: { params: { single: string } }) => {
  const posts: PostContent[] = getAllSinglePages(projects_folder);
  const filterByTags = taxonomyFilter(posts, "categories", params.single);

console.warn("filterByTags", filterByTags);

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
