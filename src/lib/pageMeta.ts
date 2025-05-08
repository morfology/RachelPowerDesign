// lib/pageMeta.ts
import { getListPage } from "@/lib/contentParser";
import { Metadata } from "next";
import { siteUrl } from "@/config/dynamic.js";
import config from "@/config/config.json";

// Default metadata for the site
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: config.site.title,
    template: `%s | ${config.site.title}`,
  },

  description: config.metadata.meta_description,
  openGraph: {
    title: config.site.title,
    description: config.metadata.meta_description,
    url: siteUrl,
    siteName: config.site.title,
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: config.site.title,
      },
    ],
    type: "website",
  }  
}

// Metadata for a page
export const getPageMetadata = (slug: string): Metadata => {
  const {
    meta_title,
    title,
    description,
    //image,
  } = getListPage(slug).frontmatter;

  const md = {
    title: meta_title || title,
    description,
    openGraph: {
      title: meta_title || title,
      description,
      url: `${siteUrl}/${slug.replace("_index.md", "").replace(/\/$/, "")}`,
      // images: image
      //   ? [
      //       {
      //         url: `${siteUrl}/${image}`,
      //         width: 1200,
      //         height: 630,
      //         alt: meta_title || title,
      //       },
      //     ]
      //   : defaultOgImage,
    },
  };
  console.warn("md", md);

  return md
};
