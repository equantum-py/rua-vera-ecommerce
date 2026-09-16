"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductCardProduct } from "@/types";
import { useWishlistStore } from "@/store/wishlistStore";
import { createClient } from "@/lib/supabase/client";

type ProductCardProps = {
  product: ProductCardProduct;
  onAddToCart: (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductCardProduct
  ) => void | Promise<void>;
};

function formatPrice(value: number | null | undefined) {
  if (value == null) return "Consultar";
  return `Gs. ${new Intl.NumberFormat("es-PY").format(value)}`;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  const images = Array.isArray(product.image_url_array)
    ? product.image_url_array.filter((image): image is string => typeof image === "string" && image.trim().length > 0)
    : [];
  const primaryImage = images[0] || `https://picsum.photos/seed/${product.id}/800/1000`;
  const secondaryImage = images[1];

  const handleWishlistToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    if (wishlisted) await removeFromWishlist(user.id, product.id);
    else await addToWishlist(user.id, product.id);
  };

  return (
    <article className="group min-w-0">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#eee9e3]">
          <Image src={primaryImage} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className={`object-cover transition duration-700 ${secondaryImage ? "group-hover:opacity-0" : "group-hover:scale-[1.02]"}`} />
          {secondaryImage && <Image src={secondaryImage} alt={`${product.name} - segunda vista`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover opacity-0 transition duration-700 group-hover:opacity-100" />}
          <button onClick={handleWishlistToggle} aria-label={wishlisted ? "Quitar de favoritos" : "Agregar a favoritos"} className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-white/90 transition hover:bg-white"><Heart className={`h-4 w-4 ${wishlisted ? "fill-[#201e1c]" : ""}`} /></button>
          {product.offer_price != null && <span className="absolute left-3 top-3 bg-[#201e1c] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white">Oferta</span>}
          <button onClick={(e) => onAddToCart(e, product)} className="absolute bottom-0 left-0 right-0 hidden translate-y-full bg-[#201e1c] py-4 text-[9px] uppercase tracking-[0.2em] text-white transition-transform duration-300 group-hover:translate-y-0 md:block">Agregar al carrito</button>
        </div>
        <div className="pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#201e1c]">RUA Vera</p>
          <h3 className="mt-1 min-h-10 font-serif text-[17px] leading-5">{product.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span>{formatPrice(product.offer_price ?? product.price)}</span>
            {product.offer_price != null && <span className="text-[#8f8a87] line-through">{formatPrice(product.price)}</span>}
          </div>
        </div>
      </Link>
      <button onClick={(e) => onAddToCart(e, product)} className="mt-3 w-full border border-[#201e1c] py-3 text-[9px] uppercase tracking-[0.18em] md:hidden">Agregar al carrito</button>
    </article>
  );
}
