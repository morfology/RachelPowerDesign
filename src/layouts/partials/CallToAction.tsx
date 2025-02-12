/**
 * CallToAction (Partial)
 */

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify, multimarkdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {

  // @MP Show scaled icons
  const width =268;
  const height = 190;

  return (
    <>
      {data.frontmatter.enable && (


<section className="mt-2 w-full">
  <div className="container">
    <div className="rounded px-4 py-16 xl:p-20">
      {/* Use flex to align the panels side by side with a gap */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-8">
        {/* Image panel */}
        <div className="mb-10 md:w-2/5 md:order-2 md:mb-0">
          <Image
            className="rounded object-cover h-full w-full"
            src={data.frontmatter.image}
            width={width}
            height={height}
            alt="cta-image"
          />
        </div>
        {/* Content panel */}
        <div className="md:w-3/5 md:order-1 rounded bg-gradient-to-b from-[#fbfbfb] to-theme-light p-12 lg:p-16">
          <h2
            dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
            className="text-h2-sm md:text-h2 mb-6 uppercase prose prose-headings:font-serif prose-headings:text-blue-800"
          />

          {multimarkdownify(data.frontmatter.description).map((html, index) => (
            <p
              key={index}
              dangerouslySetInnerHTML={html}
              className="mb-8 prose prose-mine"
            />
          ))}


          {data.frontmatter.button.enable && (
            <Link className="btn btn-primary" href={data.frontmatter.button.link}>
              {data.frontmatter.button.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
</section>
      )}
    </>
  );
};

export default CallToAction;
