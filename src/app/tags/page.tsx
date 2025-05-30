// app/tags/page.tsx => http://localhost:3000/tags

import { CountedItem, getTaxonomyAggr } from "@/lib/taxonomyParser";
import { humanize } from "@/lib/utils/textConverter";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const projects_folder = "projects";

const tags = () => {
  const countedItem: CountedItem[] = getTaxonomyAggr(projects_folder, 'tags');

  console.warn(tags)

  return (
    <>
      <PageHeader heading={"Tags"} />
      <section className="section">
        <div className="container text-center">
          <ul>
            {countedItem.map((item) => {

              const count = item.count;
              const tag = item.name;
              return (
                <li className="m-3 inline-block" key={tag}>
                  <Link
                    href={`/tags/${tag}`}
                    className="block rounded bg-theme-light px-4 py-2 text-xl text-dark  "
                  >
                    {humanize(tag)}
                    <span className="ml-2 rounded bg-body px-2 ">{count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {/* <section className="section">
        <div className="container text-center">
          <ul>
            {tags.map((tag: string) => {
              const count: number = alltags.filter(
                (c: string) => c === tag,
              ).length;
              return (
                <li className="m-3 inline-block" key={tag}>
                  <Link
                    href={`/tags/${tag}`}
                    className="block rounded bg-theme-light px-4 py-2 text-xl text-dark  "
                  >
                    {humanize(tag)}
                    <span className="ml-2 rounded bg-body px-2 ">{count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section> */}
    </>
  );
};

export default tags;
