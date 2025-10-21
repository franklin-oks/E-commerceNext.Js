"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { toast } from "react-toastify";
import AdminGuard from "@/components/guard/AdminGuard";

export default function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("products").select("id,title");
      setProducts(data || []);
    })();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/delete-product", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Deleted");
        setProducts(products.filter((p) => p.id !== id));
      } else {
        toast.error("Error: " + (json.error || "unknown"));
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminGuard>
      <div>
        <h1>Delete Product</h1>
        {products.map((p) => (
          <div key={p.id} className="flex justify-between mb-8">
            <div>{p.title}</div>
            <button onClick={() => handleDelete(p.id)} disabled={loading}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminGuard>
  );
}
