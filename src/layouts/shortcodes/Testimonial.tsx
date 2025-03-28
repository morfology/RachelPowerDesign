import React from "react";
import { getListPage } from "@/lib/contentParser";

// @MP Could be good to reuse content sections in shortcodes

function Testimonial({link, children} : {link: string; children: React.ReactNode;}) {

  const default_link = 'https://www.houzz.com/professionals/interior-designers-and-decorators/rachel-power-design-pfvwus-pf~1166209749';
  const ctaAbout1 = getListPage("about/call-to-action-about-1.md");


  return (
    <a style={{textDecoration: 'none'}} href={link || default_link}>
      {/* <CallToAction data={ctaAbout1} /> */}
      <blockquote>
        {children} 
      </blockquote>
    </a>
  );
}

export default Testimonial;
