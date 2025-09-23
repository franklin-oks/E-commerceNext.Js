import { getProducts } from "@/lib/googleSheet";
import { fallbackProducts } from "@/components/utils";

export async function fetchMergedProducts() {
  try {
    const sheetProducts = await getProducts();

    // Convert sheet IDs to string like prod-123 to avoid conflict
    const normalizedSheetProducts = sheetProducts.map((p) => ({
      ...p,
      id: p.id.toString().startsWith("prod-") ? p.id : `prod-${p.id}`,
    }));

    // Merge: sheet products first, fallback last
    return [...normalizedSheetProducts, ...fallbackProducts];
  } catch (err) {
    console.error("Failed to fetch Google Sheet products:", err);
    // fallback if API fails
    return fallbackProducts;
  }
}
