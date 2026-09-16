"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  CircleDollarSign,
  FolderTree,
  Home,
  ImageIcon,
  LayoutDashboard,
  Package,
  Percent,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const commerce = [
  ["Resumen", "/admin", LayoutDashboard],
  ["Productos", "/admin/products", Package],
  ["Categorías", "/admin/categories", FolderTree],
  ["Inventario", "/admin/inventory", Boxes],
  ["Pedidos", "/admin/orders", ShoppingCart],
  ["Clientes", "/admin/customers", Users],
] as const;

const content = [
  ["Página de inicio", "/admin/home", Home],
  ["Banners", "/admin/banners", ImageIcon],
  ["Promociones", "/admin/promotions", Percent],
  ["Precios", "/admin/pricing", CircleDollarSign],
] as const;

const management = [
  ["Analítica", "/admin/analytics", BarChart3],
  ["Configuración", "/admin/settings", Settings],
] as const;

export default function AppSidebar() {
  const pathname = usePathname();
  const renderItems = (items: typeof commerce | typeof content | typeof management) =>
    items.map(([label, href, Icon]) => (
      <SidebarMenuItem key={href}>
        <SidebarMenuButton asChild isActive={pathname === href} tooltip={label}>
          <Link href={href} className="gap-3">
            <Icon className="size-4" />
            <span>{label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar className="border-r border-[#ded8d1]">
      <SidebarHeader className="border-b border-[#ded8d1] px-5 py-6">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center bg-[#201e1c] text-white"><ShoppingBag className="size-4" /></span>
          <span><span className="block font-serif text-xl leading-none">RUA <i className="text-sm font-normal">vera</i></span><span className="mt-1 block text-[9px] uppercase tracking-[0.22em] text-[#7b756f]">Administración</span></span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-[#f7f4ef] px-2 py-3">
        <SidebarGroup><SidebarGroupLabel className="text-[9px] uppercase tracking-[0.2em]">Comercio</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{renderItems(commerce)}</SidebarMenu></SidebarGroupContent></SidebarGroup>
        <SidebarGroup><SidebarGroupLabel className="text-[9px] uppercase tracking-[0.2em]">Contenido</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{renderItems(content)}</SidebarMenu></SidebarGroupContent></SidebarGroup>
        <SidebarGroup><SidebarGroupLabel className="text-[9px] uppercase tracking-[0.2em]">Gestión</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{renderItems(management)}</SidebarMenu></SidebarGroupContent></SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-[#ded8d1] bg-[#f7f4ef] p-4">
        <Link href="/" className="flex items-center gap-2 text-xs text-[#6e6965]"><Store className="size-4" /> Ver tienda</Link>
      </SidebarFooter>
    </Sidebar>
  );
}
