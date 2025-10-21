"use client";

import ProductList from "@/components/productList/ProductList";

const FeaturedProducts = () => {
  // offset 8 (skip newest 8), then next 8
  return (
    <ProductList
      limit={8}
      offset={8}
      orderColumn="created_at"
      orderAsc={false}
    />
  );
};

export default FeaturedProducts;
