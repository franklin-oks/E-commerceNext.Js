import { NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/googleSheet";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req) {
  const body = await req.json();
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...body,
    createdAt: new Date().toISOString(),
  };
  await addProduct(newProduct);
  return NextResponse.json({ message: "Product added", product: newProduct });
}
