import React from "react";

function Testimonial({link, children} : {link: string; children: React.ReactNode;}) {

  const default_link = 'https://www.houzz.com/professionals/interior-designers-and-decorators/rachel-power-design-pfvwus-pf~1166209749';
  //const ctaAbout1 = getPageFromPath("about/call-to-action-about-1.md");

  return (
    <a style={{textDecoration: 'none'}} href={link || default_link} target="_blank" rel="noopener noreferrer" className="block mb-10">
      {/* <CallToAction data={ctaAbout1} /> */}
      <blockquote>
        {children} 
      </blockquote>
    </a>
  );
}

export default Testimonial;
