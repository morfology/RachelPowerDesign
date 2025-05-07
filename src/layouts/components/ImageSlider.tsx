"use client"; // <===== REQUIRED



// Swiper components, modules and styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";





// SliderButton code:
// import React from "react";
// interface ButtonProps {
//   id: number;
//   text: string;
//   link: string;
//   type: string;
// }
//
// const SliderButtons: React.FC<{ buttons: ButtonProps[] }> = ({ buttons }) => {
//   return buttons.map(({ id, link, text }) => (
//     <a target="_blank" key={id} href={link}>
//       <span>{text}</span>
//     </a>
//   ));
// };
//
// export default SliderButtons;



// Old <SwiperSlide:
//     <div
//       className="h-full w-full absolute left-0 top-0"
//       style={{
//         background: `url(${image}) center center / cover scroll no-repeat`,
//       }}
//     ></div>
//     <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
//     <div className="relative z-10 h-full flex items-center justify-center">
//       <div className="text-center">
//         {tagline && (
//           <p className="text-md sm:text-xl lg:text-3xl font-semibold text-white">
//             {tagline}
//           </p>
//         )}
//         <p className="text-3xl sm:text-6xl lg:text-8xl font-bold text-white">
//           {title}
//         </p>
//         {buttons.length > 0 ? (
//           <p className=" bg-gray-800 inline-block px-9 py-2 rounded-full text-white mt-10 lg:mt-20">
//             <SliderButtons buttons={buttons} />
//           </p>
//         ) : null}
//       </div>
//     </div>


