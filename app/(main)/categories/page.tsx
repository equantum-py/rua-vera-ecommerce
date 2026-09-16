import Link from "next/link";

const fashion = ["Paradiso", "Las Sureñas", "Lanhtropy", "Bahía María", "Heidi Clair", "Flabelus", "AT – Ati Troche", "ERNESTINA", "MAZ by RUA"];
const objects = ["ANGELO", "AYRA", "FEDORA", "TASCHEN", "VOLUSPA", "PAPELÊ"];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#201e1c]">
      <header className="border-b border-[#d9d2cb] px-[5%] py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#6e6965]">RUA Vera · Curaduría</p>
        <h1 className="mt-5 max-w-4xl font-serif text-6xl leading-[0.95] tracking-[-0.04em] md:text-8xl">Marcas con una identidad propia.</h1>
        <p className="mt-7 max-w-xl text-sm leading-7 text-[#6e6965]">RUA reúne propuestas distintas dentro de un mismo universo. Descubrí cada marca, su lenguaje y su selección.</p>
      </header>
      <section className="grid border-b border-[#d9d2cb] md:grid-cols-2">
        <div className="border-b border-[#d9d2cb] p-[6%] md:border-b-0 md:border-r"><p className="text-[10px] uppercase tracking-[0.2em] text-[#8f8a87]">Moda / Lifestyle</p><div className="mt-8 border-t border-[#d9d2cb]">{fashion.map((brand, i) => <Link key={brand} href="/shop" className="group flex items-center justify-between border-b border-[#d9d2cb] py-5"><span className="font-serif text-2xl md:text-3xl">{brand}</span><span className="text-[10px] uppercase tracking-[0.16em] opacity-0 transition group-hover:opacity-100">Descubrir →</span></Link>)}</div></div>
        <div className="p-[6%]"><p className="text-[10px] uppercase tracking-[0.2em] text-[#8f8a87]">Piezas con identidad</p><div className="mt-8 border-t border-[#d9d2cb]">{objects.map((brand) => <Link key={brand} href="/shop" className="group flex items-center justify-between border-b border-[#d9d2cb] py-5"><span className="font-serif text-2xl md:text-3xl">{brand}</span><span className="text-[10px] uppercase tracking-[0.16em] opacity-0 transition group-hover:opacity-100">Descubrir →</span></Link>)}</div></div>
      </section>
      <section className="bg-[#8f8a87] px-[5%] py-20 text-center text-white md:py-28"><p className="text-[10px] uppercase tracking-[0.22em] text-white/60">Una calle curada</p><h2 className="mx-auto mt-5 max-w-3xl font-serif text-5xl leading-tight md:text-7xl">Distintas voces. Un universo RUA.</h2><Link href="/shop" className="mt-9 inline-block bg-white px-8 py-4 text-[10px] uppercase tracking-[0.18em] text-[#201e1c]">Explorar tienda</Link></section>
    </main>
  );
}
