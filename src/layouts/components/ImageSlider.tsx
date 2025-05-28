"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";


// interface DemoSliderProps {
//   data: string[];
// }

//const ImageSlider = ({ heading }: { heading: string }) => {


const ImageSlider = ({ data }: { data: string[] }) => {

  console.warn('DATA', data)

  return (

    <Swiper
      navigation
      pagination={{ type: "bullets", clickable: true }}
      autoplay={false}
      loop={true}
      modules={[Autoplay, Navigation, Pagination]}
    >
      {data.map((url, index) => (
        <SwiperSlide key={index}>
          <Image
            height={500}
            width={1200}
            alt={`Slide ${index + 1}`}
            className="w-full rounded"
            src={url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;