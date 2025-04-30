
const siteConfig = {
  // Site Information
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL 
    || (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : '')
    || "http://localhost:3000"
  ,
            
  // SEO
  seo: {
    defaultImage: "/images/og-default.png",
  }
};

if (process.env.NODE_ENV !== 'development') {
  const isClient = (typeof window !== 'undefined');
  console.warn(`${isClient ? 'Client' : 'Server'} Environment:`, process.env.NODE_ENV);
  console.warn(`${isClient ? 'Client' : 'Server'} URL:`, siteConfig.siteUrl);
  //showInfo = false ;
}

// Export as default
module.exports = siteConfig; 