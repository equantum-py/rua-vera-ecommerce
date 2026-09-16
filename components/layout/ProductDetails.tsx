import React from 'react';
import Image from 'next/image';
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import StarRating from "@/components/ui/star-rating";

const ProductDetails = ({ product }: { product: Product | null }) => {
  if (!product) return <div className="p-10 text-center">Product not found</div>

  return (
    <div className="w-[90%] mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={
            Array.isArray(product.image_url_array) && product.image_url_array[0]?.trim()
              ? product.image_url_array[0]
              : `https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`
          }
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <Badge variant="secondary">In stock: {product.quantity}</Badge>
        </div>

        <StarRating rating={product.rating ?? 0} />

        <div className="flex items-center gap-3">
          {product.offer_price != null ? (
            <>
              <span className="text-2xl font-bold">{process.env.NEXT_PUBLIC_CURRENCY}{product.offer_price}</span>
              <span className="text-lg text-muted-foreground line-through">{process.env.NEXT_PUBLIC_CURRENCY}{product.price}</span>
            </>
          ) : (
            <span className="text-2xl font-bold">{process.env.NEXT_PUBLIC_CURRENCY}{product.price}</span>
          )}
        </div>

        {product.description && (
          <p className="text-muted-foreground">{product.description}</p>
        )}

        {product.brand && (
          <div className="text-sm text-muted-foreground">
            Brand: <span className="text-foreground">{product.brand.name}</span>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-4">
          <Button className="w-full flex items-center gap-2 py-2 hover:primary/60">
            <ShoppingCart size={18} /> Add to Cart
          </Button>
          <Button variant="outline" className="py-2">
            <Heart size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
