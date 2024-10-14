// import { RudderAnalytics } from '@rudderstack/analytics-js';

// const rudderAnalytics = new RudderAnalytics();
// rudderAnalytics.load(
//   // import.meta.env.VITE_RS_WRITE_KEY,
//   '2ly1GKjoWwxM7Ayn9UgPXEJZLI5',
//   // import.meta.env.VITE_RS_DATA_PLANE_URL,
//   'https://googlemailypsd.dataplane.rudderstack.com',
//   {}
// );
// console.info('Loaded RS');

// Some shorthand functions with console logs to
// help in the debugging phase

function RS_Identify(gradual_user_id: string, details: any) {

  //rudderAnalytics.identify(gradual_user_id, details);
  console.log(`RS identify() ${gradual_user_id}`, details);  
}

function RS_Track(event: string, properties: any) {

  //rudderAnalytics.track(event, properties);
  console.log(`RS Track() ${event}: `, properties);  
}

function RS_Page() {

  //rudderAnalytics.page();
  console.log(`RS Page(${location})`);  
}

export { /*rudderAnalytics*/ RS_Identify, RS_Track, RS_Page };