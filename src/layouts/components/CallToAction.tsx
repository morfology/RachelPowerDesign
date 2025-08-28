/**
 * CallToAction (Partial)
 */

import { markdownify, multimarkdownify } from "@/lib/utils/textConverter";
import { Frontmatter } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Frontmatter;
}

const CallToAction = ({ data }: { data: PageData }) => {

  // @MP Show scaled icons
  const width =268;
  const height = 190;

  // Generate descriptive alt text from image path and heading
  const generateAltText = (): string => {
    const imagePath = data.frontmatter.image || '';
    const heading = data.frontmatter.heading || '';
    
    // Extract context from image path
    const filename = imagePath.split('/').pop()?.split('.')[0] || '';
    const projectFolder = imagePath.split('/')[imagePath.split('/').length - 2] || '';
    
    const roomDescription = filename
      .replace(/-\d+$/, '') // remove size suffixes
      .replace(/-crop.*$/, '') // remove crop suffixes
      .replace(/-x\d+$/, '') // remove resolution suffixes
      .replace(/-/g, ' ')
      .replace(/^\w/, c => c.toUpperCase());
    
    const projectName = projectFolder
      .replace(/-/g, ' ')
      .replace(/^\w/, c => c.toUpperCase());
    
    // Combine with heading context for meaningful alt text
    if (heading && roomDescription && projectName) {
      return `${roomDescription} from ${projectName} - ${heading} showcase`;
    } else if (heading && roomDescription) {
      return `${roomDescription} interior design - ${heading}`;
    } else if (heading) {
      return `Interior design showcase - ${heading}`;
    } else {
      return 'Interior design project showcase';
    }
  };

  return (
    <>
      {true && (


<section className="mt-2 w-full">
  <div className="container">
    <div className="rounded px-4 py-16">
      {/* Use flex to align the panels side by side with a gap */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-8">
        {/* Image panel */}
        <div className="mb-10 md:w-2/5 md:order-2 md:mb-0">
          <Image
            className="rounded object-cover h-full w-full"
            src={data.frontmatter.image || ''}
            width={width}
            height={height}
            alt={generateAltText()}
          />
        </div>
        {/* Content panel */}
        <div className="md:w-3/5 md:order-1 rounded bg-gradient-to-b from-[#fbfbfb] to-theme-light p-12 lg:p-16">
          <h2
            dangerouslySetInnerHTML={markdownify(data.frontmatter.heading || '?')}
            className="text-h2-sm md:text-h2 mb-6 uppercase prose prose-headings:font-serif prose-headings:text-blue-800"
          />

          {multimarkdownify(data.frontmatter.description || 'TEST4').map((html, index) => (
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
