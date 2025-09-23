import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, amount } = await req.json();

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // secret key here
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack expects amount in kobo
        callback_url: process.env.NEXT_PUBLIC_CALLBACK_URL, // change to your deployed callback page
      }),
    });

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    return NextResponse.json({ authorizationUrl: data.data.authorization_url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
