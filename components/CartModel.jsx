"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

// ✅ Currency formatter for Naira
const formatCurrency = (amount) => {
  if (isNaN(amount)) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const CartModel = () => {
  const { cart, removeFromCart, getSubtotal } = useCart();

  // Subtotal only (no delivery fee)
  const subtotal = getSubtotal() || 0;
  const total = subtotal; // Total = subtotal, delivery is excluded

  return (
    <div className="w-max max-h-[70vh] shadow-[0_3px_10px_rgba(0,0,0,0.2)] absolute p-4 rounded-md bg-white top-20 lg:top-12 right-1 flex flex-col gap-6 z-20">
      <h2 className="font-semibold text-lg">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div>Cart is Empty</div>
      ) : (
        // Make items scrollable
        <div className="flex flex-col gap-8 overflow-y-auto max-h-[50vh] pr-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center justify-center"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={99}
                height={92}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col gap-6 justify-between w-full">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="text-sm bg-green-500 p-1 rounded-full text-white flex items-center justify-center">
                      Available
                    </div>
                  </div>

                  <div className="p-1 bg-gray-50 rounded-sm">
                    {formatCurrency(Number(item.price))}
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. {item.quantity}</span>
                  <span
                    className="text-red-600 cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        {/* Subtotal */}
        <div className="flex justify-between items-center font-semibold">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center font-bold text-lg mt-2">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>

        <p className="text-gray-500 mt-2 mb-4 text-sm">
          Delivery fees are negotiated on call (excluded here)
        </p>

        <div className="flex justify-between text-sm">
          <button className="rounded-md cursor-pointer py-3 px-4 ring-1 ring-gray-500">
            View Cart
          </button>
          <button className="rounded-md cursor-pointer py-3 px-4 bg-black font-bold text-white">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModel;
