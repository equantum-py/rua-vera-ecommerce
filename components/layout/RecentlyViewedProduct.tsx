"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addRecentlyViewed, getRecentlyViewed } from "@/lib/recentlyViewed";
import ProductCard from "@/components/layout/ProductCard";
import type { ProductCardProduct } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { createClient } from "@/lib/supabase/client";

export default function RecentlyViewedProduct({ product }: { product: ProductCardProduct }) {
  const [recentProducts, setRecentProducts] = useState<ProductCardProduct[]>([]);
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!product) return;

    addRecentlyViewed(product);
    const recent = getRecentlyViewed().filter(
      (p: ProductCardProduct) => p.id !== product.id
    );

    const timeoutId = setTimeout(() => {
      setRecentProducts(recent);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [product]);

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedProduct: ProductCardProduct
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    await addItem(user.id, {
      product_id: selectedProduct.id,
      quantity: 1,
    });
  };

  if (!recentProducts.length) return null;

  return (
    <section className="my-10 w-[90%] mx-auto">
      <h2 className="text-xl font-serif font-bold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {recentProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
