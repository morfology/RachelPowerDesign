import { Metadata } from "next";

import { Post } from "@/types";
import config from "@/config/config.json";

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


  return (true
    // <>
    //   <title>
    //     {plainify(title || config.site.title)}
    //   </title>

    //   <meta name="description" content={plainify(page_description)} />
    //   <meta name="author" content={meta_author} />

    //   <meta property="og:title" content={plainify(page_title)}/>
    //   <meta property="og:description" content={plainify(page_description)} />
    //   <meta property="og:image" content={`${base_url}${image || meta_image}`} />
    //   <meta property="og:url" content={canonical_url}/>
    //   <meta property="og:type" content="website" />

    //   <link rel="canonical" href={canonical_url} itemProp="url" />

    //   {/* noindex robots tbd*/}
    //   {/* {noindex && <meta name="robots" content="noindex,nofollow" />} */}
    // </>
  );
};

//export default SeoMeta;







const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const seoMetaData = (): Metadata => {
  return {
    metadataBase: new URL(siteUrl),

    title: "TEST",
    description: "Get in touch with us",
    openGraph: {
      title: "Contact Us...",
      description: "Get in touch with us",
      type: "website",
    },
  };
};

const seoMetaData2 = (page: Post): Metadata => {



  const { title, meta_title, description, image } = page.frontmatter;

  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  //const pathname = usePathname();

  //const canonical_url = `${base_url}/${pathname.replace("/", "")}`;
  const page_title = meta_title || title || config.site.title;
  const page_description = description || meta_description;



  return {
    metadataBase: new URL(siteUrl),

    title: meta_title || title,
    description: "Get in touch with us",
    openGraph: {
      title: "Contact Us...",
      description: "Get in touch with us",
      type: "website",
    },
  };
};



export default seoMetaData2;
