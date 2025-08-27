// app/projects/page/[page]/page.tsx

import ProjectCard from "@/components/ProjectCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getPageFromPath, getAllSinglePages } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/components/PageHeader";
import { PostContent } from "@/types";
import { Metadata } from "next";
import { siteUrl } from "@/config/dynamic.js";
import siteConfig from "@/config/site.json";

const { pagination } = config.settings;
const projects_folder = "projects";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const allPost: PostContent[] = getAllSinglePages(projects_folder);
  const allSlug: string[] = allPost.map((item) => item.slug || '');
  const totalPages = Math.ceil(allSlug.length / pagination);
  const paths: { page: string }[] = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      page: (i + 1).toString(),
    });
  }

  return paths;
};

// generate metadata for pagination pages
export const generateMetadata = ({ params }: { params: { page: string } }): Metadata => {
  const postIndex: PostContent = getPageFromPath(`${projects_folder}/_index.md`);
  const currentPage = params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  
  const pageTitle = `${postIndex.frontmatter.title} - Page ${currentPage}`;
  const canonicalUrl = `${siteUrl}/projects/page/${currentPage}`;
  
  return {
    title: pageTitle,
    description: postIndex.frontmatter.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${pageTitle} | ${siteConfig.title}`,
      description: postIndex.frontmatter.description,
      url: canonicalUrl,
      siteName: siteConfig.title,
    },
  };
};

// for all regular pages
const Posts = ({ params }: { params: { page: number } }) => {
  const postIndex: PostContent = getPageFromPath(`${projects_folder}/_index.md`);
  const posts: PostContent[] = getAllSinglePages(projects_folder);

  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPage =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <PageHeader heading={postIndex.frontmatter.heading || '?'} />
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
