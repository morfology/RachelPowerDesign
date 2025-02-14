import React, { useState, useEffect, useRef } from "react";
import imageConfig from "@/config/images.json"; // Importing larger image list

const IMAGE_DATA = imageConfig;

// Placeholder image (grey box)
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlZWVlZWUiIC8+PC9zdmc+"; // Grey square

const Grid: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Lazy load images when they enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const src = entry.target.getAttribute("data-src");
            if (src) {
              setLoadedImages((prev) => ({ ...prev, [src]: true }));
            }
            observer.unobserve(entry.target); // Stop observing once loaded
          }
        });
      },
      { threshold: 0.1 }
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", padding: "20px" }}>
      {IMAGE_DATA.map((item, index) => {
        const isLoaded = loadedImages[item.image];

        return (
          <img
            key={item.image}
            ref={(el) => (imageRefs.current[index] = el)}
            className="lazy-image"
            data-src={item.image}
            src={isLoaded ? item.image : PLACEHOLDER_IMAGE}
            alt="Gallery Image"
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1",
              borderRadius: "8px",
              objectFit: "cover",
              transition: "opacity 0.3s ease-in-out",
              opacity: isLoaded ? 1 : 0.5, // Fade-in effect
            }}
          />
        );
      })}
    </div>
  );
};

export default Grid;
