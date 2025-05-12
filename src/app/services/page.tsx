// services/page.tsx => http://localhost:3000/services

import { getPageFromPath } from "@/lib/contentParser";
import PageHeader from "@/components/PageHeader";
import CallToAction from "@/components/CallToAction";
import { getPostMetadata } from "@/lib/pageMeta";

const page = getPageFromPath(`services/_index.md`);

// Get metadata for the page
export const generateMetadata = () => getPostMetadata(page);

const Services = () => {

  // Combine the CallToAction data into a single array
  const ctaData = [
    getPageFromPath("sections/call-to-action-design-consult.md"),
    getPageFromPath("sections/call-to-action-design.md"),
    //getPageFromPath("sections/call-to-action-project.md"),
    getPageFromPath("sections/call-to-action-architecture.md"),
    getPageFromPath("sections/call-to-action-procurement.md"),
    getPageFromPath("sections/call-to-action-style.md"),
  ];

  return (
    <>
      <PageHeader heading={page.frontmatter.heading || '?'} />
      {/* Iterate over the ctaData array to render CallToAction components */}
      {ctaData.map((cta, index) => (
        <CallToAction key={index} data={cta} />
      ))}
    </>
  );
};

export default Services;
