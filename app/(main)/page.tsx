import Link from 'next/link';
import CarouselSlider from '@/components/layout/CarouselSlider';

const moda = ['Paradiso', 'Las Sureñas', 'Lanhtropy', 'Bahía María', 'Heidi Clair', 'Flabelus', 'AT – Ati Troche', 'ERNESTINA', 'MAZ by RUA'];
const identidad = ['ANGELO', 'AYRA', 'FEDORA', 'TASCHEN', 'VOLUSPA', 'PAPELÊ'];

export default function Page() {
  return (
    <main>
      <CarouselSlider />

      <section className="mx-auto grid w-[90%] gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Qué es RUA</p>
          <h2 className="max-w-xl font-serif text-4xl leading-tight md:text-6xl">No es una tienda tradicional.</h2>
        </div>
        <div className="max-w-xl md:pt-12">
          <p className="text-lg leading-8 text-muted-foreground">Es una experiencia curada. Un espacio donde cada marca mantiene su esencia, pero forma parte de un universo común.</p>
          <p className="mt-8 font-serif text-2xl italic">descubrir — conectar — quedarse</p>
          <Link href="/about" className="mt-8 inline-block border-b border-foreground pb-1 text-xs uppercase tracking-[0.2em]">Conocer RUA</Link>
        </div>
      </section>

      <section className="bg-[#8f8a87] py-20 text-[#f5f0ea] md:py-28">
        <div className="mx-auto w-[90%]">
          <div className="mb-14 flex items-end justify-between gap-6 border-b border-[#f5f0ea]/30 pb-7">
            <div><p className="mb-3 text-[11px] uppercase tracking-[0.3em]">Hoy somos</p><h2 className="font-serif text-4xl md:text-6xl">Marcas que forman RUA</h2></div>
            <Link href="/shop" className="hidden text-xs uppercase tracking-[0.2em] md:block">Ver tienda →</Link>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            <div><p className="mb-6 text-xs uppercase tracking-[0.25em] text-[#e8e1da]">Moda / Lifestyle</p><div className="grid grid-cols-2 gap-x-8 gap-y-4 font-serif text-2xl md:text-3xl">{moda.map((brand) => <span key={brand}>{brand}</span>)}</div></div>
            <div><p className="mb-6 text-xs uppercase tracking-[0.25em] text-[#e8e1da]">Piezas con identidad</p><div className="grid grid-cols-2 gap-x-8 gap-y-4 font-serif text-2xl md:text-3xl">{identidad.map((brand) => <span key={brand}>{brand}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[90%] py-20 md:py-28">
        <p className="mb-4 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Vivir RUA</p>
        <h2 className="mx-auto mb-14 max-w-3xl text-center font-serif text-4xl md:text-6xl">Siempre hay algo nuevo por descubrir.</h2>
        <div className="grid border-y border-border md:grid-cols-3">
          {[
            ['01', 'Moda curada', 'Propuestas seleccionadas por su identidad, estética y forma de contar una historia.'],
            ['02', 'Diseño & lifestyle', 'Piezas especiales, aromas, libros y objetos que amplían el universo RUA.'],
            ['03', 'Experiencias', 'Música, encuentros, activaciones y colaboraciones que mantienen RUA en movimiento.'],
          ].map(([n,t,d]) => <article key={n} className="border-b border-border p-8 md:border-b-0 md:border-r md:last:border-r-0 md:p-10"><span className="text-xs text-muted-foreground">{n}</span><h3 className="my-5 font-serif text-3xl">{t}</h3><p className="leading-7 text-muted-foreground">{d}</p></article>)}
        </div>
      </section>

      <section className="bg-[#e8e1da] py-20 md:py-24">
        <div className="mx-auto grid w-[90%] items-end gap-10 md:grid-cols-2">
          <div><p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">El entorno</p><h2 className="font-serif text-5xl md:text-7xl">Donde la ciudad sucede.</h2></div>
          <div><p className="max-w-lg text-lg leading-8 text-muted-foreground">RUA Vera nace en una zona vibrante de Asunción, rodeada de movimiento, cafés y energía urbana. Un entorno que invita a descubrir, quedarse y disfrutar.</p><p className="mt-7 text-sm uppercase tracking-[0.16em]">Calle Teniente Vera · Asunción</p></div>
        </div>
      </section>

      <section className="mx-auto w-[90%] py-24 text-center md:py-32">
        <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Bienvenidos a RUA vera</p>
        <h2 className="mx-auto max-w-4xl font-serif text-4xl leading-tight md:text-7xl">Una calle curada donde conviven marcas con identidad.</h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-muted-foreground">No se trata solo de comprar. Se trata de descubrir. De conectar. De vivir una experiencia.</p>
        <Link href="/shop" className="mt-10 inline-block bg-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-background">Explorar la tienda</Link>
      </section>
    </main>
  );
}
