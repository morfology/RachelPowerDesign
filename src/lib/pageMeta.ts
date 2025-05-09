// lib/pageMeta.ts
import { getListPage } from "@/lib/contentParser";
import { Metadata } from "next";
import { siteUrl } from "@/config/dynamic.js";
import config from "@/config/config.json";


const defaultTitle = config.site.title;
const defaultDescription = config.metadata.meta_description;
const defaultOgImage = {
  url: `${siteUrl}/og-default.png`,
  width: 1200,
  height: 630,
  alt: defaultTitle
};


  // Default metadata for the site
export const defaultMetadata: Metadata = {

  metadataBase: new URL(siteUrl),

  title: {
    default: defaultTitle,
    template: `%s | ${defaultTitle}`,
  },

  description: defaultDescription,

  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: defaultTitle,
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
    type: "website",
  }  
}

// Metadata for a page
export const getPageMetadata = (slug: string): Metadata => {
  const {
    title,
    description,
    //image,
  } = getListPage(slug).frontmatter;

  const md = {
    title: title || defaultTitle,
    description,
    openGraph: {
      title: title,
      description,
      url: `${siteUrl}/${slug.replace("_index.md", "").replace(/\/$/, "")}`,
      siteName: defaultTitle,
      images:[ 
        defaultOgImage 
      ]
    },
  };
  console.warn("md", md);

  return md
};
