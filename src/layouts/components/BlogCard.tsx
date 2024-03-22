import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import dateFormat from "@/lib/utils/dateFormat";
import { humanize, plainify, slugify } from "@/lib/utils/textConverter";
import { Post } from "@/types";
import Link from "next/link";
import { FaRegFolder, FaRegUserCircle } from "react-icons/fa/index.js";

const BlogCard = ({ data }: { data: Post }) => {
  const { summary_length, projects_folder } = config.settings;
  const { title, image, author, categories, date } = data.frontmatter;
  return (

    <Link href={`/${projects_folder}/${data.slug}`}>
      <div className="relative flex flex-col px-8 pb-8 pt-40 max-w-sm mx-auto mb-10">
        {/* <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a" alt="University of Southern California" 
        className="absolute inset-0 h-full w-full object-cover"/> */}
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



  );
};

export default BlogCard;

/*
Previous code:

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

*/