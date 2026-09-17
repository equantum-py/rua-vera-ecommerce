'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const sizes = ['S', 'M', 'L', 'XL'];
const colors = [{ name: 'Crudo', value: '#e9e1d8' }];

export default function DemoProductPage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('Crudo');
  const [error, setError] = useState(false);

  const addDemoToCart = () => {
    if (!selectedSize) { setError(true); return; }
    setError(false);
    sessionStorage.setItem('rua-demo-product', JSON.stringify({ name: 'Vestido Lino Vera', sku: 'RUA-0001', price: 590000, size: selectedSize, color: selectedColor, quantity: 1, image: '/brand/vestido-lino-vera.png' }));
    router.push(`/demo-checkout?size=${encodeURIComponent(selectedSize)}&color=${encodeURIComponent(selectedColor)}`);
  };

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#201e1c]">
      <div className="mx-auto flex w-[94%] max-w-[1500px] items-center gap-2 py-6 text-[9px] uppercase tracking-[0.16em] text-[#6e6965]">
        <Link href="/">Inicio</Link><span>/</span><Link href="/shop?category=Moda">Moda</Link><span>/</span><span className="text-[#201e1c]">Vestido Lino Vera</span>
      </div>
      <div className="mx-auto grid w-[94%] max-w-[1500px] gap-10 pb-20 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#e9e1d8]"><Image src="/brand/vestido-lino-vera.png" alt="Vestido Lino Vera" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 38vw" /></div>
          <div className="relative hidden aspect-[3/4] overflow-hidden bg-[#e9e1d8] sm:block"><Image src="/brand/vestido-lino-vera.png" alt="Detalle Vestido Lino Vera" fill className="scale-[1.12] object-cover object-center" sizes="38vw" /></div>
        </div>
        <aside className="self-start lg:sticky lg:top-36">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Paradiso</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight lg:text-5xl">Vestido Lino Vera</h1>
          <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-[#77716c]">Nueva temporada · RUA-0001</p>
          <div className="mt-6 flex items-center gap-3"><p className="text-base">Gs. 590.000</p><p className="text-sm text-[#8f8a87] line-through">Gs. 690.000</p><span className="bg-[#201e1c] px-2.5 py-1.5 text-[9px] tracking-[0.16em] text-white">-14%</span></div>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#6e6965]">Vestido de lino en tono crudo, de silueta larga y liviana. Una pieza versátil seleccionada para la nueva temporada de RUA.</p>

          <div className="mt-8 border-t border-[#d9d2cb] pt-6">
            <div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.18em]">Seleccioná tu talle</p>{selectedSize && <span className="text-[10px] uppercase tracking-[0.14em] text-[#6e6965]">Talle {selectedSize}</span>}</div>
            <div className="mt-4 grid grid-cols-4 gap-2">{sizes.map((size) => <button type="button" key={size} onClick={() => {setSelectedSize(size); setError(false)}} aria-pressed={selectedSize===size} className={`relative border py-3 text-center text-xs transition ${selectedSize===size?'border-[#201e1c] bg-[#201e1c] text-white':'border-[#d9d2cb] bg-white hover:border-[#201e1c]'}`}>{size}{selectedSize===size && <Check size={12} className="absolute right-2 top-2"/>}</button>)}</div>
            {error && <p className="mt-3 text-xs font-medium text-[#8a332b]">Seleccioná un talle para continuar.</p>}
          </div>

          <div className="mt-6"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.18em]">Color</p><span className="text-[10px] text-[#6e6965]">{selectedColor}</span></div><div className="mt-3 flex gap-2">{colors.map((color)=><button type="button" key={color.name} onClick={()=>setSelectedColor(color.name)} className="flex items-center gap-2 border border-[#201e1c] bg-white px-4 py-3 text-xs"><span className="h-3 w-3 rounded-full border border-black/15" style={{backgroundColor:color.value}}/>{color.name}<Check size={12}/></button>)}</div></div>

          <button type="button" onClick={addDemoToCart} className="mt-8 block w-full bg-[#201e1c] py-5 text-center text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#393532]">Agregar al carrito</button>
          <div className="mt-8 grid gap-4 border-t border-[#d9d2cb] pt-6 text-xs leading-6 text-[#6e6965]"><p><span className="font-semibold text-[#201e1c]">Disponibilidad:</span> En stock.</p><p><span className="font-semibold text-[#201e1c]">Entrega:</span> Envío o retiro según disponibilidad.</p><p><span className="font-semibold text-[#201e1c]">Cambios:</span> Consultá condiciones al finalizar tu compra.</p></div>
        </aside>
      </div>
    </main>
  );
}
