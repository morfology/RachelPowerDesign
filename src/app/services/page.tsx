//=> app/services/page.tsx

import { getPageFromPath } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";

const Services = () => {
  const data = getPageFromPath("services/_index.md");

  const { frontmatter } = data;
  const { heading } = frontmatter;

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
      <PageHeader heading={heading || '?'} />
      {/* Iterate over the ctaData array to render CallToAction components */}
      {ctaData.map((cta, index) => (
        <CallToAction key={index} data={cta} />
      ))}
    </>
  );
};

export default Services;
