import Link from "next/link";

export const metadata = { title: "Producto demo | RUA Vera" };

export default function DemoProductPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#201e1c]">
      <div className="mx-auto flex w-[94%] max-w-[1500px] items-center gap-2 py-6 text-[9px] uppercase tracking-[0.16em] text-[#6e6965]">
        <Link href="/">Inicio</Link><span>/</span><span>Demo de compra</span>
      </div>
      <div className="mx-auto grid w-[94%] max-w-[1500px] gap-10 pb-20 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex aspect-[3/4] items-center justify-center bg-[#d9d1c9]"><span className="font-serif text-7xl text-[#b7afa8]">RUA</span></div>
          <div className="flex aspect-[3/4] items-center justify-center bg-[#c7bfba]"><span className="font-serif text-7xl text-[#a59d98]">vera</span></div>
        </div>
        <aside className="self-start lg:sticky lg:top-36">
          <span className="inline-block bg-[#201e1c] px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-white">Producto demo</span>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em]">RUA Vera</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight lg:text-5xl">Vestido RUA Demo</h1>
          <p className="mt-5 text-base">Gs. 590.000</p>
          <p className="mt-2 text-xs text-[#6e6965]">Este producto es únicamente para probar el recorrido de compra.</p>
          <div className="mt-8 border-t border-[#d9d2cb] pt-6"><p className="text-[10px] uppercase tracking-[0.18em]">Talles disponibles</p><div className="mt-4 grid grid-cols-4 gap-2">{['S','M','L','XL'].map((s,i)=><span key={s} className={`border py-3 text-center text-xs ${i===1?'border-[#201e1c] bg-[#201e1c] text-white':'border-[#d9d2cb] bg-white'}`}>{s}</span>)}</div></div>
          <div className="mt-6"><p className="text-[10px] uppercase tracking-[0.18em]">Color</p><p className="mt-3 inline-block border border-[#201e1c] px-4 py-2 text-xs">Negro</p></div>
          <Link href="/demo-checkout" className="mt-8 block w-full bg-[#201e1c] py-5 text-center text-[10px] uppercase tracking-[0.2em] text-white">Agregar al carrito y probar compra</Link>
          <div className="mt-8 border-t border-[#d9d2cb] pt-6 text-sm leading-7 text-[#6e6965]"><p>Demo: Vestido RUA · Talle M · Color Negro.</p><p>Podrás probar carrito, facturación, entrega/retiro y formas de pago sin realizar un cobro real.</p></div>
        </aside>
      </div>
    </main>
  );
}
