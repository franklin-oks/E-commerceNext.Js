"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import AdminGuard from "@/components/guard/AdminGuard";
import Image from "next/image";

export default function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, title, image_url")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Error fetching products");
        console.error(error);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      toast.error("Unexpected error fetching products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.title}"?`)) return;

    try {
      setDeletingId(product.id);

      // Delete image from storage
      if (product.image_url) {
        const imagePath = product.image_url.split("/").pop();
        const { error: storageError } = await supabase.storage
          .from("product-images")
          .remove([imagePath]);

        if (storageError) {
          toast.error("Failed to delete image");
          console.error(storageError);
          setDeletingId(null);
          return;
        }
      }

      // Delete product from database
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) {
        toast.error("Failed to delete product");
        console.error(error);
      } else {
        toast.success("Product deleted!");
        setProducts(products.filter((p) => p.id !== product.id));
      }
    } catch (err) {
      toast.error("Unexpected error");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading products...</div>;
  if (!products.length)
    return (
      <div className="text-center py-8 text-gray-500">No products found.</div>
    );

  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto px-4 py-8 mt-24">
        <h1 className="text-2xl font-bold mb-6">Delete Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* Small Thumbnail */}
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-3">
                {product.image_url ? (
                  <Image
                    width={40}
                    height={40}
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Title */}
              <div className="flex-1 text-sm font-medium">{product.title}</div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(product)}
                disabled={deletingId === product.id}
                className="text-red-500 border border-red-500 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white cursor-pointer transition"
              >
                {deletingId === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  );
}
