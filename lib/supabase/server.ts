import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Product, Category, Subcategory } from '@/types'

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) return null
  return { url, key }
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null
}

export async function createClient() {
  const config = getSupabaseConfig()

  if (!config) {
    throw new Error('Supabase is not configured for this environment')
  }

  const cookieStore = await cookies()

  return createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server Components cannot always persist refreshed cookies.
        }
      },
    },
  })
}

export async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return []

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        subcategory:subcategories(*),
        brand:brands(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('fetchProducts:', error.message)
      return []
    }

    return data ?? []
  } catch (error) {
    console.error('fetchProducts:', error)
    return []
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) return null

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        subcategory:subcategories(*),
        brand:brands(*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('fetchProductById:', error.message)
      return null
    }

    return data
  } catch (error) {
    console.error('fetchProductById:', error)
    return null
  }
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return []

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        subcategory:subcategories(*),
        brand:brands(*)
      `)
      .eq('is_featured', true)
      .eq('is_active', true)

    if (error) {
      console.error('fetchFeaturedProducts:', error.message)
      return []
    }

    return data ?? []
  } catch (error) {
    console.error('fetchFeaturedProducts:', error)
    return []
  }
}

export async function fetchCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return []

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('fetchCategories:', error.message)
      return []
    }

    return data ?? []
  } catch (error) {
    console.error('fetchCategories:', error)
    return []
  }
}

export async function fetchSubcategoriesByCategoryId(
  categoryId: string
): Promise<Subcategory[]> {
  if (!isSupabaseConfigured()) return []

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', categoryId)
      .order('name')

    if (error) {
      console.error('fetchSubcategoriesByCategoryId:', error.message)
      return []
    }

    return data ?? []
  } catch (error) {
    console.error('fetchSubcategoriesByCategoryId:', error)
    return []
  }
}
