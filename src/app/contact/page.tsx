import MDXContent from "@/helpers/MDXContent";
import { getPageFromPath } from "@/lib/contentParser";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { getPostMetadata } from "@/lib/pageMeta";

const page = getPageFromPath(`contact/_index.md`);

// Get metadata for the page
export const generateMetadata = () => getPostMetadata(page);

// ContactPage page component
export default function ContactPage() {

  return <>
    <PageHeader heading={page.frontmatter.heading} />
    <section className="contact">
      <ContactForm />
    </section>

    <section className="section">
      <div className="container">
        <div className="content">
          <MDXContent content={page.content} />
        </div>
      </div>
    </section>
  </>;
}


