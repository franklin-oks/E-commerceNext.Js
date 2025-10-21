// /app/products/page.jsx   (app router)
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductList from "@/components/productList/ProductList";
import { supabase } from "@/lib/supabaseClient";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const categoryIdParam = searchParams?.get("categoryId") ?? null;
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    if (categoryIdParam) {
      fetchCategoryName(categoryIdParam);
    } else {
      setCategoryName(null);
    }
  }, [categoryIdParam]);

  const fetchCategoryName = async (id) => {
    if (!id) return;
    try {
      const idNum = Number(id);
      if (Number.isNaN(idNum)) {
        setCategoryName(null);
        return;
      }
      const { data, error } = await supabase
        .from("categories")
        .select("name")
        .eq("id", idNum)
        .single();

      if (error) {
        console.error("Error fetching category name:", error);
        setCategoryName(null);
        return;
      }

      setCategoryName(data?.name || null);
    } catch (err) {
      console.error("Unexpected error fetching category name:", err);
      setCategoryName(null);
    }
  };

  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-32 mt-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {categoryName ? `Category: ${categoryName}` : "All Products"}
        </h1>
      </div>

      <ProductList
        limit={null} // or specify pagination like 12
        offset={0}
        categoryId={categoryIdParam}
        orderColumn="created_at"
        orderAsc={false}
      />
    </section>
  );
};

export default ProductsPage;
