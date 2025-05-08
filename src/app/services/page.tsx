//=> app/services/page.tsx

import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import CallToAction from "@/partials/CallToAction";

const Services = () => {
  //const data: RegularPage = getListPage("pages/services.md");
  const data = getListPage("services/_index.md");

  const { frontmatter } = data;
  const { heading } = frontmatter;

  // Combine the CallToAction data into a single array
  const ctaData = [
    getListPage("sections/call-to-action-design-consult.md"),
    getListPage("sections/call-to-action-design.md"),
    //getListPage("sections/call-to-action-project.md"),

    getListPage("sections/call-to-action-architecture.md"),
    getListPage("sections/call-to-action-procurement.md"),
    getListPage("sections/call-to-action-style.md"),

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
