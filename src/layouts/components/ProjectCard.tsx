import { PostContent } from "@/types";
import Link from "next/link";
import Image from "next/image";

const projects_folder = "projects";

const ProjectCard = ({ data }: { data: PostContent }) => {
  const { heading, image } = data.frontmatter;
  
  // Generate SEO-friendly alt text
  const generateAltText = (): string => {
    if (!heading) {return "Interior design project";}
    
    // If heading already mentions "interior design" or similar, use as-is
    const lowerHeading = heading.toLowerCase();
    if (lowerHeading.includes('design') || lowerHeading.includes('renovation') || lowerHeading.includes('refurbishment')) {
      return heading;
    }
    
    // Otherwise, add context for SEO
    return `${heading} - Interior design project`;
  };

  return (
    <Link href={`/${projects_folder}/${data.slug}`}>
      <div className="relative max-w-xl mx-auto mt-20">
        {image && (
          <Image
            src={image}
            alt={generateAltText()}
            width={900}
            height={600} // 3:2 aspect ratio
            className="rounded-md object-cover"
            priority
          />
        )}

        <div className="absolute inset-0 bg-gray-700 opacity-30 rounded-md"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold text-center px-4">
            {heading}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
