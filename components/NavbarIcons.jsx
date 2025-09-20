"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartModel from "./CartModel";
import { useCart } from "@/context/CartContext";
import { FaUserCircle, FaCartPlus, FaUserSecret } from "react-icons/fa";

const NavbarIcons = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const isLoggedIn = false; // Replace with actual auth logic

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex items-center relative gap-4">
      {/* Profile Icon */}
      <div
        onClick={handleProfile}
        className="cursor-pointer text-2xl relative"
        title="Profile"
      >
        <FaUserCircle />
      </div>

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute top-12 left-0 bg-white shadow-md rounded-md p-4 text-sm z-50 w-36">
          <Link href="/" className="block py-1 hover:underline">
            Profile
          </Link>
          <div className="py-1 cursor-pointer hover:underline">Logout</div>
        </div>
      )}

      {/* Another Icon (Example) */}
      <div className="cursor-pointer text-2xl" title="Secret">
        <FaUserSecret />
      </div>

      {/* Cart Icon */}
      <div
        onClick={() => setIsCartOpen((prev) => !prev)}
        className="relative cursor-pointer text-2xl"
        title="Cart"
      >
        <FaCartPlus />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-semibold text-white rounded-full bg-orange-500">
            {cart.length}
          </span>
        )}
      </div>

      {/* Cart Modal */}
      {isCartOpen && <CartModel onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default NavbarIcons;
