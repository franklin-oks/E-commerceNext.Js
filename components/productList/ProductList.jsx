// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { supabase } from "@/lib/supabaseClient";
// import { useCart } from "@/context/CartContext";
// import { motion, AnimatePresence } from "framer-motion";

// const formatCurrency = (amount) => {
//   if (amount === null || amount === undefined) return "₦0";
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 0,
//   }).format(Number(amount));
// };

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.06,
//       delayChildren: 0.08,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 12, scale: 0.995 },
//   visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } },
//   hover: { scale: 1.02, y: -6, transition: { duration: 0.25 } },
// };

// const imageVariants = {
//   hover: { scale: 1.06, transition: { duration: 0.4 } },
// };

// /**
//  * Props:
//  *  - limit (number) default null (no limit)
//  *  - offset (number) default 0
//  *  - category (string) optional - legacy: filter by category slug (not used if categoryId provided)
//  *  - categoryId (number|string) optional - preferred: filter by category_id FK
//  *  - excludeId (string|number) optional - exclude a specific product id (for related list)
//  *  - orderColumn (string) default 'created_at'
//  *  - orderAsc (boolean) default false (newest first)
//  */
// const ProductList = ({
//   limit = null,
//   offset = 0,
//   category = null,
//   categoryId = null,
//   excludeId = null,
//   orderColumn = "created_at",
//   orderAsc = false,
// }) => {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     fetchProducts();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [limit, offset, category, categoryId, excludeId, orderColumn, orderAsc]);

//   const fetchProducts = async () => {
//     try {
//       setIsLoading(true);
//       let query = supabase.from("products").select("*");

//       // Prefer filtering by categoryId (FK) if provided
//       if (
//         categoryId !== null &&
//         categoryId !== undefined &&
//         categoryId !== ""
//       ) {
//         const idNum = Number(categoryId);
//         if (!Number.isNaN(idNum)) {
//           query = query.eq("category_id", idNum);
//         }
//       } else if (category) {
//         // legacy: normalize incoming category (trim + lowercase)
//         const normalized = String(category).trim().toLowerCase();
//         query = query.eq("category", normalized);
//       }

//       // exclude id
//       if (excludeId) {
//         query = query.neq("id", excludeId);
//       }

//       // ordering
//       query = query.order(orderColumn, { ascending: orderAsc });

//       // offset & limit
//       if (limit !== null && limit !== undefined) {
//         const from = offset || 0;
//         const to = from + limit - 1;
//         query = query.range(from, to);
//       } else if (offset) {
//         query = query.range(offset, offset + 9999);
//       }

//       const { data, error } = await query;

//       if (error) {
//         console.error("Supabase error:", error);
//         toast.error("Server error fetching products");
//         setProducts([]);
//         return;
//       }

//       setProducts(data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Unexpected error fetching products");
//       setProducts([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-8">Loading products...</div>;
//   }

//   if (!products || products.length === 0) {
//     return <div className="text-center py-8">No products yet.</div>;
//   }

//   return (
//     <motion.div
//     variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//       {products.map((product) => {
//         return (
//           <div key={product.id} className="flex flex-col gap-4 group">
//             <Link href={`/detail/${product.id}`}>
//               <div className="w-full h-80 overflow-hidden rounded-md cursor-pointer relative">
//                 <Image
//                   className="object-cover rounded-md"
//                   src={product.image_url}
//                   alt={product.title || "product"}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 25vw"
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
//                 onClick={() =>
//                   addToCart({
//                     id: product.id,
//                     name: product.title,
//                     price: product.price,
//                     image: product.image_url,
//                   })
//                 }
//                 className="rounded-2xl ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition cursor-pointer"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </motion.div>
//   );
// };

// export default ProductList;

// chat
// components/ProductList.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(Number(amount));
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
  },
  hover: { scale: 1.02, y: -6, transition: { duration: 0.25 } },
};

const imageVariants = {
  hover: { scale: 1.06, transition: { duration: 0.4 } },
};

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

      if (
        categoryId !== null &&
        categoryId !== undefined &&
        categoryId !== ""
      ) {
        const idNum = Number(categoryId);
        if (!Number.isNaN(idNum)) query = query.eq("category_id", idNum);
      } else if (category) {
        const normalized = String(category).trim().toLowerCase();
        query = query.eq("category", normalized);
      }

      if (excludeId) query = query.neq("id", excludeId);

      query = query.order(orderColumn, { ascending: orderAsc });

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      <AnimatePresence>
        {products.map((product) => (
          <motion.article
            key={product.id}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 8, transition: { duration: 0.25 } }}
            className="flex flex-col gap-4 group bg-white rounded-lg overflow-hidden shadow-sm"
          >
            <Link href={`/detail/${product.id}`} className="relative block">
              <motion.div
                variants={imageVariants}
                className="w-full h-80 overflow-hidden relative"
              >
                <Image
                  className="object-cover rounded-t-lg"
                  src={product.image_url || "/fallback-product.jpg"}
                  alt={product.title || "product"}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            </Link>

            <div className="px-4 pb-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <Link href={`/detail/${product.id}`} className="block">
                    <h3 className="font-medium text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </Link>
                </div>

                <div className="ml-3 text-right">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(product.price)}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <Link href={`/detail/${product.id}`} className="inline-block">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="rounded-2xl ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition"
                    aria-label={`View ${product.title}`}
                  >
                    View
                  </motion.button>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.title,
                      price: product.price,
                      image: product.image_url,
                    }) || toast.success("Added to cart")
                  }
                  className="rounded-2xl ring-2 ring-orange-500 py-2 px-4 text-xs w-max hover:bg-orange-600 hover:text-white transition"
                  aria-label={`Add ${product.title} to cart`}
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductList;
