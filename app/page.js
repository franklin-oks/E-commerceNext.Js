"use client";

import Category from "@/components/category/Category";
import Hero from "@/components/Hero";
import ProductList from "@/components/productList/ProductList";
import { products } from "@/components/utils";

const Home = () => {
  return (
    <section>
      <Hero />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductList products={products} limit={8} />
      </div>
      <div className="mt-24 ">
        <h1 className="text-2xl mb-12 px-4 md:px-8 lg:px-16 xl:px-32">
          Categories
        </h1>
        <Category />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="text-2xl">New Products</h1>
        <ProductList products={products} limit={8} />
      </div>
    </section>
  );
};
export default Home;
