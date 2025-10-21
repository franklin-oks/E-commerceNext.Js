// "use client";

// import { supabase } from "@/lib/supabaseClient";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useCart } from "@/context/CartContext";

// const formatCurrency = (amount) => {
//   if (!amount) return "₦0";
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 0,
//   }).format(Number(amount));
// };

// const NewProduct = () => {
//   const [newProduct, setNewProduct] = useState();
//   const { addToCart } = useCart();

//   useEffect(() => {
//     fetchNewProducts();
//   }, []);

//   const fetchNewProducts = async () => {
//     const { data, error } = await supabase
//       .from("products")
//       .select("*")
//       .order("created_at", { ascending: false });
//     equ("id", "how can we fetch only 8 new products(from id=1 to 8)");

//     if (data) {
//       setNewProduct(data || []);
//     }

//     if (error) {
//       toast("server side error");
//     }
//   };

//   return (
//     <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//       {newProduct.map((product) => {
//         return (
//           <div key={product.id} className="flex flex-col gap-4 group">
//             <Link href={`/detail/${product.id}`}>
//               <div className="w-full h-80 overflow-hidden rounded-md cursor-pointer">
//                 <Image
//                   className="object-cover rounded-md"
//                   src={product.image_url}
//                   alt={product.title}
//                   fill
//                 />
//               </div>
//               <div className="flex justify-between items-center mt-2">
//                 <span className="font-medium">{product.title}</span>
//                 <span className="font-semibold">
//                   {formatCurrency(product.price)}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-500">{product.description}</p>
//             </Link>

//             <div className="flex justify-between px-2">
//               <Link href={`/detail/${product.id}`}>
//                 <button className="rounded-2xl cursor-pointer ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition">
//                   View
//                 </button>
//               </Link>
//               <button
//                 onClick={
//                   () =>
//                     addToCart({
//                       id: product.id,
//                       name: product.name,
//                       price: product.price,
//                       image: product.image_url,
//                     })
//                   // toast.success('Product added successfuly!',{autoclose: 4000})
//                 }
//                 className="rounded-2xl ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition cursor-pointer"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default NewProduct;

// chat

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
