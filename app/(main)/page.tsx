import Link from "next/link";

const arrivals = [
  { brand: "ERNESTINA", name: "Selección RUA", price: "Disponible en tienda", tone: "bg-[#d8cec5]" },
  { brand: "PARADISO", name: "Nueva colección", price: "Descubrir", tone: "bg-[#c8c0b9]" },
  { brand: "LAS SUREÑAS", name: "Edición seleccionada", price: "Ver colección", tone: "bg-[#e5ddd5]" },
  { brand: "LANHTROPY", name: "New season", price: "Explorar", tone: "bg-[#b8afa8]" },
];

const brands = ["Paradiso", "Las Sureñas", "Lanhtropy", "Bahía María", "Heidi Clair", "Flabelus", "AT – Ati Troche", "ERNESTINA", "MAZ by RUA", "ANGELO", "AYRA", "FEDORA", "TASCHEN", "VOLUSPA", "PAPELÊ"];

export default function Page() {
  return (
    <main className="bg-[#f7f4ef] text-[#201e1c]">
      <section className="grid min-h-[72vh] md:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#8f8a87] px-[7%] py-20 text-white md:py-28">
          <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-white/70">RUA Vera · Asunción</p>
          <h1 className="max-w-xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:text-8xl">Nuevas formas de descubrir.</h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/75">Moda, lifestyle y objetos seleccionados de marcas con identidad propia.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/shop" className="bg-white px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-[#201e1c]">Comprar novedades</Link><Link href="/categories" className="border border-white/60 px-7 py-4 text-[10px] uppercase tracking-[0.18em] text-white">Ver marcas</Link></div>
        </div>
        <div className="relative flex min-h-[480px] items-end overflow-hidden bg-[#ded7cf] p-[7%]">
          <div className="absolute inset-[8%] border border-[#8f8a87]/40" />
          <div className="absolute right-[12%] top-[12%] font-serif text-[180px] leading-none text-[#8f8a87]/15 md:text-[260px]">R</div>
          <div className="relative z-10 max-w-sm bg-[#f7f4ef] p-8"><p className="text-[10px] uppercase tracking-[0.22em] text-[#6e6965]">Curaduría RUA</p><p className="mt-4 font-serif text-3xl">Marcas con identidad.</p><p className="mt-4 text-sm leading-6 text-[#6e6965]">Una selección que reúne diseño, moda y piezas especiales en un mismo lugar.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-[3%] py-16 md:py-24">
        <div className="mb-9 flex items-end justify-between border-b border-[#cfc7c0] pb-5"><div><p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#6e6965]">Recién llegados</p><h2 className="font-serif text-4xl md:text-5xl">Novedades</h2></div><Link href="/shop" className="text-[10px] uppercase tracking-[0.18em]">Ver todo →</Link></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-5">{arrivals.map((item, index) => <Link href="/shop" key={item.brand} className="group"><div className={`relative aspect-[3/4] overflow-hidden ${item.tone}`}><span className="absolute left-4 top-4 text-[9px] uppercase tracking-[0.2em] text-[#201e1c]/60">0{index + 1}</span><span className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-[#201e1c]/10 md:text-7xl">RUA</span><span className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#201e1c] py-3 text-center text-[9px] uppercase tracking-[0.18em] text-white transition-transform group-hover:translate-y-0">Ver producto</span></div><p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.15em]">{item.brand}</p><p className="mt-1 font-serif text-lg">{item.name}</p><p className="mt-1 text-xs text-[#6e6965]">{item.price}</p></Link>)}</div>
      </section>

      <section className="grid md:grid-cols-3">
        {[['MODA','Prendas y propuestas seleccionadas para descubrir una nueva temporada.'],['LIFESTYLE','Aromas, detalles y piezas para vivir RUA más allá de la moda.'],['OBJETOS & DISEÑO','Objetos especiales que completan una curaduría con identidad.']].map(([title,copy],i) => <Link href="/shop" key={title} className={`flex min-h-[420px] flex-col justify-end border border-[#f7f4ef]/30 p-8 text-white ${i===1?'bg-[#6e6965]':i===2?'bg-[#b4aaa2]':'bg-[#8f8a87]'}`}><span className="text-[9px] uppercase tracking-[0.22em]">0{i+1}</span><h3 className="mt-3 font-serif text-4xl">{title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-white/70">{copy}</p><span className="mt-7 text-[10px] uppercase tracking-[0.18em]">Comprar →</span></Link>)}
      </section>

      <section className="mx-auto max-w-[1600px] px-[5%] py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]"><div><p className="text-[10px] uppercase tracking-[0.22em] text-[#6e6965]">Diseñadores & marcas</p><h2 className="mt-4 font-serif text-5xl leading-none md:text-7xl">Marcas en RUA</h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#6e6965]">Cada marca conserva su lenguaje y su esencia dentro de un universo común.</p><Link href="/categories" className="mt-8 inline-block border-b border-[#201e1c] pb-1 text-[10px] uppercase tracking-[0.18em]">Descubrir todas</Link></div><div className="grid grid-cols-2 border-t border-[#cfc7c0] sm:grid-cols-3">{brands.map((brand) => <Link href="/shop" key={brand} className="border-b border-[#cfc7c0] py-5 pr-3 font-serif text-lg transition hover:pl-2 md:text-xl">{brand}</Link>)}</div></div>
      </section>

      <section className="bg-[#201e1c] px-[5%] py-20 text-center text-white md:py-28"><p className="text-[10px] uppercase tracking-[0.25em] text-white/50">The RUA edit</p><h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-7xl">No se trata solo de comprar. Se trata de descubrir.</h2><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55">Una experiencia curada donde moda, diseño y lifestyle conviven con marcas que tienen algo propio para contar.</p><Link href="/shop" className="mt-9 inline-block bg-white px-8 py-4 text-[10px] uppercase tracking-[0.18em] text-[#201e1c]">Explorar la tienda</Link></section>

      <section className="grid border-b border-[#cfc7c0] bg-[#e9e2da] md:grid-cols-2"><div className="p-[8%]"><p className="text-[10px] uppercase tracking-[0.22em] text-[#6e6965]">RUA Vera</p><h2 className="mt-4 font-serif text-5xl md:text-6xl">También sucede fuera de la pantalla.</h2></div><div className="flex flex-col justify-center border-t border-[#cfc7c0] p-[8%] md:border-l md:border-t-0"><p className="text-sm leading-7 text-[#6e6965]">Descubrí RUA en Asunción: marcas, encuentros, objetos y nuevas propuestas en un espacio pensado para quedarse.</p><p className="mt-6 text-[10px] uppercase tracking-[0.18em]">Calle Teniente Vera · Asunción</p><Link href="/contact" className="mt-7 w-fit border-b border-[#201e1c] pb-1 text-[10px] uppercase tracking-[0.18em]">Cómo llegar</Link></div></section>
    </main>
  );
}
