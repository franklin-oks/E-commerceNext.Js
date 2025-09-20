"use client";
import Link from "next/link";
import { sliders } from "./utils";
import { useEffect, useState } from "react";
import Image from "next/image";

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 h-[calc(100v-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-2000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {sliders.map(({ id, title, description, image, url, bg }) => (
          <div
            className={`${bg} w-screen h-screen flex flex-col gap-16 lg:flex-row`}
            key={id}
          >
            <div className="h-1/2 lg:w-1/2 lg:h-full flex items-center justify-center gap-8 flex-col lg:gap-12">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {description}
              </h2>
              <h1 className="text-5xl text-center lg:text-6xl 2xl:text-8xl font-semibold">
                {title}
              </h1>
              <Link href={url}>
                <button className="rounded-md cursor-pointer py-3 px-4 bg-black text-white">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className="relative lg:h-full h-1/2 lg:w-1/2">
              <Image
                src={image}
                alt="logo"
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto flex gap-4 left-1/2 bottom-8">
        {sliders.map((slide, index) => (
          <div
            onClick={() => setCurrent(index)}
            key={slide.id}
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
