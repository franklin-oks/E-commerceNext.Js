import { NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/googleSheet";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req) {
  // --- AUTHORIZATION CHECK ---
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // --- VALIDATION ---
  const body = await req.json();
  if (!body.name || !body.price) {
    return NextResponse.json(
      { message: "Missing name or price" },
      { status: 400 }
    );
  }

  // --- ADD PRODUCT ---
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  await addProduct(newProduct);

  return NextResponse.json({ message: "Product added", product: newProduct });
}
