'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Heart, PackageCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const sizes = ['S', 'M', 'L', 'XL'];
const related = [
  { name: 'Camisa Serena', brand: 'Las Sureñas', price: 'Gs. 420.000', tone: '#c8c0b9' },
  { name: 'Pantalón Amalfi', brand: 'Lanhtropy', price: 'Gs. 510.000', tone: '#e5ddd5' },
  { name: 'Blazer Vera', brand: 'ERNESTINA', price: 'Gs. 780.000', tone: '#b8afa8' },
  { name: 'Top Aura', brand: 'MAZ by RUA', price: 'Gs. 290.000', tone: '#d4cbc2' },
];

export default function DemoProductPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState<string | null>('details');

  const addDemoToCart = () => {
    if (!selectedSize) { setError(true); return; }
    setError(false);
    sessionStorage.setItem('rua-demo-product', JSON.stringify({ name: 'Vestido Lino Vera', sku: 'RUA-0001', price: 590000, size: selectedSize, color: 'Crudo', quantity: 1, image: '/brand/vestido-lino-vera.png' }));
    router.push(`/demo-checkout?size=${encodeURIComponent(selectedSize)}&color=Crudo`);
  };

  const accordion = (id:string,title:string,body:React.ReactNode) => <div className="border-t border-[#d9d2cb]"><button type="button" onClick={()=>setOpen(open===id?null:id)} className="flex w-full items-center justify-between py-5 text-left text-[10px] uppercase tracking-[0.18em]"><span>{title}</span><ChevronDown size={14} className={`transition ${open===id?'rotate-180':''}`}/></button>{open===id&&<div className="pb-6 text-sm leading-7 text-[#6e6965]">{body}</div>}</div>;

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#201e1c]">
      <div className="mx-auto flex w-[94%] max-w-[1500px] items-center gap-2 py-6 text-[9px] uppercase tracking-[0.16em] text-[#6e6965]"><Link href="/">Inicio</Link><span>/</span><Link href="/shop?category=Moda">Moda</Link><span>/</span><span className="text-[#201e1c]">Vestido Lino Vera</span></div>

      <section className="mx-auto grid w-[94%] max-w-[1500px] gap-10 pb-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <div>
          <div className="relative aspect-[4/5] max-h-[760px] overflow-hidden bg-[#e9e1d8]"><Image src="/brand/vestido-lino-vera.png" alt="Vestido Lino Vera de Paradiso" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" /><span className="absolute left-5 top-5 bg-[#201e1c] px-3 py-2 text-[9px] tracking-[0.16em] text-white">-14%</span></div>
          <div className="mt-3 flex gap-3"><button className="relative h-24 w-20 overflow-hidden border border-[#201e1c] bg-[#e9e1d8]"><Image src="/brand/vestido-lino-vera.png" alt="Vista principal" fill className="object-cover" sizes="80px"/></button><div className="flex h-24 w-20 items-center justify-center border border-[#d9d2cb] bg-[#eee9e3] text-center text-[8px] uppercase tracking-[.14em] text-[#817a74]">Más fotos<br/>próximamente</div></div>
        </div>

        <aside className="self-start lg:sticky lg:top-28">
          <div className="flex items-start justify-between gap-5"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Paradiso</p><h1 className="mt-3 font-serif text-4xl leading-tight lg:text-5xl">Vestido Lino Vera</h1><p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-[#77716c]">Nueva temporada · RUA-0001</p></div><button aria-label="Agregar a favoritos" className="mt-1 border border-[#d9d2cb] p-3 transition hover:border-[#201e1c]"><Heart size={18}/></button></div>
          <div className="mt-6 flex items-center gap-3"><p className="text-lg">Gs. 590.000</p><p className="text-sm text-[#8f8a87] line-through">Gs. 690.000</p><span className="bg-[#201e1c] px-2.5 py-1.5 text-[9px] tracking-[0.16em] text-white">-14%</span></div>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[#6e6965]">Vestido de lino en tono crudo, de silueta larga y liviana. Una pieza fresca y versátil para combinar durante toda la temporada.</p>

          <div className="mt-8 border-t border-[#d9d2cb] pt-6"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.18em]">Talle</p><button className="text-[9px] uppercase tracking-[.14em] underline underline-offset-4">Guía de talles</button></div><div className="mt-4 grid grid-cols-4 gap-2">{sizes.map(size=><button type="button" key={size} onClick={()=>{setSelectedSize(size);setError(false)}} className={`relative border py-3.5 text-xs transition ${selectedSize===size?'border-[#201e1c] bg-[#201e1c] text-white':'border-[#d9d2cb] bg-white hover:border-[#201e1c]'}`}>{size}{selectedSize===size&&<Check size={12} className="absolute right-2 top-2"/>}</button>)}</div>{error&&<p className="mt-3 text-xs font-medium text-[#8a332b]">Seleccioná un talle para continuar.</p>}</div>

          <div className="mt-6"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.18em]">Color</p><span className="text-[10px] text-[#6e6965]">Crudo</span></div><div className="mt-3 inline-flex items-center gap-2 border border-[#201e1c] bg-white px-4 py-3 text-xs"><span className="h-3 w-3 rounded-full border border-black/15 bg-[#e9e1d8]"/>Crudo<Check size={12}/></div></div>

          <button type="button" onClick={addDemoToCart} className="mt-8 block w-full bg-[#201e1c] py-5 text-center text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#393532]">Agregar al carrito</button>
          <p className="mt-3 text-center text-[9px] uppercase tracking-[.14em] text-[#77716c]">Stock disponible · Compra segura</p>

          <div className="mt-8 grid grid-cols-3 border-y border-[#d9d2cb] py-5"><div className="border-r border-[#d9d2cb] px-3 text-center"><Truck size={18} className="mx-auto"/><p className="mt-2 text-[8px] uppercase tracking-[.14em]">Envíos</p></div><div className="border-r border-[#d9d2cb] px-3 text-center"><PackageCheck size={18} className="mx-auto"/><p className="mt-2 text-[8px] uppercase tracking-[.14em]">Retiro en RUA</p></div><div className="px-3 text-center"><ShieldCheck size={18} className="mx-auto"/><p className="mt-2 text-[8px] uppercase tracking-[.14em]">Compra segura</p></div></div>

          <div className="mt-4">{accordion('details','Detalles del producto',<><p>Vestido largo de lino con tirantes finos, botonadura frontal y cinturón del mismo tejido.</p><p className="mt-2">Color: Crudo · Colección: Nueva temporada · Marca: Paradiso.</p></>)}{accordion('care','Composición y cuidados',<p>Lino. Recomendamos lavado delicado y seguir las indicaciones de cuidado de la etiqueta de la prenda.</p>)}{accordion('shipping','Envíos y retiros',<p>Podés seleccionar envío o retiro durante el proceso de compra. Las opciones disponibles se muestran según tu ubicación y disponibilidad.</p>)}{accordion('changes','Cambios',<p>Los cambios están sujetos a disponibilidad y a las condiciones comerciales vigentes de RUA.</p>)}</div>
        </aside>
      </section>

      <section className="border-y border-[#d9d2cb] bg-[#eee9e3]"><div className="mx-auto grid max-w-[1500px] gap-8 px-[4%] py-12 md:grid-cols-3"><div><p className="text-[9px] uppercase tracking-[.2em] text-[#77716c]">01 · Material</p><h2 className="mt-3 font-serif text-3xl">Lino liviano</h2><p className="mt-3 max-w-sm text-sm leading-6 text-[#6e6965]">Textura natural y fresca para acompañar días cálidos y looks relajados.</p></div><div><p className="text-[9px] uppercase tracking-[.2em] text-[#77716c]">02 · Silueta</p><h2 className="mt-3 font-serif text-3xl">Largo & fluido</h2><p className="mt-3 max-w-sm text-sm leading-6 text-[#6e6965]">Cintura ajustable y caída suave para una silueta simple y elegante.</p></div><div><p className="text-[9px] uppercase tracking-[.2em] text-[#77716c]">03 · Selección RUA</p><h2 className="mt-3 font-serif text-3xl">Con identidad</h2><p className="mt-3 max-w-sm text-sm leading-6 text-[#6e6965]">Una pieza seleccionada por su versatilidad, materialidad y diseño atemporal.</p></div></div></section>

      <section className="mx-auto max-w-[1500px] px-[4%] py-16 md:py-20"><div className="mb-8 flex items-end justify-between border-b border-[#d9d2cb] pb-5"><div><p className="text-[9px] uppercase tracking-[.2em] text-[#77716c]">También te puede gustar</p><h2 className="mt-2 font-serif text-4xl">Más de Moda</h2></div><Link href="/shop?category=Moda" className="text-[9px] uppercase tracking-[.16em]">Ver toda la categoría →</Link></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">{related.map((p,i)=><Link key={p.name} href="/shop?category=Moda" className="group"><div className="relative aspect-[3/4] overflow-hidden" style={{backgroundColor:p.tone}}><span className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-[#201e1c]/10">RUA</span><span className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#201e1c] py-3 text-center text-[9px] uppercase tracking-[.16em] text-white transition group-hover:translate-y-0">Ver producto</span></div><p className="mt-3 text-[9px] font-semibold uppercase tracking-[.15em]">{p.brand}</p><h3 className="mt-1 font-serif text-lg">{p.name}</h3><p className="mt-1 text-xs">{p.price}</p></Link>)}</div></section>

      <section className="bg-[#201e1c] px-[5%] py-14 text-center text-white"><RotateCcw size={20} className="mx-auto text-white/60"/><p className="mt-4 text-[9px] uppercase tracking-[.22em] text-white/55">RUA Vera · Marcas con identidad</p><h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl md:text-4xl">Descubrí piezas seleccionadas para quedarse en tu guardarropa.</h2></section>
    </main>
  );
}
