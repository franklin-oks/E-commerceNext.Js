// "use client";
// import { useState } from "react";

// export default function PayButton({ email, amount }) {
//   const [loading, setLoading] = useState(false);

//   const handlePay = async () => {
//     setLoading(true);
//     const res = await fetch("/api/paystack/initialize", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, amount }),
//     });
//     const data = await res.json();
//     setLoading(false);

//     if (data.authorizationUrl) {
//       window.location.href = data.authorizationUrl; // redirect to Paystack
//     } else {
//       alert("Payment init failed: " + data.error);
//     }
//   };

//   return (
//     <button
//       onClick={handlePay}
//       disabled={loading}
//       className="bg-green-500 text-white px-6 py-2 rounded-lg"
//     >
//       {loading ? "Processing..." : "Pay with Paystack"}
//     </button>
//   );
// }

// chat

// chat

"use client";
import { useState } from "react";

export default function PayButton({ email, amount }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, amount }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl; // redirect to Paystack
      } else {
        alert("Payment initialization failed: " + data.error);
      }
    } catch (err) {
      setLoading(false);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="bg-green-500 text-white px-6 py-2 rounded-lg"
    >
      {loading ? "Processing..." : "Pay with Paystack"}
    </button>
  );
}
