// components/LogoutButton.jsx
"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handle = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <button onClick={handle} className="px-3 py-1 rounded bg-gray-200">
      Sign out
    </button>
  );
}
