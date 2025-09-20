"use client";

const CustomizeProduct = () => {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium">Choose a color</h4>
      <ul className="flex items-center gap-3">
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
          <div className="h-10 w-10 rounded-full ring-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </li>
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
          <div className="h-[2px] w-10 bg-red-400 rotate-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </li>
      </ul>
      <h4 className="font-medium">Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="ring-1 ring-pink-500 text-pink-500 cursor-pointer rounded-md py-1 px-4 text-sm w-max">
          Small
        </li>
        <li className="ring-1 ring-pink-500 text-white bg-pink-500 cursor-pointer rounded-md py-1 px-4 text-sm w-max">
          Medium
        </li>
        <li className="ring-1 ring-pink-200 text-white bg-pink-200 cursor-not-allowed rounded-md py-1 px-4 text-sm w-max">
          Large
        </li>
      </ul>
    </div>
  );
};

export default CustomizeProduct;
