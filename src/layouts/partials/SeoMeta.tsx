"use client";

import config from "@/config/config.json";
import { plainify } from "@/lib/utils/textConverter";
import { usePathname } from "next/navigation";

const SeoMeta = ({
  title,
  meta_title,
  image,
  description,
  canonical,
  noindex,
}: {
  title?: string;

  meta_title?: string;
  image?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const pathname = usePathname();

  const canonical_url = `${base_url}/${pathname.replace("/", "")}`;
  const page_title = meta_title || title || config.site.title;
  const page_description = description || meta_description;


  return (
    <>
    </>
  );
};

export default SeoMeta;
