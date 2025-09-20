"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "../utils";

const Category = () => {
  return (
    <div className="px-4 lg:ml-14 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories.map(({ image, name }, index) => (
          <Link
            key={index}
            href="/detail?cat=test"
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6 "
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={image}
                fill
                sizes="20vw"
                alt="project"
                className="object-cover"
              />
            </div>
            <h1 className="text-xl tracking-wide mt-8 font-semibold">{name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
