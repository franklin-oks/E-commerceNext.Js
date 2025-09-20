"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

const Filter = () => {
  const pathName = usePathname();
  const searchParam = useParams();
  const { replace } = useRouter();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParam);
    params.set(name, value);
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl bg-[#EDEDED] cursor-pointer outline-none text-xs font-medium border-0"
          onChange={handleFilterChange}
        >
          <option>Type</option>
          <option value="Physical">Physical</option>
          <option value="Digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="Min. price"
          className="text-xs outline-none border-none rounded-2xl pl-2  w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="Max. price"
          className="text-xs outline-none border-none rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />

        <select
          name="cart"
          id=""
          className="py-2 px-4 rounded-2xl bg-[#EDEDED] cursor-pointer outline-none text-xs font-medium border-0"
          onChange={handleFilterChange}
        >
          <option>Categories</option>
          <option value="males">Males</option>
          <option value="females">Female</option>
          <option value="foot wears">Foot Wears</option>
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 border-none cursor-pointer rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="high price">Price (low to high)</option>
          <option value="low price">Price (high to low)</option>
          <option value="newst">Newest</option>
          <option value="oldes">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
