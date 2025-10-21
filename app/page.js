"use client";

import Hero from "@/components/Hero";
import Category from "@/components/category/Category";
import NewProduct from "@/components/newProduct/NewProduct";
import FeaturedProduct from "@/components/featured/FeaturedProduct";

const Home = () => {
  return (
    <section>
      <Hero />

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="text-2xl mb-4">New Products</h1>
        <NewProduct />
      </div>

      <div className="mt-24">
        <h1 className="text-2xl mb-12 px-4 md:px-8 lg:px-16 xl:px-32">
          Categories
        </h1>
        <Category />
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="text-2xl mb-4">Featured Products</h1>
        <FeaturedProduct />
      </div>
    </section>
  );
};

export default Home;
