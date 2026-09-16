import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CarouselSlider() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[#8f8a87] text-[#f5f0ea]">
      <div className="absolute inset-y-0 right-0 w-[44%] opacity-25 rua-wave" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[620px] w-[90%] items-center gap-12 py-20 md:grid-cols-[1.15fr_.85fr] md:py-28">
        <div className="max-w-3xl">
          <p className="mb-7 text-[11px] uppercase tracking-[0.32em] text-[#eee8e1]">Asunción · Paraguay</p>
          <h1 className="font-serif text-6xl font-normal leading-[0.92] tracking-[-0.04em] md:text-8xl lg:text-[7.2rem]">
            Marcas con<br />identidad
          </h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-[#eee8e1] md:text-lg">
            Una calle curada donde conviven moda, diseño y piezas con identidad. Un espacio para descubrir, conectar y vivir RUA.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="inline-flex items-center gap-3 bg-[#f5f0ea] px-7 py-4 text-xs uppercase tracking-[0.18em] text-[#292725] transition hover:bg-white">
              Descubrir RUA <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="inline-flex items-center border border-[#f5f0ea]/60 px-7 py-4 text-xs uppercase tracking-[0.18em] transition hover:bg-[#f5f0ea]/10">
              Nuestra historia
            </Link>
          </div>
        </div>

        <div className="relative hidden min-h-[430px] md:block">
          <div className="absolute right-[5%] top-[5%] h-[360px] w-[72%] border border-[#f5f0ea]/45" />
          <div className="absolute bottom-[8%] left-[3%] max-w-[310px] bg-[#e8e1da] p-8 text-[#292725]">
            <span className="font-serif text-5xl tracking-[-0.04em]">RUA <em className="text-3xl font-normal">vera</em></span>
            <div className="my-5 h-px bg-[#8f8a87]/45" />
            <p className="text-sm leading-6">Cada marca mantiene su esencia y, juntas, construyen un universo común.</p>
          </div>
          <div className="absolute right-0 top-24 font-serif text-[10rem] leading-none text-[#f5f0ea]/10">R</div>
        </div>
      </div>
    </section>
  );
}
