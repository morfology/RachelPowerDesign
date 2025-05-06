/* eslint-disable @typescript-eslint/explicit-function-return-type */
// Rertun dynamic parts of the config

/* eslint-disable @typescript-eslint/no-require-imports */
//const imageConfig = require("./config.json");

const dynamicConfig = {

  siteUrl: getSiteUrl()
  
            
};

// Site Information

function getSiteUrl() {

  return process.env.NEXT_PUBLIC_SITE_URL 
    || (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : '')
    || "http://localhost:3000"


}

// if (process.env.NODE_ENV !== 'development') {
//   const isClient = (typeof window !== 'undefined');
//   console.warn(`${isClient ? 'Client' : 'Server'} Environment:`, process.env.NODE_ENV);
//   console.warn(`${isClient ? 'Client' : 'Server'} URL:`, siteConfig.siteUrl);
//   //showInfo = false ;
// }

// Export as default
module.exports = dynamicConfig; 