// app/login/page.jsx   (app-router) -- if you use pages router put this in pages/login.jsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success(
          "Check your email to confirm (if email confirmations enabled). Then sign in."
        );
        setIsSignUp(false);
      } else {
        // sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // successful sign-in
        // wait shortly to ensure session is available
        setTimeout(() => {
          router.push("/admin");
        }, 300);
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast.error(err?.message ?? "Authentication error");
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink() {
    if (!email) return toast.error("Enter email for magic link");
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      toast.success("Magic link sent. Check your email.");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Error sending magic link");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isSignUp ? "Create account" : "Sign in"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2"
              type="password"
              required={!isSignUp ? true : false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Strong password"
            />
            {isSignUp && (
              <p className="mt-1 text-xs text-gray-500">
                Pick a strong password (min 6+ chars).
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : isSignUp
                ? "Create account"
                : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-indigo-600 hover:underline"
          >
            {isSignUp ? "Have an account? Sign in" : "Create an account"}
          </button>

          <button
            onClick={handleMagicLink}
            className="text-sm text-gray-600 hover:underline"
          >
            Send magic link
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <button
            onClick={handleLogout}
            className="text-xs text-red-500 hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
