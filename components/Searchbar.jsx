"use client";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    const formData = new formData(e.currentTarget);
    const name = formData.get("name");

    if (name) {
      router.push(`/list?name=${name}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-between items-center rounded-xl gap-4 bg-gray-100 flex-1  py-2 px-6"
    >
      <input
        type="text"
        name="name"
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
