// app/tags/[single]/page.tsx : /tags/mytag

import ProjectCard from "@/components/ProjectCard";
import { getAllSinglePages } from "@/lib/contentParser";
import { getTaxonomyAggr, CountedItem } from "@/lib/taxonomyParser";
import taxonomyFilter from "@/lib/utils/taxonomyFilter";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/components/PageHeader";
import { PostContent } from "@/types";

const projects_folder = "projects";
type StaticParams = () => { single: string }[];

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: StaticParams = () => {

  const countedItems: CountedItem[] = getTaxonomyAggr(projects_folder, 'tags');
  const uniqueTags = countedItems.map((item) => item.name);

  console.warn("tagsx", uniqueTags);

  const paths = uniqueTags.map((tag) => ({single: tag,}));

  return paths;
};

const TagSingle = ({ params }: { params: { single: string } }) => {
  const posts: PostContent[] = getAllSinglePages(projects_folder);
  const filterByTags = taxonomyFilter(posts, "tags", params.single);

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

export default TagSingle;
