"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navItems = [
  { label: "Novedades", link: "/shop" },
  { label: "Marcas", link: "/categories" },
  { label: "Moda", link: "/shop" },
  { label: "Lifestyle", link: "/shop" },
  { label: "Objetos & Diseño", link: "/shop" },
  { label: "RUA", link: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#f7f4ef] text-[#201e1c]">
      <div className="border-b border-[#d9d2cb] bg-[#201e1c] px-4 py-2 text-center text-[9px] uppercase tracking-[0.2em] text-white/80">RUA Vera · Marcas con identidad · Asunción</div>
      <div className="mx-auto grid h-[82px] w-[94%] max-w-[1600px] grid-cols-[1fr_auto] items-center border-b border-[#d9d2cb] md:grid-cols-[auto_1fr_auto]">
        <Link href="/" className="relative block h-12 w-36" aria-label="RUA Vera - Inicio"><Image src="/brand/rua-vera-logo.svg" alt="RUA Vera" fill priority className="object-contain object-left" /></Link>
        <nav className="hidden items-center justify-center gap-6 lg:flex">{navItems.map((item) => <Link key={item.label} href={item.link} className={`border-b py-2 text-[10px] uppercase tracking-[0.16em] transition ${pathname === item.link ? "border-[#201e1c]" : "border-transparent hover:border-[#201e1c]"}`}>{item.label}</Link>)}</nav>
        <div className="hidden items-center md:flex"><Link href="/shop" aria-label="Buscar" className="p-2.5"><Search className="h-[18px] w-[18px]" /></Link><Link href="/favorites" aria-label="Favoritos" className="p-2.5"><Heart className="h-[18px] w-[18px]" /></Link><Link href="/account" aria-label="Mi cuenta" className="p-2.5"><UserRound className="h-[18px] w-[18px]" /></Link><Link href="/cart" aria-label="Carrito" className="relative p-2.5"><ShoppingBag className="h-[18px] w-[18px]" />{cartCount > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-[#201e1c] px-1 text-[9px] text-white">{cartCount}</span>}</Link></div>
        <button className="justify-self-end p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-b border-[#d9d2cb] bg-[#f7f4ef] px-[5%] py-5 md:hidden"><nav className="flex flex-col">{navItems.map((item) => <Link key={item.label} href={item.link} onClick={() => setOpen(false)} className="border-b border-[#d9d2cb] py-4 font-serif text-2xl">{item.label}</Link>)}</nav><div className="mt-6 flex items-center gap-6"><Link href="/shop"><Search /></Link><Link href="/favorites"><Heart /></Link><Link href="/account"><UserRound /></Link><Link href="/cart"><ShoppingBag /></Link></div></div>}
    </header>
  );
}
