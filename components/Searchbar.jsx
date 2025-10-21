"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [name, setName] = useState("");

  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    router.push("/products");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .like("title", "%" + name + "%");

    if (data) {
      setName(data);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-between items-center rounded-xl gap-4 bg-gray-100 flex-1  py-2 px-6"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="search..."
        className="flex-1 outline-none bg-transparent"
      />

      <button type="submit" className="text-xs">
        search
      </button>
    </form>
  );
};

export default SearchBar;
