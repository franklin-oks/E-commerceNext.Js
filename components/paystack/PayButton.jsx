"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PayWithPaystackButton({
  email,
  amountNaira,
  items = {},
  metadata = {},
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amountKobo = Math.round(amountNaira * 100);

      const resp = await fetch("/api/paystack/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: amountKobo,
          metadata: { ...metadata, items }, // optional metadata for your DB
        }),
      });

      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || "Init failed");

      // Load inline script if needed
      await loadPaystackInline();

      // Preferred: resumeTransaction(access_code)
      if (
        json.access_code &&
        window.PaystackPop &&
        typeof window.PaystackPop === "function"
      ) {
        // older global PaystackPop() usage may vary. Try resumeTransaction if available:
        try {
          // Some builds expose PaystackPop globally as an object with resumeTransaction
          if (
            window.PaystackPop &&
            typeof window.PaystackPop.resumeTransaction === "function"
          ) {
            window.PaystackPop.resumeTransaction(json.access_code);
          } else {
            // fallback: open authorization_url
            window.location.href = json.authorization_url;
          }
        } catch (err) {
          window.location.href = json.authorization_url;
        }
      } else {
        // fallback: redirect
        window.location.href = json.authorization_url;
      }
    } catch (err) {
      console.error("Paystack init error", err);
      alert("Payment initialization failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {loading ? "Processing…" : `Pay with Card (₦${amountNaira})`}
    </button>
  );
}

async function loadPaystackInline() {
  if (typeof window === "undefined") return;
  if (window.PaystackPop) return;
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Paystack script"));
    document.body.appendChild(s);
  });
}
