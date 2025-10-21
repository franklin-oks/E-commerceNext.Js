// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { categories as staticCategories } from "@/components/utils"; // adjust path if needed
// import { supabase } from "@/lib/supabaseClient";
// import { categories } from "@/components/utils";

// const Category = () => {
//   const [remoteCategories, setRemoteCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCategory();
//   }, []);

//   const fetchCategory = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("categories")
//         .select("*")
//         .order("created_at", { ascending: true });

//       if (error) {
//         console.error("Error fetching categories:", error);
//         setRemoteCategories([]);
//       } else {
//         setRemoteCategories(Array.isArray(data) ? data : []);
//       }
//     } catch (err) {
//       console.error("Unexpected error fetching categories:", err);
//       setRemoteCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const findRemoteBySlug = (slug) => {
//     if (!remoteCategories || remoteCategories.length === 0) return null;
//     const s = (slug || "").toString().trim().toLowerCase();
//     return (
//       remoteCategories.find(
//         (r) => (r.slug || "").toString().trim().toLowerCase() === s
//       ) || null
//     );
//   };

//   if (loading) {
//     return <div className="py-8 text-center">Loading categories...</div>;
//   }

//   return (
//     <div className="px-4 lg:ml-14 overflow-x-auto scrollbar-hide">
//       <div className="flex gap-4 md:gap-8">
//         {staticCategories.map(({ slug, image, name: fallbackName }, index) => {
//           const remote = findRemoteBySlug(slug);
//           const displayName = remote?.name || fallbackName || slug;
//           // Use DB id for linking
//           const linkId = remote?.id ?? null;

//           // If remote not found, still link using slug? Here we skip link if no id.
//           const href = linkId
//             ? `/products?categoryId=${encodeURIComponent(linkId)}`
//             : `/products`;

//           return (
//             <Link
//               key={slug + "-" + index}
//               href={href}
//               className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
//               aria-label={`See products in ${displayName}`}
//             >
//               <div className="relative bg-slate-100 w-full h-56 rounded-md overflow-hidden">
//                 <Image
//                   src={categories.image}
//                   fill
//                   sizes="(max-width: 768px) 50vw, 25vw"
//                   alt={displayName}
//                   className="object-cover"
//                 />
//               </div>

//               <h1 className="text-xl tracking-wide mt-4 font-semibold">
//                 {displayName}
//               </h1>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Category;

// chat
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories as staticCategories } from "@/components/utils"; // the static images + slug
import { supabase } from "@/lib/supabaseClient";

const Category = () => {
  const [remoteCategories, setRemoteCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      // Better error logging
      if (error) {
        console.error("Error fetching categories (supabase error):", error);
        // if error has message or details, log them
        if (error.message) console.error("message:", error.message);
        setRemoteCategories([]);
        return;
      }

      // If data is null/undefined, make it an empty array
      setRemoteCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Unexpected error fetching categories:", err);
      setRemoteCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const findRemoteBySlug = (slug) => {
    if (!remoteCategories || remoteCategories.length === 0) return null;
    const s = (slug || "").toString().trim().toLowerCase();
    return (
      remoteCategories.find(
        (r) => (r.slug || "").toString().trim().toLowerCase() === s
      ) || null
    );
  };

  if (loading) {
    return <div className="py-8 text-center">Loading categories...</div>;
  }

  return (
    <div className="px-4 lg:ml-14 overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {staticCategories.map(({ slug, image, name: fallbackName }, index) => {
          const remote = findRemoteBySlug(slug);
          const displayName = remote?.name || fallbackName || slug;
          const linkId = remote?.id ?? null;
          const href = linkId
            ? `/products?categoryId=${encodeURIComponent(linkId)}`
            : `/products`;

          return (
            <Link
              key={slug + "-" + index}
              href={href}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
              aria-label={`See products in ${displayName}`}
            >
              <div className="relative bg-slate-100 w-full h-56 rounded-md overflow-hidden">
                <Image
                  src={image}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  alt={displayName}
                  className="object-cover"
                />
              </div>

              <h1 className="text-xl tracking-wide mt-4 font-semibold">
                {displayName}
              </h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
