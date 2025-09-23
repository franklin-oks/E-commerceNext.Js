

"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImage = ({ image1, image2, image3 }) => {
  // Collect only defined images
  const images = [image1, image2, image3].filter(Boolean).map((url, idx) => ({
    id: idx + 1,
    url,
  }));

  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div>
      {/* Main Image */}
      <div className="relative mt-12 h-[300px] sm:h-[400px] lg:h-[500px] w-full">
        <Image
          src={images[index].url}
          alt={`product ${index + 1}`}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 40vw"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex justify-between gap-4 mt-6">
        {images.map(({ id, url }, i) => (
          <div
            key={id}
            className={`relative w-1/4 h-20 sm:h-24 lg:h-32 cursor-pointer ${
              i === index ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setIndex(i)}
          >
            <Image
              src={url}
              alt={`thumbnail ${i + 1}`}
              fill
              className="object-cover rounded-md"
              sizes="25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
