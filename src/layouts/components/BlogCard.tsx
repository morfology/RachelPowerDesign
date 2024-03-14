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
      {/* <p className="mb-6">
        {plainify(data.content!.slice(0, Number(summary_length)))}
      </p> */}
      {/* <Link
        className="btn btn-outline-primary btn-sm"
        href={`/${projects_folder}/${data.slug}`}
      >
        read more
      </Link> */}
    </div>
  );
};

export default BlogCard;
