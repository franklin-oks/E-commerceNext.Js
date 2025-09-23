// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useCart } from "@/context/CartContext";

// const formatCurrency = (amount) => {
//   if (!amount) return "₦0";
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 0,
//   }).format(Number(amount));
// };

// const ProductList = ({ products = [], limit }) => {
//   const { addToCart } = useCart();
//   const displayedProducts = limit ? products.slice(0, limit) : products;

//   return (
//     <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//       {displayedProducts.map(
//         ({ id, name, image1, image2, description, price }) => (
//           <div key={id} className="flex flex-col gap-4 group">
//             <Link href={`/detail/${id}`}>
//               <div className="relative w-full h-80 overflow-hidden rounded-md cursor-pointer">
//                 <Image
//                   className="absolute object-cover rounded-md z-10 group-hover:opacity-0 transition-opacity ease-in duration-500"
//                   src={image1}
//                   alt={name}
//                   fill
//                 />
//                 <Image
//                   className="absolute object-cover rounded-md"
//                   src={image2}
//                   alt={name}
//                   fill
//                 />
//               </div>
//               <div className="flex justify-between items-center mt-2">
//                 <span className="font-medium">{name}</span>
//                 <span className="font-semibold">{formatCurrency(price)}</span>
//               </div>
//               <p className="text-sm text-gray-500">{description}</p>
//             </Link>

//             <div className="flex justify-between px-2">
//               <Link href={`/detail/${id}`}>
//                 <button className="rounded-2xl cursor-pointer ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition">
//                   View
//                 </button>
//               </Link>
//               <button
//                 onClick={() =>
//                   addToCart({
//                     id,
//                     name,
//                     price,
//                     image: image1,
//                   })
//                 }
//                 className="rounded-2xl ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition cursor-pointer"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default ProductList;

// chat

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const formatCurrency = (amount) => {
  if (!amount) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(Number(amount));
};

const ProductList = ({ products = [], limit }) => {
  const { addToCart } = useCart();
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {displayedProducts.map(
        ({ id, name, image1, image2, description, price }) => {
          // Fallbacks if images missing
          const mainImage = image1 || image2 || "/placeholder.png";
          const hoverImage = image2 || image1 || "/placeholder.png";

          return (
            <div key={id} className="flex flex-col gap-4 group">
              <Link href={`/detail/${id}`} passHref>
                <div className="relative w-full h-80 overflow-hidden rounded-md cursor-pointer">
                  <Image
                    className="absolute object-cover rounded-md z-10 group-hover:opacity-0 transition-opacity ease-in duration-500"
                    src={mainImage}
                    alt={name}
                    fill
                  />
                  <Image
                    className="absolute object-cover rounded-md"
                    src={hoverImage}
                    alt={name}
                    fill
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">{name}</span>
                  <span className="font-semibold">{formatCurrency(price)}</span>
                </div>
                <p className="text-sm text-gray-500">{description}</p>
              </Link>

              <div className="flex justify-between px-2">
                <Link href={`/detail/${id}`} passHref>
                  <button className="rounded-2xl cursor-pointer ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition">
                    View
                  </button>
                </Link>
                <button
                  onClick={() =>
                    addToCart({
                      id,
                      name,
                      price,
                      image: mainImage,
                    })
                  }
                  className="rounded-2xl ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ProductList;
