"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const Add = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    // Add product to cart with selected quantity
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image1,
      quantity: quantity, // <-- selected quantity
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium">Choose Quantity</h1>
      <div className="flex justify-between items-center gap-4">
        <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
          <button className="text-2xl cursor-pointer" onClick={handleDecrease}>
            -
          </button>
          <span>{quantity}</span>
          <button className="text-2xl cursor-pointer" onClick={handleIncrease}>
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-32 h-max text-xs cursor-pointer rounded-3xl ring-1 ring-pink-500 text-pink-500 py-2 px-4 hover:bg-pink-500 hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
