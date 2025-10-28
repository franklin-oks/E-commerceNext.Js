// app/payment/success/page.jsx
import Link from "next/link";
export default function PaymentSuccessPage({ searchParams }) {
  const reference = searchParams?.reference || "";
  return (
    <main style={{ padding: 28 }}>
      <h1 className="text-2xl font-bold mt-20">Payment Successful 🎉</h1>
      <p className="mt-3">Thank you — your payment was successful.</p>
      {reference && (
        <p className="mt-2">
          <strong>Reference:</strong> <code>{reference}</code>
        </p>
      )}
      <p className="mt-4">
        We'll email your receipt shortly. You can now return to the shop.
      </p>
      <Link
        className="mt-6 inline-block bg-blue-500 p-2 text-white font-bold"
        href="/products"
      >
        Return to shop
      </Link>
    </main>
  );
}
