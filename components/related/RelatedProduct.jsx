"use client";

import ProductList from "@/components/productList/ProductList";

const RelatedProducts = ({ categoryId, currentId }) => {
  if (!categoryId) return null;
  // fetch 8 related items same category, exclude current product
  return (
    <ProductList
      limit={4}
      categoryId={categoryId} // pass the ID, not the slug
      excludeId={currentId}
      orderColumn="title" // or "created_at"
      orderAsc={false}
    />
  );
};

export default RelatedProducts;
