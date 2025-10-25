"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Menu from "./Menu";

import NavbarIcons from "./NavbarIcons";
import CartModel from "./CartModel";
import { useCart } from "@/context/CartContext";
import { FaCartPlus } from "react-icons/fa";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { getCartCount } = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="h-20 px-4 sm:px-8 lg:px-8 w-full shadow-sm fixed top-0 left-0 z-50 bg-white">
      {/* Mobile Navbar */}
      <div className="h-full flex justify-between items-center md:hidden relative">
        <Link
          href="/"
          className="text-lg font-bold tracking-wide text-neutral-900 flex items-center gap-2"
        >
          <Image
            src="https://plus.unsplash.com/premium_photo-1669077046976-0bafea53487e?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="logo"
            width={35}
            height={35}
          />
          <span className="text-lg font-bold">NIKAMANDA</span>
        </Link>

        <div className="flex items-center gap-5 flex-shrink-0">
          {/* Cart Icon */}
          {isClient && (
            <div
              onClick={() => setIsCartOpen((prev) => !prev)}
              className="relative cursor-pointer z-30 flex-shrink-0"
            >
              <FaCartPlus size={24} className="text-neutral-800 mr-15" />
              <span className="absolute -top-1.5 -right-1.5 w-4 mr-15 h-4 text-[10px] flex items-center justify-center text-white rounded-full bg-orange-500">
                {getCartCount()}
              </span>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Menu />
        </div>

        {/* Cart Modal */}
        {isCartOpen && isClient && (
          <div className="absolute top-full right-0 z-40">
            <CartModel />
          </div>
        )}
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between h-full">
        <div className="w-1/3 lg:w-1/2 flex justify-start items-center gap-5">
          <Image
            src="https://plus.unsplash.com/premium_photo-1669077046976-0bafea53487e?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="logo"
            width={45}
            height={45}
          />
          <Link
            href="/"
            className="text-xl font-bold tracking-wide text-neutral-900"
          >
            NIKAMANDA
          </Link>

          <nav className="hidden lg:flex gap-6 text-neutral-700">
            <Link className="hover:underline underline-offset-4" href="/">
              Home
            </Link>
            <Link className="hover:underline underline-offset-4" href="/about">
              About
            </Link>
            <Link
              className="hover:underline underline-offset-4"
              href="/products"
            >
              Shop
            </Link>
            <Link
              className="hover:underline underline-offset-4"
              href="/contact"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="w-2/3 lg:w-1/2 flex justify-end items-center gap-8">
          <NavbarIcons />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
