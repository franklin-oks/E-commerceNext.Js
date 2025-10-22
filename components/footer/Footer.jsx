"use client";
import Link from "next/link";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const [sub, setSub] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sub) return toast.error("Please enter your email");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.info("You must login before subscribing!");
      router.push("/login"); // redirect to login
      return;
    }

    const { error } = await supabase
      .from("subscribe")
      .insert([{ email: sub }])
      .single();

    if (error) {
      console.error(error);
      toast.error("Error subscribing. You might already be subscribed.");
      return;
    }

    setSub("");
    toast.success("Subscried Successfully!");
  };

  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-200 text-sm mt-24">
      {/* top */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* left */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl text-neutral-900 tracking-wide font-bold">
              NIKAMANDA
            </div>
          </Link>
          <p className="text-lg">No 5 Opic Road Mowe Ogun State, Nigeria</p>
          <span className="font-semibold">nikamanda@gmail.com</span>
          <span className="font-semibold">+234 8103919717</span>
          <div className="flex gap-6 text-lg">
            <FaFacebookMessenger />
            <FaFacebook />
            <FaWhatsapp />
          </div>
        </div>
        {/* center */}
        <div className="w-1/2 hidden lg:flex justify-between">
          <div className="flex flex-col justify-between">
            <h2 className="font-medium text-lg">COMPANY</h2>
            <div className="flex flex-col gap-6 mt-[-2rem]">
              <Link href="/about">About Us</Link>
              <Link href="/">BLog</Link>
              <Link href="/products">Shop</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 hidden lg:flex justify-between">
          <div className="flex flex-col justify-between">
            <h2 className="font-medium text-lg">SHOP</h2>
            <div className="flex flex-col gap-6">
              <Link href="/">New Arrivals</Link>
              <Link href="/">Men's Wears</Link>
              <Link href="/">Female Wears</Link>
              <Link href="/">All Products</Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 hidden lg:flex justify-between">
          <div className="flex flex-col justify-between">
            <h2 className="font-medium text-lg">HELP</h2>
            <div className="flex flex-col gap-6">
              <Link href="/">Customer Service</Link>
              <Link href="/">My Account</Link>
              <Link href="/">Legacy and Privacy</Link>
              <Link href="/">Discounts</Link>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, products and much
            more!
          </p>
          <form onSubmit={handleSubmit} className="flex  bg-white relative ">
            <input
              type="text"
              placeholder="Enter Email"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              className="p-4 w-3/4 outline-none border-none"
            />
            <button
              type="submit"
              className="text-white cursor-pointer absolute right-0 top-0 bottom-0 bg-orange-500 p-2"
            >
              JOIN
            </button>
          </form>
          <span className="semibold">Secure Payments</span>
          <div className="flex justify-between gap-2">
            <span className="text-sm font-bold">Verve</span>
            <span className="text-sm font-bold">Master</span>
            <span className="text-sm font-bold">Paystack</span>
            <span className="text-sm font-bold">Bank Transfter</span>
          </div>
        </div>
      </div>
      {/* buttom */}

      <hr className="text-gray-100 py-2" />
      <div className="flex flex-col md:flex-row gap-8 mt-12 justify-between items-center">
        <div className="">&copy; 2025 NIKAMANDA SHOP</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Location</span>
            <span className="font-medium">Ogun State, Nigeria</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">Naira|USD|EURO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
