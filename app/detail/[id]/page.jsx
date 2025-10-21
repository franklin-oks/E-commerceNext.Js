"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/context/CartContext";
import RelatedProduct from "@/components/related/RelatedProduct";
import { useParams } from "next/navigation";

const formatCurrency = (amount) => {
  if (!amount) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(Number(amount));
};

const DetailPage = () => {
  const { addToCart } = useCart();
  const [productDetails, setProductDetails] = useState(null);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single(); // returns single object

      if (error) {
        console.error(error);
        toast.error("Server side error, try again!");
        return;
      }
      setProductDetails(data);
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error");
    }
  };

  if (!productDetails) {
    return <div className="text-center py-8">Loading product...</div>;
  }

  // const imageSrc = getImageUrl(productDetails);

  return (
    <>
      <div className="mt-12 lg:mt-25 px-4 sm:px-8 lg:px-8 w-full relative flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max lg:mt-20 relative">
          <Image
            src={productDetails.image_url}
            alt={productDetails.title}
            width={800}
            height={800}
            className="object-cover rounded-md"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-6 md:mt-20">
          <h2 className="text-4xl font-medium">{productDetails.title}</h2>
          <p className="text-gray-500">{productDetails.description}</p>

          <div className="bg-gray-100 h-[2px]" />

          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              {formatCurrency(productDetails.price * 2.1)}
            </h3>

            <h2 className="font-medium text-2xl">
              {formatCurrency(productDetails.price)}
            </h2>
          </div>

          <div className="bg-gray-100 h-[2px]" />
          <button
            onClick={() =>
              addToCart({
                id: productDetails.id,
                name: productDetails.title,
                price: productDetails.price,
                image: productDetails.image_url,
              })
            }
            className="w-32 h-max text-xs cursor-pointer rounded-3xl ring-1 ring-pink-500 text-pink-500 py-2 px-4 hover:bg-pink-500 hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <h1 className="text-center mt-30 text-lg text-gray-800 lg:text-2xl font-bold">
        Related products
      </h1>
      <div className="px-6">
        <RelatedProduct
          category={productDetails.category}
          currentId={productDetails.id}
        />
      </div>
    </>
  );
};

export default DetailPage;
