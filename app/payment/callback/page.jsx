// app/payment/callback/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const reference = params.get("reference");
  const [status, setStatus] = useState("verifying"); // verifying | success | failed | error

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      // redirect to failed
      setTimeout(() => router.push("/payment/failed"), 800);
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `/api/paystack/verify?reference=${encodeURIComponent(reference)}`
        );
        const json = await res.json();

        if (res.ok && json.ok && json.data?.status === "success") {
          setStatus("success");
          // Optionally: update UI, save data, etc.
          setTimeout(
            () =>
              router.push(
                `/payment/success?reference=${encodeURIComponent(reference)}`
              ),
            700
          );
        } else {
          setStatus("failed");
          setTimeout(
            () =>
              router.push(
                `/payment/failed?reference=${encodeURIComponent(reference)}`
              ),
            1000
          );
        }
      } catch (err) {
        console.error("Verify call failed", err);
        setStatus("error");
        setTimeout(() => router.push("/payment/failed"), 1000);
      }
    })();
  }, [reference, router]);

  return (
    <div style={{ padding: 28 }}>
      <h2 className="text-xl mt-20 font-semibold">Processing payment…</h2>
      <p className="mt-2">
        Reference: <code>{reference || "n/a"}</code>
      </p>
      <p className="mt-4">
        Status: <strong>{status}</strong>
      </p>
      <p className="mt-6 text-sm text-gray-600">
        You will be redirected shortly.
      </p>
    </div>
  );
}
