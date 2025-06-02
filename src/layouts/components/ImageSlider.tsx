"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const ImageSlider = ({ data }: { data: string[] }) => {

  let swiperRef: SwiperClass | null = null;

  return (

    <Swiper
      onSwiper={(swiper) => (swiperRef = swiper)}
      pagination={{ type: "bullets", clickable: true }}
      autoplay={false}
      loop={true}
      modules={[Autoplay, Navigation, Pagination]}
    >
      {data.map((url, index) => (
        <SwiperSlide key={index}>
          <Image
            // 3:2 Aspect Ratio of our ideal images e.g. "kitchen-sink-1200.webp"
            width={1200}
            height={800}
            alt={`Slide ${index + 1}`}
            className="w-full rounded"
            src={url}
            onClick={() => swiperRef?.slideNext()}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;