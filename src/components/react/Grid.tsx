import React, { useState, useEffect, useRef } from "react";
import imageConfig from "../../config/images.json";

const IMAGE_DATA = imageConfig;

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlZWVlZWUiIC8+PC9zdmc+";

const Grid: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const generateAltText = (imagePath: string): string => {
    const pathParts = imagePath.split("/");
    const filename = pathParts[pathParts.length - 1]?.split(".")[0] || "";
    const projectFolder = pathParts[pathParts.length - 2] || "";

    const roomDescription = filename
      .replace(/-\d+$/, "")
      .replace(/detail-/, "")
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());

    const projectName = projectFolder
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());

    if (filename.includes("detail-")) {
      return `${roomDescription} detail - ${projectName} interior design project`;
    } else if (roomDescription && projectName) {
      return `${roomDescription} - ${projectName} interior design`;
    }
    return `Interior design from ${projectName} project`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const src = entry.target.getAttribute("data-src");
            if (src) setLoadedImages((prev) => ({ ...prev, [src]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", padding: "20px" }}>
      {IMAGE_DATA.map((item: { image: string }, index: number) => {
        const isLoaded = loadedImages[item.image];
        return (
          <div
            key={item.image}
            ref={(el) => { imageRefs.current[index] = el; }}
            data-src={item.image}
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "8px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={isLoaded ? item.image : PLACEHOLDER_IMAGE}
              alt={generateAltText(item.image)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.3s ease-in-out",
                opacity: isLoaded ? 1 : 0.5,
              }}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
