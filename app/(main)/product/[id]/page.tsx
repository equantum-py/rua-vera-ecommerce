import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchProductById } from "@/lib/supabase/server";
import ProductDetails from "@/components/layout/ProductDetails";
import RecentlyViewedProduct from "@/components/layout/RecentlyViewedProduct";

export default async function Page({ params }: { params: Promise<{ id: string }> }): Promise<React.ReactElement> {
  const { id } = await params;
  const product = await fetchProductById(id);
  if (!product) notFound();
  return <main className="bg-[#f7f4ef] text-[#201e1c]"><div className="mx-auto flex w-[94%] max-w-[1600px] items-center gap-2 py-6 text-[9px] uppercase tracking-[0.16em] text-[#6e6965]"><Link href="/">Inicio</Link><span>/</span><Link href="/shop">Tienda</Link><span>/</span><span className="text-[#201e1c]">{product.name}</span></div><ProductDetails product={product} /><RecentlyViewedProduct product={product} /></main>;
}
