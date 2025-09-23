"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPaymentPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("Verifying payment...");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/paystack/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });

        const data = await res.json();

        if (data.status === "success") {
          setStatus("✅ Payment successful! Thank you for your purchase.");
        } else {
          setError(data.error || "Payment verification failed");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (reference) verifyPayment();
  }, [reference]);

  return (
    <div className="p-6">
      {error ? <p className="text-red-600">{error}</p> : <p>{status}</p>}
    </div>
  );
};

export default VerifyPaymentPage;
