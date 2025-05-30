"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";


// Our custom button component
// import SliderButtons from "./SliderButtons";

interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string;
  buttons: ButtonProps[];
}

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

interface DemoSliderProps {
  data: Slide[];
}

const DemoSlider: React.FC<DemoSliderProps> = ({ data }) => {
  return (
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={false}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
          >
            {data.map(({ id, image, title }) => (
              <SwiperSlide key={id}>
                <Image
                    height={500}
                    width={1200}
                    alt={title}
                    className="w-full rounded"
                    src={image} />
              </SwiperSlide>
            ))}
          </Swiper>
  );
};

export default DemoSlider;



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

