// lib/pageMeta.ts
import { getPageFromPath } from "@/lib/contentParser";
import { Metadata } from "next";
import { siteUrl } from "@/config/dynamic.js";
import { site as siteConfig } from "@/config/config.json";
import { PostContent } from "@/types";

const defaultTitle = siteConfig.title;
const defaultDescription = siteConfig.meta_description;
const defaultOgImage = {
  url: `${siteUrl}/images/og-default.png`,
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
    images: [ defaultOgImage ],
    type: "website",
  }  
}

// Metadata for a page
export const getPageMetadata = (slug: string): Metadata => {
  const {
    title,
    description,
    //image,
  } = getPageFromPath(slug).frontmatter;

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

// Metadata for a page
export const getPostMetadata = (post: PostContent): Metadata => {

  if (!post) { throw new Error("Post not found"); }

  const md = {
    title: post.frontmatter.title || defaultTitle,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title || defaultTitle,
      description: post.frontmatter.description,
      url: `${siteUrl}/${post.slug}`,
      siteName: defaultTitle,
      images:[ 
        defaultOgImage 
      ]
    },
  };
  return md
};
