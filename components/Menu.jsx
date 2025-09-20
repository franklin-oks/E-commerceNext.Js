"use client";
import Link from "next/link";
import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="size-12 rounded cursor-pointer bg-blue-600 text-white fixed top-4 right-4 z-50"
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black text-white w-full h-screen flex flex-col text-2xl z-40 justify-center items-center gap-6">
          <Link
            onClick={() => setOpen(false)}
            href="/"
            className="hover:underline"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/about"
            className="hover:underline"
          >
            About
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/products"
            className="hover:underline"
          >
            Shop
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/login"
            className="hover:underline"
          >
            Login
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/contact"
            className="hover:underline"
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
