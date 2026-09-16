import type { ProductCardProduct } from "@/types";

const STORAGE_KEY = "recentlyViewed";
const MAX_RECENT_ITEMS = 6;

export const addRecentlyViewed = (product: ProductCardProduct): void => {
  if (typeof window === "undefined") return;

  const viewed = getRecentlyViewed().filter((p) => p.id !== product.id);
  const updated = [product, ...viewed].slice(0, MAX_RECENT_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getRecentlyViewed = (): ProductCardProduct[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is ProductCardProduct =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        typeof item.id === "string" &&
        "name" in item &&
        typeof item.name === "string" &&
        "price" in item &&
        typeof item.price === "number"
    );
  } catch {
    return [];
  }
};
