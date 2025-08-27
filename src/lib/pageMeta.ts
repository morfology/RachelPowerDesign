// lib/pageMeta.ts
import { getPageFromPath } from "@/lib/contentParser";
import { Metadata } from "next";
import { siteUrl } from "@/config/dynamic.js";
import siteConfig from "@/config/site.json";
import { PostContent } from "@/types";

const defaultTitle = siteConfig.title;
const defaultDescription = siteConfig.meta_description;
const defaultOgImage = {
  url: `${siteUrl}/images/og-default.png?v=1.1`,
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

  // Generate clean canonical URL for static pages
  const cleanPath = slug.replace("_index.md", "").replace(/\/$/, "");
  const canonicalUrl = cleanPath ? `${siteUrl}/${cleanPath}` : siteUrl;

  const md = {
    title: title || defaultTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title,
      description,
      url: canonicalUrl,
      siteName: defaultTitle,
      images:[ 
        defaultOgImage 
      ]
    },
  };

  return md
};

// Metadata for a page
export const getPostMetadata = (post: PostContent): Metadata => {

  if (!post) { throw new Error("Post not found"); }

  const pageTitle = post.frontmatter.title;
  
  // Create title for OpenGraph/Twitter (with template logic)
  const ogTitle = pageTitle ? 
    (pageTitle.includes("Rachel Power Design") ? pageTitle : `${pageTitle} | ${defaultTitle}`) 
    : defaultTitle;
  
  // Generate clean canonical URL
  const canonicalPath = post.slug?.replace(/\/_index$/, '').replace(/^\//, '') || '';
  const canonicalUrl = canonicalPath ? `${siteUrl}/${canonicalPath}` : siteUrl;

  const md: Metadata = {
    description: post.frontmatter.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: post.frontmatter.description,
      url: canonicalUrl,
      siteName: defaultTitle,
      images:[ 
        defaultOgImage 
      ]
    },
    twitter: {
      title: ogTitle,
      description: post.frontmatter.description,
      card: "summary_large_image",
      images: [{
        url: defaultOgImage.url,
        alt: defaultOgImage.alt,
      }],
    }
  };

  // Set the main title (Next.js template will handle this automatically)
  if (pageTitle) {
    md.title = pageTitle;
  }

  return md
};
