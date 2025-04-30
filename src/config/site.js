let showInfo = true;

const siteConfig = {
  // Site Information
  title: "RPD Interiors",
  description: "Renovation and interior design services in Surrey",

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL 
    || (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : '')
    || "http://localhost:3000",

            
  // Contact Information
  email: "info@rpdinteriors.co.uk",
  phone: "+44 1234 567890",
  
  // Social Media
  social: {
    instagram: "https://instagram.com/rpdinteriors",
    facebook: "https://facebook.com/rpdinteriors",
    pinterest: "https://pinterest.com/rpdinteriors",
  },
  
  // SEO
  seo: {
    defaultImage: "/images/og-default.png",
    twitterHandle: "@rpdinteriors",
  },
  
  // Features
  features: {
    contactForm: true,
    gallery: true,
    blog: true,
  }
};

if (showInfo) {
  const isClient = (typeof window !== 'undefined');
  console.log(`${isClient ? 'Client' : 'Server'} Environment:`, process.env.NODE_ENV);
  console.log(`${isClient ? 'Client' : 'Server'} URL:`, siteConfig.siteUrl);
  showInfo = false ;
}

// Export as default
module.exports = siteConfig; 