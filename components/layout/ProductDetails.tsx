"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cartStore";

const money = (value: number) => `Gs. ${new Intl.NumberFormat("es-PY").format(value)}`;

export default function ProductDetails({ product }: { product: Product | null }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const sizes = Array.isArray(product?.sizes) ? product.sizes.filter(Boolean) : [];
  const colors = Array.isArray(product?.colors) ? product.colors.filter(Boolean) : [];
  const [size, setSize] = useState(sizes[0] ?? "");
  const [color, setColor] = useState(colors[0] ?? "");
  const [adding, setAdding] = useState(false);

  if (!product) return <div className="p-16 text-center font-serif text-3xl">Producto no encontrado</div>;
  const images = product.image_url_array?.filter(Boolean) ?? [];
  const price = Number(product.offer_price ?? product.price);

  const addToCart = async () => {
    if (sizes.length > 0 && !size) return;
    setAdding(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }
    await addItem(user.id, { product_id: product.id, quantity });
    router.push('/cart');
  };

  return (
    <div className="mx-auto grid w-[94%] max-w-[1600px] gap-10 pb-20 lg:grid-cols-[1.35fr_.65fr] lg:gap-16">
      <div className="grid gap-2 sm:grid-cols-2">{(images.length ? images : [`https://picsum.photos/seed/${product.id}/1000/1300`]).map((src, i) => <div key={`${src}-${i}`} className={`relative overflow-hidden bg-[#eee9e3] ${i === 0 && images.length === 1 ? 'sm:col-span-2' : ''}`}><div className="aspect-[3/4]"><Image src={src} alt={`${product.name} ${i + 1}`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority={i === 0} /></div></div>)}</div>

      <aside className="self-start lg:sticky lg:top-36">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">{product.brand?.name ?? 'RUA Vera'}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-[-0.03em] lg:text-5xl">{product.name}</h1>
        <div className="mt-5 flex items-center gap-3"><span className="text-base">{money(price)}</span>{product.offer_price != null && <span className="text-sm text-[#8f8a87] line-through">{money(Number(product.price))}</span>}</div>
        <p className="mt-3 text-xs text-[#6e6965]">Precio final en guaraníes.</p>

        {sizes.length > 0 && <div className="mt-8 border-t border-[#d9d2cb] pt-6"><div className="flex justify-between"><p className="text-[10px] uppercase tracking-[0.18em]">Seleccioná tu talle</p><button className="text-[10px] underline">Guía de talles</button></div><div className="mt-4 grid grid-cols-4 gap-2">{sizes.map((item) => <button key={item} onClick={() => setSize(item)} className={`border py-3 text-xs ${size === item ? 'border-[#201e1c] bg-[#201e1c] text-white' : 'border-[#d9d2cb] bg-white'}`}>{item}</button>)}</div></div>}
        {sizes.length === 0 && <div className="mt-8 border-t border-[#d9d2cb] pt-5 text-xs text-[#6e6965]">Talle / variante sujeto a la configuración del producto.</div>}
        {colors.length > 0 && <div className="mt-6"><p className="text-[10px] uppercase tracking-[0.18em]">Color</p><div className="mt-3 flex flex-wrap gap-2">{colors.map((item) => <button key={item} onClick={() => setColor(item)} className={`border px-4 py-2 text-xs ${color === item ? 'border-[#201e1c]' : 'border-[#d9d2cb]'}`}>{item}</button>)}</div></div>}

        <div className="mt-7 flex items-center justify-between border-y border-[#d9d2cb] py-4"><span className="text-[10px] uppercase tracking-[0.18em]">Cantidad</span><div className="flex items-center gap-4"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15}/></button><span className="text-sm">{quantity}</span><button onClick={() => setQuantity(Math.min(product.quantity || 99, quantity + 1))}><Plus size={15}/></button></div></div>
        <button disabled={adding || product.quantity <= 0} onClick={addToCart} className="mt-6 flex w-full items-center justify-center gap-2 bg-[#201e1c] py-5 text-[10px] uppercase tracking-[0.2em] text-white disabled:opacity-40"><ShoppingBag size={16}/>{product.quantity <= 0 ? 'Sin stock' : adding ? 'Agregando...' : 'Agregar al carrito'}</button>
        <button className="mt-3 flex w-full items-center justify-center gap-2 border border-[#201e1c] py-4 text-[10px] uppercase tracking-[0.18em]"><Heart size={15}/> Guardar en favoritos</button>

        {product.description && <div className="mt-8 border-t border-[#d9d2cb] pt-6"><p className="text-[10px] uppercase tracking-[0.18em]">Descripción</p><p className="mt-3 text-sm leading-7 text-[#6e6965]">{product.description}</p></div>}
        <div className="mt-6 border-t border-[#d9d2cb] pt-5 text-sm leading-7 text-[#6e6965]"><p>Entrega a domicilio o retiro en tienda se selecciona durante el checkout.</p><p>Los medios de pago disponibles se muestran antes de confirmar el pedido.</p></div>
      </aside>
    </div>
  );
}
