/**
 * CallToAction (Partial)
 */

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import Link from "next/link";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {

  // @MP Show scaled icons
  const actualWidth = 268;
  const actualHeight = 190;
  const scale = 1;
  let width = actualWidth / scale;
  let height = actualHeight / scale;

  return (
    <>
      {data.frontmatter.enable && (

        0 ? 
        <section className="mt-2">
          <div className="container text-center">
            <div className="rounded-2xl bg-gradient-to-b from-body to-theme-light px-8 py-14  ">

              <div className="rounded-2xl   ">
                <h1>{data.frontmatter.title}<span className="text-bauen-brown"> .</span></h1>
              </div>
              <div className="row items-center justify-between">
                <div className="mb-10 md:col-5 lg:col-4 md:order-2 md:mb-0">
                  <ImageFallback
                    className="rounded-md object-cover h-{height} w-{width}"
                    src={data.frontmatter.image}
                    width={width}
                    height={height}
                    alt="cta-image"
                  />
                </div>

              </div>
            </div>
          </div>
        </section>
        :
        <section className="mt-2">
          <div className="container">
            <div className="rounded-xl px-4 py-16  xl:p-20">
              <div className="row items-center justify-between">
                <div className="mb-10 md:col-5 lg:col-4 md:order-2 md:mb-0">
                  <ImageFallback
                    className="rounded object-cover h-{height} w-{width}"
                    src="/images/marcia-house/detail-kitchen.jpg"
                    width={width}
                    height={height}
                    alt="cta-image"
                  />
                </div>
                <div className="md:col-7 md:order-1">
                  <h1
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.title,
                    )}
                    className="mb-2"
                  />
                  <p
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description,
                    )}
                    className="mb-6"
                  />
                  {data.frontmatter.button.enable && (
                    <Link
                      className="btn btn-primary"
                      href={data.frontmatter.button.link}
                    >
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
