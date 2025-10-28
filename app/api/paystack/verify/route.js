// app/api/paystack/verify/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const reference = url.searchParams.get("reference");
    if (!reference)
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });

    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();
    if (!json.status) {
      // mark order failed or unknown
      return NextResponse.json({ ok: false, detail: json }, { status: 400 });
    }

    // if json.data.status === 'success' update your DB order status to paid.
    // await updateOrderStatus(reference, 'paid');

    return NextResponse.json({ ok: true, data: json.data });
  } catch (err) {
    console.error("verify error", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
