
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const [reference, setReference] = useState(null);
  const [status, setStatus] = useState("verifying"); // verifying | success | failed | error

  // get query param from browser (avoids useSearchParams)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("reference");
    setReference(ref);
  }, []);

  useEffect(() => {
    if (!reference) {
      // if reference is not available yet, wait a moment
      return;
    }

    let mounted = true;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(
          `/api/paystack/verify?reference=${encodeURIComponent(reference)}`,
          { signal: controller.signal }
        );
        const json = await res.json();

        if (!mounted) return;

        if (res.ok && json.ok && json.data?.status === "success") {
          setStatus("success");
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
        if (err.name === "AbortError") return;
        console.error("Verify call failed", err);
        if (!mounted) return;
        setStatus("error");
        setTimeout(() => router.push("/payment/failed"), 1000);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
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
