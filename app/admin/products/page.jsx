"use client";
import { useEffect, useState } from "react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.secure_url;
}

export default function AdminProductsPage() {
  const [authorized, setAuthorized] = useState(false);
  const [form, setForm] = useState({
    name: "",
    oldPrice: "",
    price: "",
    isNew: false,
    stock: "",
    image1: "",
    image2: "",
    image3: "",
    description: "",
  });
  const [uploading, setUploading] = useState({
    image1: false,
    image2: false,
    image3: false,
  });

  // --- SIMPLE CLIENT AUTH ---
  useEffect(() => {
    const token = prompt("Enter admin token");
    if (token === process.env.NEXT_PUBLIC_FORM_ADMIN_TOKEN) {
      setAuthorized(true);
    } else {
      alert("Unauthorized");
      window.location.href = "/";
    }
  }, []);

  if (!authorized) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;
    const file = files[0];

    try {
      setUploading((s) => ({ ...s, [name]: true }));
      const url = await uploadToCloudinary(file);
      setForm((p) => ({ ...p, [name]: url }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploading((s) => ({ ...s, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      alert("Please fill name and price");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FORM_ADMIN_TOKEN}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Upload failed");
      }

      alert("Product uploaded successfully!");
      setForm({
        name: "",
        oldPrice: "",
        price: "",
        isNew: false,
        stock: "",
        image1: "",
        image2: "",
        image3: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-18">
      <h1 className="text-2xl font-bold mb-4">Upload Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="oldPrice"
          placeholder="Old Price"
          value={form.oldPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isNew"
            checked={form.isNew}
            onChange={handleChange}
          />{" "}
          Is New
        </label>
        <input
          name="stock"
          placeholder="Stock quantity"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {["image1", "image2", "image3"].map((img) => (
          <div key={img}>
            <label className="block mb-1">{img.toUpperCase()}</label>
            <input
              type="file"
              name={img}
              accept="image/*"
              onChange={handleFileChange}
            />
            {uploading[img] ? (
              <p className="text-sm">Uploading...</p>
            ) : (
              form[img] && (
                <p className="text-sm text-green-600 break-all">{form[img]}</p>
              )
            )}
          </div>
        ))}

        <textarea
          rows={3}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={uploading.image1 || uploading.image2 || uploading.image3}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
