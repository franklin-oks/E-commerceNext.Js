// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function AdminGuard({ children }) {
//   const [checking, setChecking] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     (async () => {
//       const { data: userResult, error: userErr } =
//         await supabase.auth.getUser();
//       const user = userResult?.user;
//       if (userErr || !user) {
//         router.push("/login");
//         return;
//       }

//       const { data, error } = await supabase
//         .from("admins")
//         .select("id")
//         .eq("id", user.id)
//         .single();
//       if (error || !data) {
//         router.push("/");
//         return;
//       }

//       setChecking(false);
//     })();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (checking) return <div>Checking admin access...</div>;
//   return <>{children}</>;
// }

// chat

// components/AdminGuard.jsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    // helper to check session + admin row
    const check = async () => {
      // 1) check existing session quickly
      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();
      const session = sessionData?.session;

      // If no session, show login page (but allow onAuthStateChange to update)
      if (!session) {
        // subscribe to auth state and wait for sign-in event
        const { data: listener } = supabase.auth.onAuthStateChange(
          (_event, authSession) => {
            if (authSession?.user) {
              // when user signs in, re-check admin permissions
              verifyAdmin(authSession.user.id);
            } else {
              // no session -> push to login
              router.push("/login");
            }
          }
        );
        // cleanup
        return () => {
          listener.subscription.unsubscribe();
        };
      } else {
        // has session: verify admin
        verifyAdmin(session.user.id);
      }
    };

    const verifyAdmin = async (userId) => {
      try {
        // query admins table for this user id
        const { data, error } = await supabase
          .from("admins")
          .select("id")
          .eq("id", userId)
          .single();

        if (error || !data) {
          // not an admin -> redirect away
          router.push("/"); // or a nicer "Not allowed" page
          return;
        }

        if (mounted) setChecking(false);
      } catch (err) {
        console.error("AdminGuard verify error:", err);
        router.push("/");
      }
    };

    check();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking)
    return <div className="p-8 text-center">Checking admin access...</div>;
  return <>{children}</>;
}
