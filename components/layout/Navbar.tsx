"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { usePathname, useRouter } from "next/navigation";
import { createClient, isSupabaseBrowserConfigured } from "@/lib/supabase/client";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, Package, Heart, LogOut, Settings, ShoppingCart, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import SearchBar from "@/components/layout/SearchBar";

const navItems = [
  { label: "Inicio", link: "/" },
  { label: "Tienda", link: "/shop" },
  { label: "Categorías", link: "/categories" },
  { label: "RUA", link: "/about" },
  { label: "Contacto", link: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();
  const router = useRouter();
  const backendReady = isSupabaseBrowserConfigured();

  useEffect(() => {
    if (!backendReady) return;
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (user) setUser({ email: user.email ?? "" });
    }).catch(console.error);
  }, [backendReady]);

  const handleSignOut = async () => {
    if (backendReady) await createClient().auth.signOut();
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-background border-b border-transparent"}`}>
      <div className="w-[90%] mx-auto">
        <nav className="relative flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-2xl tracking-[0.16em] text-foreground">RUA</span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">vera</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.link} href={item.link} className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === item.link ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <SearchBar />
            <Link href="/cart" className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount > 99 ? "99+" : cartCount}</span>}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted"><CircleUser size={18} /></button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user && <><DropdownMenuLabel className="text-xs text-muted-foreground font-normal truncate">{user.email}</DropdownMenuLabel><DropdownMenuSeparator /></>}
                <DropdownMenuItem asChild><Link href="/orders" className="flex items-center gap-2"><Package className="w-4 h-4" />Mis pedidos</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/favorites" className="flex items-center gap-2"><Heart className="w-4 h-4" />Favoritos</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/account" className="flex items-center gap-2"><Settings className="w-4 h-4" />Mi cuenta</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                {user ? <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2"><LogOut className="w-4 h-4" />Salir</DropdownMenuItem> : <DropdownMenuItem asChild><Link href="/login" className="flex items-center gap-2"><LogOut className="w-4 h-4" />Ingresar</Link></DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>

          <button onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menú" className="md:hidden w-9 h-9 flex items-center justify-center">{isOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </nav>
      </div>

      {isOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-sm">
        <div className="p-4 space-y-1">{navItems.map((item) => <Link key={item.link} href={item.link} onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-muted">{item.label}</Link>)}</div>
        <div className="px-4 pb-4"><SearchBar /></div>
        <div className="px-4 pb-5 flex justify-around">
          <Link href="/favorites" className="flex flex-col items-center gap-1"><Heart className="w-5 h-5" /><span className="text-[10px] uppercase">Favoritos</span></Link>
          <Link href="/cart" className="flex flex-col items-center gap-1"><ShoppingBag className="w-5 h-5" /><span className="text-[10px] uppercase">Carrito</span></Link>
          <Link href="/account" className="flex flex-col items-center gap-1"><CircleUser className="w-5 h-5" /><span className="text-[10px] uppercase">Cuenta</span></Link>
        </div>
      </div>}
    </header>
  );
};

export default Navbar;
