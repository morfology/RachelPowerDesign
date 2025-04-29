import { Metadata } from "next";

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

export default seoMetaData;
