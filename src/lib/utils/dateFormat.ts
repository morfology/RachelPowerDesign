import { format } from "date-fns";
import { Metadata } from "next";

const dateFormat = (): Metadata => {
  return {
    title: "TEST",
    description: "Get in touch with us",
    openGraph: {
      title: "Contact Us",
      description: "Get in touch with us",
      type: "website",
    },
  };
};

export default dateFormat;
