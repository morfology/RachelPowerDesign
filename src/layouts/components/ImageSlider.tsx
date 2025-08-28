"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface ImageSliderProps {
  data: string[];
  projectTitle?: string;
}

const ImageSlider = ({ data, projectTitle }: ImageSliderProps) => {

  let swiperRef: SwiperClass | null = null;

  // Generate descriptive alt text based on image path and project
  const generateAltText = (url: string, index: number): string => {
    const filename = url.split('/').pop()?.split('.')[0] || '';
    
    // Extract room/area from filename (e.g. 'kitchen-1200' -> 'kitchen')
    const roomName = filename
      .replace(/-\d+$/, '') // remove size suffix like '-1200'
      .replace(/-\d+-\d+$/, '') // remove numbered suffixes like '-2-1200'
      .replace(/-/g, ' ') // replace hyphens with spaces
      .replace(/^\w/, c => c.toUpperCase()); // capitalize first letter

    const project = projectTitle || 'Interior design project';
    
    if (roomName) {
      return `${roomName} - ${project} interior design`;
    }
    
    // Fallback for unclear filenames
    return `Interior design detail ${index + 1} - ${project}`;
  };

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
            alt={generateAltText(url, index)}
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