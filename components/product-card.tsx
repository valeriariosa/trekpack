import { Star } from "lucide-react"
import type { ScoredProduct } from "@/lib/products"

export function ProductCard({ product, showRelevance }: { product: ScoredProduct; showRelevance: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative flex aspect-square items-center justify-center bg-secondary p-6">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {showRelevance && product.relevance > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            {product.relevance}% relevante
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight text-card-foreground">{product.name}</h3>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden="true" />
            {product.rating}
          </span>
        </div>
        <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>

        <div className="mt-4 flex items-end justify-between">
          <span className="text-xl font-semibold text-foreground">${product.price}</span>
          <span className="text-xs text-muted-foreground">{product.reviews.toLocaleString("es")} reseñas</span>
        </div>
      </div>
    </article>
  )
}
