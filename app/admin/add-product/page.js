// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import imageCompression from "browser-image-compression";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import AdminGuard from "@/components/guard/AdminGuard";

// export default function AddProduct() {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [price, setPrice] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [file, setFile] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     (async () => {
//       const { data } = await supabase
//         .from("categories")
//         .select("*")
//         .order("id");
//       setCategories(data || []);
//       if (data && data.length) setCategoryId(data[0].id);
//     })();
//   }, []);

//   async function handleFileChange(e) {
//     if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!title || !price || !file) {
//       return toast.error("Title, price and image are required");
//     }

//     setSubmitting(true);

//     try {
//       // 1) verify user session and admin membership BEFORE upload/insert
//       const { data: userData, error: userErr } = await supabase.auth.getUser();

//       const user = userData?.user;
//       if (userErr || !user) {
//         console.error("No session / auth.getUser error:", userErr);
//         toast.error("You must be signed in as an admin to add products.");
//         setSubmitting(false);
//         return;
//       }

//       // debug: show current user id
//       console.log("Current user id:", user.id);

//       // check admins table for this user id
//       const { data: adminCheck, error: adminErr } = await supabase
//         .from("admins")
//         .select("id")
//         .eq("id", user.id)
//         .single();

//       if (adminErr || !adminCheck) {
//         console.error("Admin check failed:", adminErr, adminCheck);
//         toast.error(
//           "You are not authorized to add products. Contact the site owner."
//         );
//         setSubmitting(false);
//         return;
//       }

//       // 2) compress & upload image
//       const options = {
//         maxSizeMB: 0.3,
//         maxWidthOrHeight: 1600,
//         useWebWorker: true,
//       };
//       const compressedFile = await imageCompression(file, options);
//       const fileExt = compressedFile.name.split(".").pop();
//       const fileName = `${Date.now()}-${Math.random()
//         .toString(36)
//         .slice(2)}.${fileExt}`;
//       const bucket =
//         process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "product-images";
//       const path = fileName;

//       const { error: uploadError } = await supabase.storage
//         .from(bucket)
//         .upload(path, compressedFile, { cacheControl: "3600", upsert: false });
//       if (uploadError) {
//         console.error("Storage upload error:", uploadError);
//         throw uploadError;
//       }

//       const { data: publicUrlData } = supabase.storage
//         .from(bucket)
//         .getPublicUrl(path);
//       const imageUrl = publicUrlData?.publicUrl;
//       console.log("Image uploaded, publicUrl:", imageUrl);

//       // 3) perform insert (RLS will check auth.uid() which is set)
//       const { data: inserted, error: insertError } = await supabase
//         .from("products")
//         .insert([
//           {
//             title,
//             description: desc,
//             price,
//             image_url: imageUrl,
//             image_path: `${bucket}/${path}`,
//             category_id: categoryId || null,
//           },
//         ])
//         .select()
//         .single();

//       if (insertError) {
//         console.error("Insert error (RLS or other):", insertError);
//         // show helpful message
//         toast.error(
//           "Error adding product: " +
//             (insertError.message || JSON.stringify(insertError))
//         );
//         setSubmitting(false);
//         return;
//       }

//       toast.success("Product added!");
//       router.push("/products");
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       toast.error("Error adding product: " + (err.message || String(err)));
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <AdminGuard>
//       <div className="max-w-[700px] mt-48">
//         <h1>Add Product</h1>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Title</label>
//             <input value={title} onChange={(e) => setTitle(e.target.value)} />
//           </div>
//           <div>
//             <label>Description</label>
//             <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
//           </div>
//           <div>
//             <label>Price</label>
//             <input
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               type="number"
//               step="0.01"
//             />
//           </div>
//           <div>
//             <label>Category</label>
//             <select
//               value={categoryId}
//               onChange={(e) => setCategoryId(e.target.value)}
//             >
//               <option value="">-- none --</option>
//               {categories.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>Image (will be compressed to ~300KB)</label>
//             <input
//               className="bg-gray-400 p-6 cursor-pointer"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </div>
//           <div className="mt-12">
//             <button
//               className="px-4 py-2 bg-blue-500 font-bold text-white rounded-xl"
//               type="submit"
//               disabled={submitting}
//             >
//               {submitting ? "Adding..." : "Add Product"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </AdminGuard>
//   );
// }

// chat

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/guard/AdminGuard";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("categories")
        .select("id,name,slug")
        .order("id");
      setCategories(data || []);
      if (data && data.length) setCategoryId(data[0].id);
    })();
  }, []);

  async function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !price || !file) {
      return toast.error("Title, price and image are required");
    }

    setSubmitting(true);

    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      const user = userData?.user;
      if (userErr || !user) {
        toast.error("You must be signed in as an admin to add products.");
        setSubmitting(false);
        return;
      }

      const { data: adminCheck, error: adminErr } = await supabase
        .from("admins")
        .select("id")
        .eq("id", user.id)
        .single();

      if (adminErr || !adminCheck) {
        toast.error("You are not authorized to add products.");
        setSubmitting(false);
        return;
      }

      // compress & upload
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const fileExt = compressedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;
      const bucket =
        process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "product-images";
      const path = fileName;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, compressedFile, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);
      const imageUrl = publicUrlData?.publicUrl;

      const { data: inserted, error: insertError } = await supabase
        .from("products")
        .insert([
          {
            title,
            description: desc,
            price,
            image_url: imageUrl,
            image_path: `${bucket}/${path}`,
            category_id: categoryId || null,
          },
        ])
        .select()
        .single();

      if (insertError) {
        toast.error(
          "Error adding product: " +
            (insertError.message || JSON.stringify(insertError))
        );
        setSubmitting(false);
        return;
      }

      toast.success("Product added!");
      router.push("/products");
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Error adding product: " + (err.message || String(err)));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
            Add New Product
          </h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Fill in the details below to add a product to your store.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-2">
                  Title
                </span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="Product title"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-2">
                  Price (NGN)
                </span>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  step="0.01"
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                  placeholder="0.00"
                />
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-2">
                Description
              </span>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Write a short description"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-2">
                  Category
                </span>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">-- none --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 mb-2">
                  Image (max ~2MB)
                </span>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-sm"
                  />
                </div>
                {preview && (
                  <div className="mt-3">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-32 h-32 object-cover rounded-md shadow-sm"
                    />
                  </div>
                )}
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium shadow-sm transition ${
                  submitting
                    ? "bg-orange-300 cursor-wait"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-2">
              Tip: Images will be compressed automatically before upload.
            </p>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}
