"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/context/CartContext";

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(Number(amount));
};

/**
 * Props:
 *  - limit (number) default null (no limit)
 *  - offset (number) default 0
 *  - category (string) optional - legacy: filter by category slug (not used if categoryId provided)
 *  - categoryId (number|string) optional - preferred: filter by category_id FK
 *  - excludeId (string|number) optional - exclude a specific product id (for related list)
 *  - orderColumn (string) default 'created_at'
 *  - orderAsc (boolean) default false (newest first)
 */
const ProductList = ({
  limit = null,
  offset = 0,
  category = null,
  categoryId = null,
  excludeId = null,
  orderColumn = "created_at",
  orderAsc = false,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset, category, categoryId, excludeId, orderColumn, orderAsc]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      let query = supabase.from("products").select("*");

      // Prefer filtering by categoryId (FK) if provided
      if (
        categoryId !== null &&
        categoryId !== undefined &&
        categoryId !== ""
      ) {
        const idNum = Number(categoryId);
        if (!Number.isNaN(idNum)) {
          query = query.eq("category_id", idNum);
        }
      } else if (category) {
        // legacy: normalize incoming category (trim + lowercase)
        const normalized = String(category).trim().toLowerCase();
        query = query.eq("category", normalized);
      }

      // exclude id
      if (excludeId) {
        query = query.neq("id", excludeId);
      }

      // ordering
      query = query.order(orderColumn, { ascending: orderAsc });

      // offset & limit
      if (limit !== null && limit !== undefined) {
        const from = offset || 0;
        const to = from + limit - 1;
        query = query.range(from, to);
      } else if (offset) {
        query = query.range(offset, offset + 9999);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Supabase error:", error);
        toast.error("Server error fetching products");
        setProducts([]);
        return;
      }

      setProducts(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error fetching products");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-8">No products yet.</div>;
  }

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => {
        return (
          <div key={product.id} className="flex flex-col gap-4 group">
            <Link href={`/detail/${product.id}`}>
              <div className="w-full h-80 overflow-hidden rounded-md cursor-pointer relative">
                <Image
                  className="object-cover rounded-md"
                  src={product.image_url}
                  alt={product.title || "product"}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">{product.title}</span>
                <span className="font-semibold">
                  {formatCurrency(product.price)}
                </span>
              </div>
              <p className="text-sm text-gray-500">{product.description}</p>
            </Link>

            <div className="flex justify-between px-2">
              <Link href={`/detail/${product.id}`}>
                <button className="rounded-2xl cursor-pointer ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition">
                  View
                </button>
              </Link>
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: product.image_url,
                  })
                }
                className="rounded-2xl ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
