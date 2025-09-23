"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Category from "@/components/category/Category";
import ProductList from "@/components/productList/ProductList";
import { fallbackProducts } from "@/components/utils";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        // If API returns empty array, use fallback
        if (!data || data.length === 0) {
          setProducts(fallbackProducts);
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        setProducts(fallbackProducts); // fallback on error
      }
    }
    fetchProducts();
  }, []);

  // Sort by createdAt descending
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Take first 8 as featured, next 8 as new
  const featuredProducts = sortedProducts.slice(0, 8);
  const newProducts = sortedProducts.slice(8, 16);

  return (
    <section>
      <Hero />

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="text-2xl mb-4">Featured Products</h1>
        <ProductList products={featuredProducts} />
      </div>

      <div className="mt-24">
        <h1 className="text-2xl mb-12 px-4 md:px-8 lg:px-16 xl:px-32">
          Categories
        </h1>
        <Category />
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="text-2xl mb-4">New Products</h1>
        <ProductList products={newProducts} />
      </div>
    </section>
  );
};

export default Home;
