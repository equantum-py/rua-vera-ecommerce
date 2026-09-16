'use client'

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const sizes = ['S', 'M', 'L', 'XL'];
const colors = [{ name: 'Negro', value: '#201e1c' }, { name: 'Crudo', value: '#e9e1d8' }];

export default function DemoProductPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('Negro');
  const [error, setError] = useState(false);

  const addDemoToCart = () => {
    if (!selectedSize) { setError(true); return; }
    setError(false);
    sessionStorage.setItem('rua-demo-product', JSON.stringify({ name: 'Vestido RUA Demo', price: 590000, size: selectedSize, color: selectedColor, quantity: 1 }));
    router.push(`/demo-checkout?size=${encodeURIComponent(selectedSize)}&color=${encodeURIComponent(selectedColor)}`);
  };

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

          <div className="mt-8 border-t border-[#d9d2cb] pt-6">
            <div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.18em]">Seleccioná tu talle</p>{selectedSize && <span className="text-[10px] uppercase tracking-[0.14em] text-[#6e6965]">Seleccionado: {selectedSize}</span>}</div>
            <div className="mt-4 grid grid-cols-4 gap-2">{sizes.map((size) => <button type="button" key={size} onClick={() => {setSelectedSize(size); setError(false)}} aria-pressed={selectedSize===size} className={`relative border py-3 text-center text-xs transition ${selectedSize===size?'border-[#201e1c] bg-[#201e1c] text-white':'border-[#d9d2cb] bg-white hover:border-[#201e1c]'}`}>{size}{selectedSize===size && <Check size={12} className="absolute right-2 top-2"/>}</button>)}</div>
            {error && <p className="mt-3 text-xs font-medium text-[#8a332b]">Seleccioná un talle para continuar.</p>}
          </div>

          <div className="mt-6"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.18em]">Color</p><span className="text-[10px] text-[#6e6965]">{selectedColor}</span></div><div className="mt-3 flex gap-2">{colors.map((color)=><button type="button" key={color.name} onClick={()=>setSelectedColor(color.name)} className={`flex items-center gap-2 border px-4 py-3 text-xs transition ${selectedColor===color.name?'border-[#201e1c] bg-white':'border-[#d9d2cb]'}`}><span className="h-3 w-3 rounded-full border border-black/15" style={{backgroundColor:color.value}}/>{color.name}{selectedColor===color.name&&<Check size={12}/>}</button>)}</div></div>

          <button type="button" onClick={addDemoToCart} className="mt-8 block w-full bg-[#201e1c] py-5 text-center text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#393532]">Agregar al carrito y probar compra</button>
          <div className="mt-8 border-t border-[#d9d2cb] pt-6 text-sm leading-7 text-[#6e6965]"><p>Demo: Vestido RUA · {selectedSize ? `Talle ${selectedSize}` : 'Elegí un talle'} · Color {selectedColor}.</p><p>Podrás probar carrito, facturación, entrega/retiro y formas de pago sin realizar un cobro real.</p></div>
        </aside>
      </div>
    </main>
  );
}
