"use client"

import { useMemo, useState } from "react"
import { Loader2, Search, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { semanticSearch, type ScoredProduct } from "@/lib/products"

const PLACEHOLDER = "Quiero una mochila resistente al agua para viajes largos"

const SUGGESTIONS = [
  "resistente al agua para viajes largos",
  "mochila ligera para la ciudad",
  "algo con espacio para mi laptop",
  "antirrobo y segura",
]

export function SearchExperience() {
  const [query, setQuery] = useState("")
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const results = useMemo<ScoredProduct[]>(
    () => (submitted === null ? semanticSearch("") : semanticSearch(submitted)),
    [submitted],
  )

  function runSearch(value: string) {
    const term = value.trim()
    setQuery(value)
    setIsSearching(true)
    // Simulate the latency of an embedding-based semantic search
    window.setTimeout(() => {
      setSubmitted(term)
      setIsSearching(false)
    }, 650)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    runSearch(query)
  }

  function clearSearch() {
    setQuery("")
    setSubmitted(null)
  }

  const hasSearched = submitted !== null && submitted.length > 0

  return (
    <section id="buscar" className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          Búsqueda semántica
        </span>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Describe tu aventura, nosotros encontramos la mochila
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Escribe con tus propias palabras lo que necesitas. No hacen falta filtros ni categorías.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-2xl">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={PLACEHOLDER}
              aria-label="Buscar mochilas y accesorios"
              className="h-14 w-full rounded-xl border border-input bg-card pl-12 pr-11 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <Button type="submit" size="lg" className="h-14 px-8 text-base" disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Buscando
              </>
            ) : (
              "Buscar"
            )}
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Prueba:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => runSearch(s)}
              className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </form>

      <div id="resultados" className="mt-12 scroll-mt-20">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground">
            {hasSearched ? "Resultados para tu búsqueda" : "Catálogo completo"}
          </h3>
          <span className="text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "producto" : "productos"}
          </span>
        </div>

        {hasSearched && (
          <p className="mt-1 text-sm text-muted-foreground">
            Ordenado por relevancia semántica para{" "}
            <span className="font-medium text-foreground">&ldquo;{submitted}&rdquo;</span>
          </p>
        )}

        {isSearching ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-border bg-card">
                <div className="aspect-square rounded-t-2xl bg-secondary" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-2/3 rounded bg-secondary" />
                  <div className="h-3 w-full rounded bg-secondary" />
                  <div className="h-5 w-1/3 rounded bg-secondary" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} showRelevance={hasSearched} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <p className="text-foreground">No encontramos coincidencias para tu búsqueda.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Intenta describir el uso, el clima o la capacidad que necesitas.
            </p>
            <Button variant="outline" className="mt-6 bg-transparent" onClick={clearSearch}>
              Ver todo el catálogo
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
