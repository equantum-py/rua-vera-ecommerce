'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getSubcategories, getSubcategoryProducts } from '@/lib/queries'
import { createClient } from '@/lib/supabase/client'
import { useCartStore } from '@/store/cartStore'
import ProductCard from '@/components/layout/ProductCard'
import { ProductCardProduct } from '@/types'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'

const PRODUCTS_PER_PAGE = 24

function ShopContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sort, setSort] = useState('featured')
  const categorySlug = params.get('category')
  const subSlug = params.get('sub')
  const parsedPage = Number(params.get('page') ?? 1)
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1
  const addItem = useCartStore((s) => s.addItem)

  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const selectedCategory = categories?.find((c) => c.slug === categorySlug)
  const { data: subcategories } = useQuery({ queryKey: ['subcategories', selectedCategory?.id ?? null], queryFn: () => getSubcategories(selectedCategory!.id), enabled: !!selectedCategory?.id })
  const selectedSubcategory = subcategories?.find((s) => s.slug === subSlug)
  const { data: products, isLoading } = useQuery({ queryKey: ['products', selectedSubcategory?.id ?? null], queryFn: () => getSubcategoryProducts(selectedSubcategory!.id, { onlyActive: true }), enabled: !!selectedSubcategory?.id })

  const sortedProducts = useMemo(() => {
    const list = [...(products ?? [])]
    if (sort === 'price-asc') return list.sort((a, b) => Number(a.offer_price ?? a.price ?? 0) - Number(b.offer_price ?? b.price ?? 0))
    if (sort === 'price-desc') return list.sort((a, b) => Number(b.offer_price ?? b.price ?? 0) - Number(a.offer_price ?? a.price ?? 0))
    if (sort === 'name') return list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [products, sort])

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1
  const paginatedProducts = sortedProducts.slice((safeCurrentPage - 1) * PRODUCTS_PER_PAGE, safeCurrentPage * PRODUCTS_PER_PAGE)

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>, product: ProductCardProduct) => {
    e.preventDefault(); e.stopPropagation()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    await addItem(user.id, { product_id: product.id, quantity: 1 })
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#201e1c]">
      <header className="border-b border-[#d9d2cb] px-[4%] pb-10 pt-14 md:pb-14 md:pt-20">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#6e6965]">RUA Vera · Selección</p>
        <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h1 className="font-serif text-5xl tracking-[-0.04em] md:text-7xl">{selectedSubcategory?.name ?? selectedCategory?.name ?? 'Novedades'}</h1>
          <p className="max-w-md text-sm leading-6 text-[#6e6965]">Una selección curada de moda, lifestyle y objetos de marcas con identidad.</p>
        </div>
      </header>

      <div className="sticky top-[112px] z-30 flex items-center justify-between border-b border-[#d9d2cb] bg-[#f7f4ef]/95 px-[4%] py-4 backdrop-blur">
        <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em]"><SlidersHorizontal size={14} /> Filtrar {filtersOpen ? <X size={13} /> : <span className="text-[#8f8a87]">({sortedProducts.length})</span>}</button>
        <div className="flex items-center gap-3"><span className="hidden text-[10px] uppercase tracking-[0.16em] text-[#6e6965] sm:inline">Ordenar por</span><div className="relative"><select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none bg-transparent py-1 pl-2 pr-7 text-[10px] uppercase tracking-[0.12em] outline-none"><option value="featured">Destacados</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option><option value="name">Nombre</option></select><ChevronDown size={13} className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2" /></div></div>
      </div>

      {filtersOpen && <aside className="grid border-b border-[#d9d2cb] bg-[#eee9e3] px-[4%] py-7 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-[10px] uppercase tracking-[0.18em]">Categoría</p><div className="mt-4 flex flex-col gap-2">{categories?.slice(0,6).map((category) => <button key={category.id} onClick={() => router.push(`/shop?category=${category.slug}`)} className="w-fit text-left font-serif text-lg hover:underline">{category.name}</button>)}</div></div><div><p className="text-[10px] uppercase tracking-[0.18em]">Colección</p><div className="mt-4 flex flex-col gap-2">{subcategories?.slice(0,6).map((sub) => <button key={sub.id} onClick={() => router.push(`/shop?category=${categorySlug}&sub=${sub.slug}`)} className="w-fit text-left font-serif text-lg hover:underline">{sub.name}</button>)}</div></div><div><p className="text-[10px] uppercase tracking-[0.18em]">Precio</p><p className="mt-4 text-sm text-[#6e6965]">Ordená la selección por precio desde el menú superior.</p></div><div><p className="text-[10px] uppercase tracking-[0.18em]">Disponibilidad</p><p className="mt-4 text-sm text-[#6e6965]">Productos activos disponibles en la selección RUA.</p></div></aside>}

      <section className="px-[3%] py-10 md:py-14">
        {isLoading && <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">{Array.from({ length: 8 }).map((_, i) => <div key={i}><div className="aspect-[3/4] animate-pulse bg-[#e5ddd5]"/><div className="mt-4 h-3 w-1/3 bg-[#e5ddd5]"/><div className="mt-2 h-4 w-2/3 bg-[#e5ddd5]"/></div>)}</div>}
        {!isLoading && paginatedProducts.length === 0 && <div className="mx-auto max-w-xl py-28 text-center"><p className="text-[10px] uppercase tracking-[0.22em] text-[#8f8a87]">RUA Vera</p><h2 className="mt-4 font-serif text-4xl">Esta selección estará disponible próximamente.</h2><p className="mt-4 text-sm leading-6 text-[#6e6965]">Explorá nuestras marcas o elegí otra categoría para seguir descubriendo.</p><button onClick={() => router.push('/categories')} className="mt-7 border-b border-[#201e1c] pb-1 text-[10px] uppercase tracking-[0.18em]">Ver marcas</button></div>}
        {!isLoading && paginatedProducts.length > 0 && <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-16">{paginatedProducts.map((product) => <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />)}</div>}
      </section>

      {totalPages > 1 && <div className="flex items-center justify-center gap-5 border-t border-[#d9d2cb] px-[4%] py-10 text-[10px] uppercase tracking-[0.16em]"><button disabled={safeCurrentPage === 1} onClick={() => router.push(`?${new URLSearchParams({...Object.fromEntries(params.entries()), page: String(safeCurrentPage - 1)}).toString()}`)} className="disabled:opacity-30">← Anterior</button><span>{safeCurrentPage} / {totalPages}</span><button disabled={safeCurrentPage === totalPages} onClick={() => router.push(`?${new URLSearchParams({...Object.fromEntries(params.entries()), page: String(safeCurrentPage + 1)}).toString()}`)} className="disabled:opacity-30">Siguiente →</button></div>}
    </main>
  )
}

function ShopFallback() { return <div className="min-h-screen bg-[#f7f4ef] px-[3%] py-20"><div className="h-16 w-64 animate-pulse bg-[#e5ddd5]"/><div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">{Array.from({length:8}).map((_,i)=><div key={i} className="aspect-[3/4] animate-pulse bg-[#e5ddd5]"/>)}</div></div> }

export default function ShopPage() { return <Suspense fallback={<ShopFallback />}><ShopContent /></Suspense> }
