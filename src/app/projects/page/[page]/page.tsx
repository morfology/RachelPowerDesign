// app/projects/page/[page]/page.tsx

import ProjectCard from "@/components/ProjectCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import { Post } from "@/types";

const { projects_folder, pagination } = config.settings;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const allPost: Post[] = getSinglePage(projects_folder);
  const allSlug: string[] = allPost.map((item) => item.slug!);
  const totalPages = Math.ceil(allSlug.length / pagination);
  const paths: { page: string }[] = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      page: (i + 1).toString(),
    });
  }

  return paths;
};

function spreadPages(num: number): number[] {
  const pages = [];

  for (let i = 2; i <= num; i++) {
    pages.push(i);
  }

  return pages;
}

// for all regular pages
const Posts = ({ params }: { params: { page: number } }) => {
  const postIndex: Post = getListPage(`${projects_folder}/_index.md`);
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const posts: Post[] = getSinglePage(projects_folder);
  // const allCategories = getAllTaxonomy(projects_folder, "categories");
  // const categories = getTaxonomy(projects_folder, "categories");

  const tags = getTaxonomy(projects_folder, "tags");
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPage =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <PageHeader title={postIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            {/* rebalance the grid. */}
            {/* <div className="lg:col-8"> */}
            <div>
              <div className="row">
                {currentPosts.map((post: Post, index: number) => (
                  <div key={index} className="mb-14 md:col-6">
                    <ProjectCard data={post} />
                  </div>
                ))}
              </div>
              <Pagination
                section={projects_folder}
                currentPage={currentPage}
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
