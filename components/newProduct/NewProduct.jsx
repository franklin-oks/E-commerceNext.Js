"use client";

import ProductList from "@/components/productList/ProductList";

const NewProduct = () => {
  // newest 8 products: order by created_at desc, limit 8
  return (
    <ProductList
      limit={8}
      offset={0}
      orderColumn="created_at"
      orderAsc={false}
    />
  );
};

export default NewProduct;
