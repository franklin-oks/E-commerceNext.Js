import ProductList from "@/components/productList/ProductList";
import Filter from "@/components/filterProd/Filter";
import Image from "next/image";
import logo from "@/public/jeep-remove.png";

const ProductsPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 mt-20">
      {/* Campaign */}
      <div className="hidden bg-pink-50 md:flex px-4 justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl leading-[48px] font-semibold text-gray-700">
            Grab up to 20% Discount on <br /> Selected Products
          </h1>
          <button className="rounded-2xl cursor-pointer bg-orange-500 text-white w-max px-5 py-3 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src={logo} fill alt="logo" className="object-contain" />
        </div>
      </div>

      <Filter />

      <h2 className="text-xl mt-12 font-semibold">Available Products!</h2>
      <ProductList />
    </div>
  );
};

export default ProductsPage;
