import ImageFallback from "@/helpers/ImageFallback";
import { PostContent } from "@/types";
import Link from "next/link";

const projects_folder = "projects";

const ProjectCard = ({ data }: { data: PostContent }) => {
  const { heading, image } = data.frontmatter;
  return (

    <Link href={`/${projects_folder}/${data.slug}`}>
      <div className="relative max-w-xl mx-auto mt-20">
        {image && (
          <ImageFallback
            className="h-94 w-full object-cover rounded-md"
            src={image}
            alt={heading}
            width={445}
            height={230}
          />
        )}

        <div className="absolute inset-0 bg-gray-700 opacity-30 rounded-md"></div>

        <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">{heading}</h2>
        </div>
      </div>
    </Link>

  );
};

export default ProjectCard;

/*
Original code:

    <div className="bg-body ">
      {image && (
        <ImageFallback
          className="mb-6 w-full rounded"
          src={image}
          alt={title}
          width={445}
          height={230}
        />
      )}
      <h4 className="mb-3">
        <Link href={`/${projects_folder}/${data.slug}`}>{title}</Link>
      </h4>
    </div>


Variant "Paris":
    <Link href={`/${projects_folder}/${data.slug}`}>
      <div className="relative flex flex-col px-8 pb-8 pt-40 max-w-sm mx-auto mb-10">
        {image && (
          <ImageFallback
            xclassName="mb-6 w-full rounded"
            className="rounded absolute inset-0 h-full w-full object-cover"
            src={image}
            alt={title}
            width={445}
            height={230}
          />
        )}

        <h3 className="z-10 mt-3 text-3xl font-bold text-white">{title}</h3>
        <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{title}</div>
      </div>
    </Link>

Variant 2: "Lost In Mountains":
    <Link href={`/${projects_folder}/${data.slug}`}>
      <div className="relative max-w-xl mx-auto mt-20">
        {image && (
          <ImageFallback
            className="h-64 w-full object-cover rounded-md"
            src={image}
            alt={title}
            width={445}
            height={230}
          />
        )}

        <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>

        <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>



*/