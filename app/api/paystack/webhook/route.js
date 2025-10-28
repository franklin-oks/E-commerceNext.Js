// app/api/paystack/webhook/route.js
import crypto from "crypto";
import { NextResponse } from "next/server";

/**
 * Paystack webhook endpoint.
 * - Configure this URL in Paystack dashboard (e.g. https://yourdomain.com/api/paystack/webhook).
 * - Use the PAYSTACK_WEBHOOK_SECRET (or PAYSTACK_SECRET_KEY) in env to verify signature.
 *
 * NOTE: This file must run in Node runtime (default). Do NOT export `runtime = "edge"`
 * if you're using Node's crypto.createHmac as below.
 */

export async function POST(req) {
  try {
    const rawBody = await req.text(); // exact payload as string
    const signature =
      req.headers.get("x-paystack-signature") ||
      req.headers.get("X-Paystack-Signature");

    const secret =
      process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      console.error(
        "PAYSTACK_WEBHOOK_SECRET or PAYSTACK_SECRET_KEY missing in env"
      );
      return NextResponse.json(
        { ok: false, message: "Server misconfigured" },
        { status: 500 }
      );
    }

    const hmac = crypto
      .createHmac("sha512", secret)
      .update(rawBody)
      .digest("hex");

    if (!signature || signature !== hmac) {
      console.warn("Invalid paystack webhook signature", {
        signature,
        computed: hmac,
      });
      return NextResponse.json(
        { ok: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);

    // Example: handle successful charges
    if (
      event?.event === "charge.success" ||
      event?.event === "transaction.success"
    ) {
      const reference = event?.data?.reference;
      const status = event?.data?.status; // should be "success"
      console.log("Paystack webhook: transaction success", {
        reference,
        status,
      });

      // --- Put your order fulfillment logic here ---
      // 1) Optionally verify the transaction server-side using the verify endpoint:
      //    fetch(`https://api.paystack.co/transaction/verify/${reference}`, ...)
      // 2) Update your DB order record (set status: 'paid') using `reference` or metadata.order_id
      // 3) Send receipt email, create shipment, etc.
      //
      // Example (pseudo):
      // await updateOrderStatusInDB(reference, { status: 'paid', paystack_data: event.data });
      // ------------------------------------------------
    } else {
      // handle other events if needed
      console.log("Paystack webhook: unhandled event", event?.event);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook processing error", err);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
