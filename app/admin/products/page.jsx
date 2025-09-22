"use client";
import { useState } from "react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(file) {
  // Upload file using unsigned preset
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);
  // optional: fd.append("folder", "products");

  const res = await fetch(url, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.secure_url; // returned image URL
}

export default function AdminProductsPage() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target; // name is "image1", "image2" or "image3"
    if (!files || !files[0]) return;
    const file = files[0];
    try {
      setUploading((s) => ({ ...s, [name]: true }));
      const url = await uploadToCloudinary(file);
      setForm((p) => ({ ...p, [name]: url }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed. Try again.");
    } finally {
      setUploading((s) => ({ ...s, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.price) {
      alert("Please fill name and price.");
      return;
    }

    // if no image uploaded, you can warn or allow
    // submit to your API
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
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
    } else {
      const err = await res.json().catch(() => ({}));
      console.error("Failed to add product:", err);
      alert("Upload failed");
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
          className="w-full p-2 border rounded"
          required
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
          className="w-full p-2 border rounded"
          required
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

        {/* file inputs */}
        <div>
          <label className="block mb-1">Image 1 (front)</label>
          <input
            type="file"
            name="image1"
            accept="image/*"
            onChange={handleFileChange}
          />
          {uploading.image1 ? (
            <p className="text-sm">Uploading...</p>
          ) : form.image1 ? (
            <p className="text-sm text-green-600 break-all">{form.image1}</p>
          ) : null}
        </div>

        <div>
          <label className="block mb-1">Image 2 (back)</label>
          <input
            type="file"
            name="image2"
            accept="image/*"
            onChange={handleFileChange}
          />
          {uploading.image2 ? (
            <p className="text-sm">Uploading...</p>
          ) : form.image2 ? (
            <p className="text-sm text-green-600 break-all">{form.image2}</p>
          ) : null}
        </div>

        <div>
          <label className="block mb-1">Image 3 (side)</label>
          <input
            type="file"
            name="image3"
            accept="image/*"
            onChange={handleFileChange}
          />
          {uploading.image3 ? (
            <p className="text-sm">Uploading...</p>
          ) : form.image3 ? (
            <p className="text-sm text-green-600 break-all">{form.image3}</p>
          ) : null}
        </div>

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
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          disabled={uploading.image1 || uploading.image2 || uploading.image3}
        >
          Upload
        </button>
      </form>
    </div>
  );
}
