import React from 'react'
import CarouselSlider from '@/components/layout/CarouselSlider'
import { fetchProducts, isSupabaseConfigured } from '@/lib/supabase/server'
import HomeProducts from '@/components/layout/HomeProducts'
import CategoriesSection from '@/components/layout/CategoriesSection'
import Features from '@/components/layout/Features'
import Testimonials from '@/components/layout/Testimonials'
import FAQ from '@/components/layout/FAQ'
import CTABanner from '@/components/layout/CTABanner'

const Page = async (): Promise<React.ReactElement> => {
  const backendReady = isSupabaseConfigured()
  const allProducts = backendReady ? await fetchProducts() : []

  return (
    <main>
      <CarouselSlider />

      {backendReady ? (
        <>
          <div className="w-[90%] mx-auto my-5 md:my-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Explore</span>
              <div className="h-px flex-1 bg-border" />
              <h2 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">
                Categories
              </h2>
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs tracking-[0.2em] uppercase text-primary">Shop All</span>
            </div>
            <CategoriesSection />
          </div>
          <HomeProducts products={allProducts} />
        </>
      ) : (
        <section className="w-[90%] mx-auto py-16 md:py-24 text-center">
          <p className="text-xs tracking-[0.28em] uppercase text-muted-foreground mb-4">RUA Vera</p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-4">Marcas con identidad</h1>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Estamos preparando el catálogo digital de RUA. La tienda ya está en línea y el catálogo se habilitará al conectar sus datos.
          </p>
        </section>
      )}

      <Features />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </main>
  )
}

export default Page
