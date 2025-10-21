// app/api/admin/delete-product/route.js
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id)
      return NextResponse.json({ error: "id required" }, { status: 400 });

    // fetch product to get image_path
    const { data: product, error: fetchErr } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchErr)
      return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    if (!product)
      return NextResponse.json({ error: "product not found" }, { status: 404 });

    // delete storage object
    if (product.image_path) {
      // image_path is "bucket/path" or "product-images/filename"
      // split
      const parts = product.image_path.split("/");
      const bucket = parts.shift();
      const path = parts.join("/");
      if (bucket && path) {
        const { error: delErr } = await supabaseAdmin.storage
          .from(bucket)
          .remove([path]);
        if (delErr) {
          console.error("storage delete error", delErr);
          // continue anyway (or error out)
        }
      }
    }

    // delete db row
    const { error: deleteErr } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);
    if (deleteErr)
      return NextResponse.json({ error: deleteErr.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "unknown" },
      { status: 500 }
    );
  }
}
