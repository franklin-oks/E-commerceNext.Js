import Link from "next/link";

// app/payment/failed/page.jsx
export default function PaymentFailedPage({ searchParams }) {
  const reference = searchParams?.reference || "";
  return (
    <main style={{ padding: 28 }}>
      <h1 className="text-2xl font-bold mt-20 text-red-600">
        Payment Unsuccessful
      </h1>
      <p className="mt-3">
        Unfortunately, your payment could not be completed.
      </p>
      {reference && (
        <p className="mt-2">
          <strong>Reference:</strong> <code>{reference}</code>
        </p>
      )}
      <p className="mt-4">Please try again or use the bank transfer option.</p>
      <div className="mt-6 flex gap-3">
        <Link className="px-4 py-2 bg-gray-200 rounded" href="/products">
          Return to checkout
        </Link>
        <Link
          className="px-4 py-2 bg-blue-600 font-bold p-2 text-white rounded"
          href="/products"
        >
          Back to shop
        </Link>
      </div>
    </main>
  );
}
