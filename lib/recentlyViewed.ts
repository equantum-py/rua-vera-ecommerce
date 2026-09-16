import type { ProductCardProduct } from "@/types";

const STORAGE_KEY = "recentlyViewed";

function readRecentlyViewed(): ProductCardProduct[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is ProductCardProduct => {
      if (typeof item !== "object" || item === null) return false;
      const candidate = item as Partial<ProductCardProduct>;
      return typeof candidate.id === "string" && typeof candidate.name === "string";
    });
  } catch {
    return [];
  }
}

export const addRecentlyViewed = (product: ProductCardProduct) => {
  if (typeof window === "undefined") return;

  const viewed = readRecentlyViewed().filter((p) => p.id !== product.id);
  viewed.unshift(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed.slice(0, 6)));
};

export const getRecentlyViewed = (): ProductCardProduct[] => {
  return readRecentlyViewed();
};
