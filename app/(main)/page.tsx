import Image from "next/image";
import Link from "next/link";

const arrivals = [
  { brand: "PARADISO", name: "Vestido Lino Vera", price: "Gs. 590.000", oldPrice: "Gs. 690.000", discount: 14, tone: "bg-[#d8cec5]", href: "/shop?category=Moda" },
  { brand: "LAS SUREÑAS", name: "Camisa Serena", price: "Gs. 420.000", oldPrice: "Gs. 490.000", discount: 14, tone: "bg-[#c8c0b9]", href: "/shop?category=Moda" },
  { brand: "LANHTROPY", name: "Pantalón Amalfi", price: "Gs. 510.000", oldPrice: "Gs. 590.000", discount: 14, tone: "bg-[#e5ddd5]", href: "/shop?category=Moda" },
  { brand: "ERNESTINA", name: "Blazer Vera", price: "Gs. 780.000", oldPrice: "Gs. 890.000", discount: 12, tone: "bg-[#b8afa8]", href: "/shop?category=Moda" },
];

const brands = ["Paradiso", "Las Sureñas", "Lanhtropy", "Bahía María", "Heidi Clair", "Flabelus", "AT – Ati Troche", "ERNESTINA", "MAZ by RUA", "ANGELO", "AYRA", "FEDORA", "TASCHEN", "VOLUSPA", "PAPELÊ"];

