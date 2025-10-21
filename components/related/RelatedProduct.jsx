"use client";

import ProductList from "@/components/productList/ProductList";

/**
 * category: product category string
 * currentId: id to exclude from related
 */
const RelatedProducts = ({ category, currentId }) => {
  if (!category) return null;
  // fetch 8 related items same category, exclude current product
  return (
    <ProductList
      limit={8}
      category={category}
      excludeId={currentId}
      orderColumn="created_at"
      orderAsc={false}
    />
  );
};

export default RelatedProducts;
