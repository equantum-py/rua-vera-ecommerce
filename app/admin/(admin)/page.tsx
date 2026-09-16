import Link from "next/link";
import { ArrowUpRight, Boxes, FolderTree, ImageIcon, Package, Percent, ShoppingCart } from "lucide-react";

const stats = [
  ["Productos", "0", "Cargar catálogo", "/admin/products", Package],
  ["Categorías", "0", "Organizar tienda", "/admin/categories", FolderTree],
  ["Pedidos", "0", "Gestionar ventas", "/admin/orders", ShoppingCart],
  ["Stock bajo", "0", "Revisar inventario", "/admin/inventory", Boxes],
] as const;

const actions = [
  ["Agregar producto", "Precio, stock, talles, colores, imágenes y categorías.", "/admin/products", Package],
  ["Cambiar banners", "Gestioná hero, campañas y piezas visuales de la Home.", "/admin/banners", ImageIcon],
  ["Crear categoría", "Moda, Lifestyle, Objetos & Diseño y nuevas colecciones.", "/admin/categories", FolderTree],
  ["Crear descuento", "Porcentaje, monto fijo, vigencia y aplicación automática.", "/admin/promotions", Percent],
] as const;

export default function AdminPage() {
  return <div className="mx-auto max-w-[1500px] space-y-7">
    <section className="flex flex-col justify-between gap-5 border-b border-[#d6cfc8] pb-7 md:flex-row md:items-end"><div><p className="text-[10px] uppercase tracking-[0.22em] text-[#817a74]">Panel general</p><h1 className="mt-2 font-serif text-4xl md:text-5xl">Administrá RUA desde un solo lugar.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#706a65]">Catálogo, contenido, precios, stock, promociones, pedidos y configuración de la tienda.</p></div><Link href="/" className="flex w-fit items-center gap-2 bg-[#201e1c] px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-white">Ver tienda <ArrowUpRight className="size-3" /></Link></section>
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([title,value,copy,href,Icon])=><Link key={title} href={href} className="border border-[#d9d2cb] bg-[#fbf9f6] p-5 transition hover:-translate-y-0.5 hover:shadow-sm"><div className="flex items-start justify-between"><p className="text-xs uppercase tracking-[0.14em] text-[#756f69]">{title}</p><Icon className="size-4" /></div><p className="mt-8 font-serif text-4xl">{value}</p><p className="mt-2 text-xs text-[#817a74]">{copy} →</p></Link>)}</section>
    <section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]"><div className="border border-[#d9d2cb] bg-[#fbf9f6] p-5 md:p-7"><div className="mb-5"><p className="text-[10px] uppercase tracking-[0.2em] text-[#817a74]">Acciones rápidas</p><h2 className="mt-2 font-serif text-3xl">¿Qué querés gestionar?</h2></div><div className="grid gap-3 sm:grid-cols-2">{actions.map(([title,copy,href,Icon])=><Link href={href} key={title} className="group border border-[#ddd6cf] bg-white p-5 hover:border-[#201e1c]"><Icon className="size-5"/><h3 className="mt-6 font-medium">{title}</h3><p className="mt-2 text-xs leading-5 text-[#817a74]">{copy}</p><span className="mt-5 inline-block text-[9px] uppercase tracking-[0.16em] group-hover:underline">Abrir →</span></Link>)}</div></div><div className="bg-[#201e1c] p-6 text-white md:p-7"><p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Control de tienda</p><h2 className="mt-3 font-serif text-3xl">Todo preparado para operar.</h2><div className="mt-8 space-y-5 text-sm">{["Catálogo y variantes","Categorías y colecciones","Banners y contenido Home","Precios y descuentos","Stock e inventario","Pedidos y clientes"].map((x,i)=><div key={x} className="flex items-center justify-between border-b border-white/15 pb-4"><span>{x}</span><span className="text-[9px] uppercase tracking-[.15em] text-white/45">0{i+1}</span></div>)}</div></div></section>
  </div>;
}
