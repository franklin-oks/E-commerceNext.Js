"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImage = ({ image1, image2 }) => {
  const images = [
    { id: 1, url: image1 },
    { id: 2, url: image2 },
    { id: 3, url: image1 },
  ];

  const [index, setIndex] = useState(0);

  return (
    <div>
      {/* Main Image */}
      <div className="relative mt-12 h-[300px] sm:h-[400px] lg:h-[500px] w-full">
        <Image
          src={images[index].url}
          alt="product"
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
              alt="thumbnail"
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
