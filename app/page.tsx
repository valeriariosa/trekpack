import { Backpack } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { HeroBanner } from "@/components/hero-banner"
import { SearchExperience } from "@/components/search-experience"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pb-20">
        <HeroBanner />
        <SearchExperience />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span className="flex items-center gap-2 font-semibold text-foreground">
            <Backpack className="h-4 w-4 text-primary" aria-hidden="true" />
            TrekPack
          </span>
          <span>Mochilas y accesorios de viaje · Envíos a todo el mundo</span>
        </div>
      </footer>
    </div>
  )
}
