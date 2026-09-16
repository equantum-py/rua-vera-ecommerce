import Link from "next/link";
import { Instagram } from "lucide-react";

const shopLinks = [
  ["Novedades", "/shop"],
  ["Moda", "/shop"],
  ["Lifestyle", "/shop"],
  ["Objetos & Diseño", "/shop"],
];

const ruaLinks = [
  ["Marcas", "/categories"],
  ["Sobre RUA", "/about"],
  ["Contacto", "/contact"],
  ["Mi cuenta", "/account"],
];

export default function Footer() {
  return (
    <footer className="border-t border-[#d9d2cb] bg-[#201e1c] text-[#f7f4ef]">
      <div className="border-b border-white/15 px-[5%] py-5">
        <div className="mx-auto flex max-w-[1600px] flex-wrap justify-between gap-4 text-[10px] uppercase tracking-[0.22em] text-white/70">
          <span>Nuevas propuestas en RUA</span>
          <span>Marcas con identidad</span>
          <span>Asunción · Paraguay</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-[5%] py-16 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] md:py-20">
        <div>
          <Link href="/" className="font-serif text-4xl tracking-[-0.05em]">RUA <em className="text-xl font-normal">vera</em></Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">Una calle curada donde conviven moda, diseño, lifestyle y marcas con identidad.</p>
          <Link href="https://www.instagram.com/rua.py?stkn=bjZ6N3M0anExZ3ox" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/75 hover:text-white"><Instagram size={16} /> Instagram</Link>
        </div>

        <div><p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/45">Comprar</p><nav className="flex flex-col gap-3">{shopLinks.map(([label, href]) => <Link key={label} href={href} className="text-sm text-white/75 hover:text-white">{label}</Link>)}</nav></div>
        <div><p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/45">RUA</p><nav className="flex flex-col gap-3">{ruaLinks.map(([label, href]) => <Link key={label} href={href} className="text-sm text-white/75 hover:text-white">{label}</Link>)}</nav></div>
        <div><p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/45">Visitanos</p><p className="font-serif text-2xl">Teniente Vera</p><p className="mt-2 text-sm leading-6 text-white/55">Asunción, Paraguay</p><Link href="/contact" className="mt-6 inline-block border-b border-white/60 pb-1 text-[10px] uppercase tracking-[0.2em]">Ver contacto</Link></div>
      </div>

      <div className="border-t border-white/15 px-[5%] py-6"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-white/35 md:flex-row"><span>© {new Date().getFullYear()} RUA Vera</span><span>Asunción · Paraguay</span></div></div>
    </footer>
  );
}
