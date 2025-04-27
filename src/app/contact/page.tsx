import { Metadata } from "next";
import ContactForm from "@/app/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us",
  openGraph: {
    title: "Contact Us",
    description: "Get in touch with us",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
