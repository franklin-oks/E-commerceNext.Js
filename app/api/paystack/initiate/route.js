// app/api/paystack/initiate/route.js
import { NextResponse } from "next/server";

// If you use Supabase, import and init server client here (service role key).
// import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, amount, metadata } = body; // amount expected in kobo (integer)
    if (!email || !amount)
      return NextResponse.json(
        { error: "Missing email or amount" },
        { status: 400 }
      );

    // OPTIONAL: create order in your DB and get orderId
    // const orderId = await createOrderInYourDB({ email, amount, items: metadata?.items || [] });

    // We'll use a UUID/fallback for reference if you don't persist order first
    const reference = metadata?.order_id || cryptoRandomReference();

    // Build initialize payload
    const initializePayload = {
      email,
      amount,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
      // metadata: { order_id: reference, ...metadata }
    };

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initializePayload),
    });

    const json = await res.json();
    if (!json.status) {
      console.error("Paystack init error", json);
      return NextResponse.json(
        { error: "Paystack initialization failed", detail: json },
        { status: 500 }
      );
    }

    // Optionally persist paystack reference / access_code to your order record here.

    return NextResponse.json({
      authorization_url: json.data.authorization_url,
      access_code: json.data.access_code,
      reference: json.data.reference,
    });
  } catch (err) {
    console.error("initiate error", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

function cryptoRandomReference() {
  // simple pseudo-random ref — replace with robust UUID if you want
  return (
    "ref_" + Math.random().toString(36).slice(2, 12) + Date.now().toString(36)
  );
}
