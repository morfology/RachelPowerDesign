import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageSliderProps {
  data: string[];
  projectTitle?: string;
}

const ImageSlider = ({ data, projectTitle }: ImageSliderProps) => {
  let swiperRef: SwiperClass | null = null;

  const generateAltText = (url: string, index: number): string => {
    const filename = url.split("/").pop()?.split(".")[0] || "";
    const roomName = filename
      .replace(/-\d+$/, "")
      .replace(/-\d+-\d+$/, "")
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());

    const project = projectTitle || "Interior design project";
    if (roomName) {
      return `${roomName} - ${project} interior design`;
    }
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
          <img
            width={1200}
            height={800}
            alt={generateAltText(url, index)}
            className="w-full rounded"
            src={url}
            onClick={() => swiperRef?.slideNext()}
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
