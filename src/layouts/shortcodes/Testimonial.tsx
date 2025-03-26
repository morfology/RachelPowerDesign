import React from "react";

function Testimonial({link, children} : {link: string; children: React.ReactNode;}) {

  const default_link = 'https://www.houzz.com/professionals/interior-designers-and-decorators/rachel-power-design-pfvwus-pf~1166209749';

  return (
    <a style={{textDecoration: 'none'}} href={link || default_link}>
      <blockquote>
        {children} 
      </blockquote>
    </a>
  );
}

export default Testimonial;