export default function Page() {
  return (
    <main className="bg-[#f7f4ef] text-[#201e1c]">
      <section className="grid md:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col justify-center bg-[#8f8a87] px-[7%] py-16 text-white md:min-h-[650px] md:py-24">
          <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-white/70">RUA Vera · Asunción</p>
          <h1 className="max-w-xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:text-8xl">Nuevas formas de descubrir.</h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/75">Moda, lifestyle y objetos seleccionados de marcas con identidad propia.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/shop" className="bg-white px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-[#201e1c]">Explorar productos</Link><Link href="/categories" className="border border-white/60 px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-white">Ver marcas</Link></div>
        </div>
        <Link href="/shop?category=Moda" className="group relative min-h-[430px] overflow-hidden bg-[#eee9e3] md:min-h-[650px]" aria-label="Explorar colección de moda RUA">
          <Image src="/brand/rua-banner-moda.png" alt="RUA Vera — Colección de moda" fill priority className="object-cover object-center transition duration-700 group-hover:scale-[1.015]" sizes="(max-width: 768px) 100vw, 60vw" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/35 to-transparent px-6 pb-6 pt-24 text-white md:px-9 md:pb-9"><div><p className="text-[9px] uppercase tracking-[0.24em] text-white/80">RUA Edit</p><p className="mt-2 font-serif text-2xl md:text-3xl">Descubrí la colección</p></div><span className="hidden border-b border-white pb-1 text-[9px] uppercase tracking-[0.18em] sm:block">Comprar moda →</span></div>
        </Link>
      </section>

      <section className="mx-auto max-w-[1600px] px-[3%] py-16 md:py-24">
        <div className="mb-9 flex items-end justify-between border-b border-[#cfc7c0] pb-5"><div><p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#6e6965]">Recién llegados · Catálogo demo</p><h2 className="font-serif text-4xl md:text-5xl">Novedades</h2></div><Link href="/shop" className="text-[10px] uppercase tracking-[0.18em]">Ver los 25 productos →</Link></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-5">{arrivals.map((item, index) => <Link href={item.href} key={item.name} className="group"><div className={`relative aspect-[3/4] overflow-hidden ${item.tone}`}><span className="absolute left-4 top-4 z-10 bg-[#201e1c] px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-white">-{item.discount}%</span><span className="absolute right-4 top-4 text-[9px] uppercase tracking-[0.2em] text-[#201e1c]/60">0{index + 1}</span><span className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-[#201e1c]/10 md:text-7xl">RUA</span><span className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#201e1c] py-3 text-center text-[9px] uppercase tracking-[0.18em] text-white transition-transform group-hover:translate-y-0">Ver en catálogo</span></div><p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.15em]">{item.brand}</p><p className="mt-1 font-serif text-lg">{item.name}</p><div className="mt-1 flex flex-wrap items-center gap-2 text-xs"><span>{item.price}</span><span className="text-[#8f8a87] line-through">{item.oldPrice}</span></div><span className="mt-3 inline-block border-b border-[#201e1c] pb-1 text-[9px] uppercase tracking-[0.16em]">Ver producto →</span></Link>)}</div>
      </section>

      <section className="border-y border-[#cfc7c0] bg-[#eee9e3]">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-[4%] py-16 md:grid-cols-[0.36fr_0.64fr] md:items-center md:py-24">
          <div><p className="text-[10px] uppercase tracking-[0.22em] text-[#6e6965]">Colecciones · Categorías</p><h2 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">Hoy somos RUA.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#6e6965]">Cada marca fue seleccionada por su identidad, estética y su capacidad de aportar valor al universo RUA.</p><Link href="/categories" className="mt-8 inline-block border-b border-[#201e1c] pb-1 text-[10px] uppercase tracking-[0.18em]">Explorar marcas y colecciones →</Link></div>
          <div className="border border-[#cfc7c0] bg-[#f7f4ef] p-7 md:p-10"><div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr]"><div><p className="font-serif text-4xl italic leading-none">Hoy somos</p><h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.16em]">Marcas que forman RUA</h3><p className="mt-4 text-sm leading-7 text-[#6e6965]">Moda, lifestyle y piezas con identidad, reunidas dentro de una misma curaduría.</p></div><div className="grid grid-cols-2 border-t border-[#cfc7c0] sm:grid-cols-3">{brands.map((brand) => <Link key={brand} href="/shop" className="border-b border-[#cfc7c0] py-3 pr-3 font-serif text-base transition-opacity hover:opacity-50">{brand}</Link>)}</div></div></div>
        </div>
      </section>

      <section className="grid md:grid-cols-3">{[["MODA","Prendas y propuestas seleccionadas para descubrir una nueva temporada.","/shop?category=Moda"],["LIFESTYLE","Aromas, detalles y piezas para vivir RUA más allá de la moda.","/shop?category=Lifestyle"],["OBJETOS & DISEÑO","Objetos especiales que completan una curaduría con identidad.","/shop?category=Objetos%20%26%20Dise%C3%B1o"]].map(([title,copy,href],i) => <Link href={href} key={title} className={`flex min-h-[360px] flex-col justify-end border border-[#f7f4ef]/30 p-8 text-white ${i===1?"bg-[#6e6965]":i===2?"bg-[#b4aaa2]":"bg-[#8f8a87]"}`}><span className="text-[9px] uppercase tracking-[0.22em]">0{i+1}</span><h3 className="mt-3 font-serif text-4xl">{title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{copy}</p><span className="mt-7 text-[10px] uppercase tracking-[0.18em]">Comprar →</span></Link>)}</section>

      <section className="bg-[#201e1c] px-[5%] py-20 text-center text-white md:py-28"><p className="text-[10px] uppercase tracking-[0.25em] text-white/50">The RUA edit</p><h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-7xl">No se trata solo de comprar. Se trata de descubrir.</h2><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55">Una experiencia curada donde moda, diseño y lifestyle conviven con marcas que tienen algo propio para contar.</p><Link href="/shop" className="mt-9 inline-block bg-white px-8 py-4 text-[10px] uppercase tracking-[0.18em] text-[#201e1c]">Explorar los 25 productos</Link></section>

      <section className="grid border-b border-[#cfc7c0] bg-[#e9e2da] md:grid-cols-2"><div className="p-[8%]"><p className="text-[10px] uppercase tracking-[0.22em] text-[#6e6965]">RUA Vera</p><h2 className="mt-4 font-serif text-5xl md:text-6xl">También sucede fuera de la pantalla.</h2></div><div className="flex flex-col justify-center border-t border-[#cfc7c0] p-[8%] md:border-l md:border-t-0"><p className="text-sm leading-7 text-[#6e6965]">Descubrí RUA en Asunción: marcas, encuentros, objetos y nuevas propuestas en un espacio pensado para quedarse.</p><p className="mt-6 text-[10px] uppercase tracking-[0.18em]">Calle Teniente Vera · Asunción</p><Link href="/contact" className="mt-7 w-fit border-b border-[#201e1c] pb-1 text-[10px] uppercase tracking-[0.18em]">Cómo llegar</Link></div></section>
    </main>
  );
}
