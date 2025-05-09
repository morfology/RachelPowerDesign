// [src/app/categories/page.tsx] => http://localhost:3000/categories

import config from "@/config/config.json";
import { getTaxonomyAggr } from "@/lib/taxonomyParser";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import Link from "next/link";

const categories_taxonomy = "categories";
const projects_folder = config.settings.projects_folder;

const Categories = () => {
  console.warn("/categories");
  const countedItems = getTaxonomyAggr(projects_folder, categories_taxonomy);

  return (
    <>
      <PageHeader heading={"Categories"} />
      <section className="section">
        <div className="container text-center">
          <ul>
            {countedItems.map((item) => {

              const count = item.count;
              const cat = item.name;
              return (
                <li className="m-3 inline-block" key={cat}>
                  <Link
                    href={`/categories/${cat}`}
                    className="block rounded bg-theme-light px-4 py-2 text-xl text-dark  "
                  >
                    {humanize(cat)}
                    <span className="ml-2 rounded bg-body px-2 ">{count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Categories;
