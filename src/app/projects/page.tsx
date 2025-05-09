// projects/page.tsx => https://localhost:3000/projects

import ProjectCard from "@/components/ProjectCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getPageFromPath, getAllSinglePages } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import { PostContent } from "@/types";
import { getPostMetadata } from "@/lib/pageMeta";

const { projects_folder, pagination } = config.settings;
const page: PostContent = getPageFromPath(`${projects_folder}/_index.md`);

// Get metadata for the page
export const generateMetadata = () => getPostMetadata(page);

// for all regular pages
const Posts = () => {

  const posts: PostContent[] = getAllSinglePages(projects_folder);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = sortedPosts.slice(0, pagination);

  return (
    <>
      <PageHeader heading={page.frontmatter.heading || '?'} />
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            {/* rebalance the grid. */}
            {/* <div className="lg:col-8"> */}
            <div>
            <div className="row">
                {currentPosts.map((post: PostContent, index: number) => (
                  <div key={index} className="mb-14 md:col-6">
                    <ProjectCard data={post} />
                  </div>
                ))}
              </div>
              <Pagination
                section={projects_folder}
                currentPage={1}
                totalPages={totalPages}
              />
            </div>

            {/* <PostSidebar
              categories={categories}
              tags={tags}
              allCategories={allCategories}
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Posts;
