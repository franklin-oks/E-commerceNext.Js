"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CartModel from "./CartModel";
import { useCart } from "@/context/CartContext";
import { FaUserCircle, FaCartPlus } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import Searchbar from "./Searchbar";

export default function NavbarIcons() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartContext = useCart?.();
  const cart = cartContext?.cart ?? [];
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      setLoading(true);
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (!mounted) return;
        setUser(currentUser ?? null);

        if (currentUser) {
          const { data: profRow, error } = await supabase
            .from("profiles")
            .select("id, avatar_url, full_name, email")
            .eq("id", currentUser.id)
            .maybeSingle();

          if (!error && profRow) setProfile(profRow);
          else setProfile(null);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetching user/profile", err);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          const u = session?.user ?? null;
          setUser(u);
          if (u) {
            supabase
              .from("profiles")
              .select("id, avatar_url, full_name, email")
              .eq("id", u.id)
              .maybeSingle()
              .then(({ data: profRow }) => {
                if (profRow) setProfile(profRow);
                else setProfile(null);
              });
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setProfile(null);
          setIsProfileOpen(false);
        }
      }
    );

    return () => {
      mounted = false;
      if (listener?.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsProfileOpen(false);
      setUser(null);
      setProfile(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const goToProfile = () => {
    router.push("/account");
    setIsProfileOpen(false);
  };

  return (
    <div className="flex items-center gap-4" ref={containerRef}>
      {/* You can place SearchBar anywhere in your header; shown here for example */}
      <div className="hidden md:block w-96">
        <Searchbar />
      </div>

      {/* Profile */}
      <div onClick={handleProfileClick} className="cursor-pointer">
        {profile?.avatar_url ||
        user?.user_metadata?.avatar_url ||
        user?.user_metadata?.avatar ? (
          <img
            src={
              profile?.avatar_url ||
              user?.user_metadata?.avatar_url ||
              user?.user_metadata?.avatar
            }
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover border"
          />
        ) : (
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl bg-gray-100 border">
            <FaUserCircle />
          </div>
        )}
      </div>

      {/* Profile dropdown */}
      {isProfileOpen && user && (
        <div className="absolute top-14 right-4 bg-white shadow-md rounded-md p-4 text-sm z-50 w-64">
          <div className="flex items-center gap-3">
            {profile?.avatar_url ||
            user?.user_metadata?.avatar_url ||
            user?.user_metadata?.avatar ? (
              <img
                src={
                  profile?.avatar_url ||
                  user?.user_metadata?.avatar_url ||
                  user?.user_metadata?.avatar
                }
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gray-100">
                <FaUserCircle />
              </div>
            )}

            <div className="flex-1">
              <div className="font-medium truncate">
                {profile?.full_name ||
                  user?.user_metadata?.full_name ||
                  "Your profile"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {profile?.email || user?.email}
              </div>
            </div>
          </div>

          <div className="mt-3 border-t pt-3 space-y-2">
            <button
              onClick={goToProfile}
              className="w-full text-left block px-3 py-2 rounded hover:bg-gray-50"
            >
              View profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left block px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Cart icon */}
      <div
        onClick={() => setIsCartOpen((p) => !p)}
        className="relative cursor-pointer text-2xl"
      >
        <FaCartPlus />
        {cart && cart.length > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-semibold text-white rounded-full bg-orange-500">
            {cart.length}
          </span>
        )}
      </div>

      {isCartOpen && <CartModel onClose={() => setIsCartOpen(false)} />}
    </div>
  );
}
