"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navItems = [
  { label: "Inicio", link: "/" },
  { label: "Tienda", link: "/shop" },
  { label: "Marcas", link: "/categories" },
  { label: "RUA", link: "/about" },
  { label: "Contacto", link: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] w-[90%] items-center justify-between">
        <Link href="/" className="font-serif text-[27px] tracking-[-0.04em] text-foreground" aria-label="RUA Vera - Inicio">
          RUA <em className="text-[16px] font-normal">vera</em>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link key={item.link} href={item.link} className={`text-[11px] uppercase tracking-[0.16em] transition hover:text-foreground ${pathname === item.link ? 'text-foreground' : 'text-muted-foreground'}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <Link href="/shop" aria-label="Buscar" className="p-2.5 text-muted-foreground transition hover:text-foreground"><Search className="h-[17px] w-[17px]" /></Link>
          <Link href="/favorites" aria-label="Favoritos" className="p-2.5 text-muted-foreground transition hover:text-foreground"><Heart className="h-[17px] w-[17px]" /></Link>
          <Link href="/account" aria-label="Mi cuenta" className="p-2.5 text-muted-foreground transition hover:text-foreground"><UserRound className="h-[17px] w-[17px]" /></Link>
          <Link href="/cart" aria-label="Carrito" className="relative p-2.5 text-muted-foreground transition hover:text-foreground">
            <ShoppingBag className="h-[17px] w-[17px]" />
            {cartCount > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] text-background">{cartCount}</span>}
          </Link>
        </div>

        <button className="p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">{open ? <X /> : <Menu />}</button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-[5%] py-6 md:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => <Link key={item.link} href={item.link} onClick={() => setOpen(false)} className="border-b border-border py-4 font-serif text-2xl">{item.label}</Link>)}
          </nav>
          <div className="mt-6 flex gap-5 text-muted-foreground">
            <Link href="/favorites" aria-label="Favoritos"><Heart /></Link><Link href="/account" aria-label="Cuenta"><UserRound /></Link><Link href="/cart" aria-label="Carrito"><ShoppingBag /></Link>
          </div>
        </div>
      )}
    </header>
  );
}
