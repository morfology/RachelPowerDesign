// => /projects

import ProjectCard from "@/components/ProjectCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getAllSinglePages } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import { PostContent } from "@/types";
// import { Metadata } from "next";

const { projects_folder, pagination } = config.settings;
const page: PostContent = getListPage(`${projects_folder}/_index.md`);

// export function generateMetadata({  }): Metadata {
//   return {
//     openGraph: {
//       url: `/projects`,
//     }
//   };
// }



// for all regular pages
const Posts = () => {
  const posts: PostContent[] = getAllSinglePages(projects_folder);
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = sortedPosts.slice(0, pagination);

  return (
    <>
      <PageHeader title={page.frontmatter.title} />
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
