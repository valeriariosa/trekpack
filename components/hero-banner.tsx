import { Star, TrendingUp } from "lucide-react"
import { products } from "@/lib/products"

export function HeroBanner() {
  const topRanked = products
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3)

  const [feature, ...rest] = topRanked

  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:pt-12">
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Feature card */}
        <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground lg:col-span-3 lg:p-10">
          <div className="relative z-10 max-w-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              Nº 1 en ventas
            </span>
            <h1 className="mt-5 text-pretty text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">
              {feature.name}
            </h1>
            <p className="mt-3 text-pretty text-base text-primary-foreground/80">{feature.tagline}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-semibold">${feature.price}</span>
              <span className="inline-flex items-center gap-1 text-sm text-primary-foreground/80">
                <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
                {feature.rating} · {feature.reviews.toLocaleString("es")} reseñas
              </span>
            </div>
          </div>
          <img
            src={feature.image || "/placeholder.svg"}
            alt={feature.name}
            className="pointer-events-none absolute -bottom-6 -right-6 h-64 w-64 object-contain drop-shadow-2xl lg:h-80 lg:w-80"
          />
        </article>

        {/* Runner-up cards */}
        <div className="grid gap-4 lg:col-span-2">
          {rest.map((product) => (
            <article
              key={product.id}
              className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-secondary">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-20 w-20 object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                  Top #{product.rank}
                </span>
                <h2 className="mt-1.5 truncate text-lg font-semibold text-card-foreground">{product.name}</h2>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">${product.price}</span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden="true" />
                    {product.rating}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
