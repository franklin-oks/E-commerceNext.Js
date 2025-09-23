"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductImage from "@/components/productImages/ProductImage";
import Add from "@/components/add/Add";
import CustomizeProduct from "@/components/customize/CustomizeProduct";

const formatCurrency = (amount) => {
  if (!amount) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(Number(amount));
};

const DetailPage = () => {
  const params = useParams();
  const id = String(params?.id); // treat ID as string

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        // Normalize all IDs to string
        const found = data.find((p) => String(p.id) === id);
        setProduct(found);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="mt-12 px-4 sm:px-8 lg:px-8 w-full relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImage
          image1={product.image1 || "/placeholder.png"}
          image2={product.image2 || "/placeholder.png"}
          image3={product.image3 || "/placeholder.png"}
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6 md:mt-20">
        <h2 className="text-4xl font-medium">{product.name}</h2>
        <p className="text-gray-500">{product.description}</p>
        <div className="bg-gray-100 h-[2px]" />
        <div className="flex items-center gap-4">
          {product.oldprice && (
            <h3 className="text-xl text-gray-500 line-through">
              {formatCurrency(product.oldprice)}
            </h3>
          )}
          <h2 className="font-medium text-2xl">
            {formatCurrency(product.price)}
          </h2>
        </div>
        <div className="bg-gray-100 h-[2px]" />
        <CustomizeProduct />
        <Add product={product} />
      </div>
    </div>
  );
};

export default DetailPage;
