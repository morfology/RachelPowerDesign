/**
 * Content of the /projects/ listing 
 */
import ProjectCard from "@/components/ProjectCard";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import { Metadata } from "next";
import dateFormat from "@/lib/utils/dateFormat";

const { projects_folder, pagination } = config.settings;
const postIndex: Post = getListPage(`${projects_folder}/_index.md`);
const { title, meta_title, description, image } = postIndex.frontmatter;


//import ContactForm from "@/app/contact/ContactForm";

export const metadata: Metadata = dateFormat();

// for all regular pages
const Posts = () => {
  const posts: Post[] = getSinglePage(projects_folder);
  const allCategories = getAllTaxonomy(projects_folder, "categories");
  const categories = getTaxonomy(projects_folder, "categories");
  const tags = getTaxonomy(projects_folder, "tags");
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = sortedPosts.slice(0, pagination);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={postIndex.frontmatter.title} />
      <section className="section">
        <div className="container">
          <div className="row gx-5">
            {/* rebalance the grid. */}
            {/* <div className="lg:col-8"> */}
            <div>
            <div className="row">
                {currentPosts.map((post: any, index: number) => (
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
