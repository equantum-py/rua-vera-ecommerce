'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getSubcategories, getSubcategoryProducts } from '@/lib/queries'
import { createClient } from '@/lib/supabase/client'
import { useCartStore } from '@/store/cartStore'
import ProductCard from '@/components/layout/ProductCard'
import { ProductCardProduct } from '@/types'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const PRODUCTS_PER_PAGE = 12

function ShopContent() {
  const params = useSearchParams()
  const router = useRouter()
  const categorySlug = params.get('category')
  const subSlug = params.get('sub')
  const parsedPage = Number(params.get('page') ?? 1)
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1

  const addItem = useCartStore((s) => s.addItem)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const selectedCategory = categories?.find((c) => c.slug === categorySlug)

  const { data: subcategories } = useQuery({
    queryKey: ['subcategories', selectedCategory?.id ?? null],
    queryFn: () => getSubcategories(selectedCategory!.id),
    enabled: !!selectedCategory?.id,
  })

  const selectedSubcategory = subcategories?.find((s) => s.slug === subSlug)

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedSubcategory?.id ?? null],
    queryFn: () => getSubcategoryProducts(selectedSubcategory!.id, { onlyActive: true }),
    enabled: !!selectedSubcategory?.id,
  })

  const totalPages = Math.ceil((products?.length ?? 0) / PRODUCTS_PER_PAGE)
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1
  const paginatedProducts = products?.slice(
    (safeCurrentPage - 1) * PRODUCTS_PER_PAGE,
    safeCurrentPage * PRODUCTS_PER_PAGE
  )

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString())
    newParams.set('page', String(page))
    router.push(`?${newParams.toString()}`)
  }

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductCardProduct
  ): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    await addItem(user.id, { product_id: product.id, quantity: 1 })
  }

  return (
    <div className="w-[90%] mx-auto py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          {categorySlug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/categories/${categorySlug}`}>
                  {selectedCategory?.name ?? categorySlug}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {subSlug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{selectedSubcategory?.name ?? subSlug}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          {selectedCategory?.name}
        </span>
        <div className="h-px flex-1 bg-border" />
        <h1 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">
          {selectedSubcategory?.name ?? 'Shop'}
        </h1>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs tracking-[0.2em] uppercase text-primary">
          {products?.length ?? 0} Items
        </span>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && products?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
          <ShoppingCart size={48} className="opacity-30" />
          <p className="text-lg font-medium">No products found in this subcategory</p>
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      )}

      {!isLoading && paginatedProducts && paginatedProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground tracking-wide">
            Page {safeCurrentPage} of {totalPages} — showing {paginatedProducts?.length ?? 0} of {products?.length ?? 0} products
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (safeCurrentPage > 1) goToPage(safeCurrentPage - 1)
                  }}
                  aria-disabled={safeCurrentPage === 1}
                  className={safeCurrentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const showPage =
                  page === 1 || page === totalPages || Math.abs(page - safeCurrentPage) <= 1
                const showEllipsisBefore = page === safeCurrentPage - 2 && safeCurrentPage > 3
                const showEllipsisAfter =
                  page === safeCurrentPage + 2 && safeCurrentPage < totalPages - 2

                if (showEllipsisBefore || showEllipsisAfter) {
                  return (
                    <PaginationItem key={`ellipsis-${page}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                if (!showPage) return null

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        goToPage(page)
                      }}
                      isActive={page === safeCurrentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (safeCurrentPage < totalPages) goToPage(safeCurrentPage + 1)
                  }}
                  aria-disabled={safeCurrentPage === totalPages}
                  className={safeCurrentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

function ShopFallback() {
  return (
    <div className="w-[90%] mx-auto py-8">
      <div className="h-8 w-48 rounded bg-muted animate-pulse mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopContent />
    </Suspense>
  )
}
