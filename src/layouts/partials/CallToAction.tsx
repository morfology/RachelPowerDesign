/**
 * CallToAction (Partial)
 */

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
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
        <div className="mb-10 flex-1 md:order-2 md:mb-0">
          <Image
            className="rounded object-cover h-full w-full"
            src={data.frontmatter.image}
            width={width}
            height={height}
            alt="cta-image"
          />
        </div>
        {/* Content panel */}
        <div className="flex-1 md:order-1 rounded bg-gradient-to-b from-[#fbfbfb] to-theme-light px-8 py-14">
          <h1
            dangerouslySetInnerHTML={markdownify(data.frontmatter.title)}
            className="mb-2"
          />
          <p
            dangerouslySetInnerHTML={markdownify(data.frontmatter.description)}
            className="mb-6"
          />
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
