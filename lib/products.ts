export type Product = {
  id: string
  name: string
  tagline: string
  price: number
  rating: number
  reviews: number
  rank: number
  image: string
  tags: string[]
  keywords: string
}

export const products: Product[] = [
  {
    id: "summit-45",
    name: "Summit 45L",
    tagline: "Mochila de senderismo impermeable con cubierta de lluvia",
    price: 189,
    rating: 4.9,
    reviews: 1284,
    rank: 1,
    image: "/products/summit-45.png",
    tags: ["waterproof", "hiking", "large-capacity", "lightweight"],
    keywords:
      "mochila resistente al agua impermeable senderismo montaña trekking viajes largos gran capacidad expedición lluvia cubierta ligera aventura naturaleza",
  },
  {
    id: "voyager-60",
    name: "Voyager 60L",
    tagline: "Mochila de viaje de gran capacidad para expediciones largas",
    price: 229,
    rating: 4.8,
    reviews: 967,
    rank: 2,
    image: "/products/voyager-60.png",
    tags: ["large-capacity", "hiking", "waterproof"],
    keywords:
      "mochila de viaje gran capacidad viajes largos expedición semanas litros grande voluminosa cinturón de cadera resistente al agua trekking",
  },
  {
    id: "nomad-35",
    name: "Nomad 35L",
    tagline: "Mochila de cabina apertura clamshell para vuelos",
    price: 159,
    rating: 4.7,
    reviews: 812,
    rank: 3,
    image: "/products/nomad-35.png",
    tags: ["carry-on", "urban", "organization", "lightweight"],
    keywords:
      "mochila de cabina carry on avión vuelo equipaje de mano minimalista organización compartimentos ligera viaje urbano escapada",
  },
  {
    id: "daybreak-22",
    name: "Daybreak 22L",
    tagline: "Daypack urbano con funda para laptop",
    price: 89,
    rating: 4.6,
    reviews: 1543,
    rank: 4,
    image: "/products/daybreak-22.png",
    tags: ["urban", "laptop", "lightweight"],
    keywords:
      "mochila urbana diaria ciudad oficina trabajo universidad escuela funda para laptop portátil ligera sencilla minimalista",
  },
  {
    id: "cascade-duffel",
    name: "Cascade Dry 40L",
    tagline: "Bolso duffel sumergible con cierre roll-top",
    price: 139,
    rating: 4.8,
    reviews: 604,
    rank: 5,
    image: "/products/cascade-duffel.png",
    tags: ["waterproof", "large-capacity"],
    keywords:
      "bolso duffel impermeable resistente al agua sumergible seco dry roll-top kayak rafting playa lluvia gran capacidad rugoso",
  },
  {
    id: "packing-cubes",
    name: "Pack Cubes Set",
    tagline: "Set de 3 cubos organizadores de equipaje",
    price: 34,
    rating: 4.9,
    reviews: 2210,
    rank: 6,
    image: "/products/packing-cubes.png",
    tags: ["organization", "lightweight"],
    keywords:
      "cubos organizadores de equipaje organizar organización ordenar compartimentos accesorio de viaje ligero maleta mochila set de tres",
  },
  {
    id: "guardian-anti-theft",
    name: "Guardian Anti-Theft",
    tagline: "Mochila antirrobo con puerto USB para la ciudad",
    price: 119,
    rating: 4.7,
    reviews: 1876,
    rank: 7,
    image: "/products/guardian-anti-theft.png",
    tags: ["anti-theft", "urban", "laptop"],
    keywords:
      "mochila antirrobo seguridad cierres ocultos puerto usb carga ciudad urbana viaje seguro laptop portátil candado protección",
  },
  {
    id: "trail-hydration",
    name: "Trail Hydration 12L",
    tagline: "Chaleco de hidratación ultraligero para trail running",
    price: 99,
    rating: 4.8,
    reviews: 743,
    rank: 8,
    image: "/products/trail-hydration.png",
    tags: ["running", "lightweight", "hiking"],
    keywords:
      "chaleco de hidratación trail running correr ultraligero ligero bolsa de agua bladder montaña maratón carrera aventura ajustado",
  },
]

const SYNONYMS: Record<string, string[]> = {
  waterproof: ["impermeable", "resistente", "agua", "waterproof", "lluvia", "seco", "dry", "sumergible", "mojado"],
  "large-capacity": [
    "largos",
    "larga",
    "grande",
    "gran",
    "capacidad",
    "litros",
    "voluminosa",
    "expedicion",
    "expedición",
    "semanas",
    "grandes",
  ],
  lightweight: ["ligera", "liviana", "ligero", "peso", "pluma", "ultraligera", "ultraligero"],
  hiking: [
    "senderismo",
    "montaña",
    "montana",
    "trekking",
    "hiking",
    "excursion",
    "excursión",
    "aventura",
    "naturaleza",
    "camino",
  ],
  urban: ["ciudad", "urbana", "urbano", "diaria", "oficina", "trabajo", "escuela", "universidad"],
  laptop: ["laptop", "portatil", "portátil", "computadora", "notebook", "ordenador"],
  "anti-theft": ["antirrobo", "seguridad", "seguro", "robo", "candado", "protección", "proteccion"],
  "carry-on": ["cabina", "carry", "avion", "avión", "vuelo", "equipaje", "cabana"],
  organization: ["organizar", "organizacion", "organización", "cubos", "compartimentos", "ordenar", "orden"],
  running: ["correr", "running", "trail", "hidratacion", "hidratación", "maraton", "maratón", "carrera"],
}

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
}

const STOP_WORDS = new Set([
  "una",
  "un",
  "para",
  "de",
  "la",
  "el",
  "los",
  "las",
  "con",
  "que",
  "y",
  "quiero",
  "necesito",
  "busco",
  "me",
  "gustaria",
])

export type ScoredProduct = Product & { relevance: number }

export function semanticSearch(query: string): ScoredProduct[] {
  const tokens = normalize(query).filter((t) => !STOP_WORDS.has(t))

  if (tokens.length === 0) {
    return products
      .slice()
      .sort((a, b) => a.rank - b.rank)
      .map((p) => ({ ...p, relevance: 0 }))
  }

  // Map query tokens to concept weights
  const conceptWeights: Record<string, number> = {}
  const rawTerms = new Set<string>()

  for (const token of tokens) {
    rawTerms.add(token)
    for (const [concept, terms] of Object.entries(SYNONYMS)) {
      if (terms.some((term) => term.startsWith(token) || token.startsWith(term))) {
        conceptWeights[concept] = (conceptWeights[concept] ?? 0) + 1
      }
    }
  }

  const totalWeight = Object.values(conceptWeights).reduce((a, b) => a + b, 0) || 1

  const scored = products.map((product) => {
    let score = 0

    for (const [concept, weight] of Object.entries(conceptWeights)) {
      if (product.tags.includes(concept)) {
        score += weight * 3
      }
    }

    const productWords = normalize(product.keywords + " " + product.name + " " + product.tagline)
    const productWordSet = new Set(productWords)
    for (const term of rawTerms) {
      if (productWordSet.has(term)) score += 1
    }

    // Blend in intrinsic quality so ties resolve toward better products
    const qualityBoost = product.rating / 5 + (products.length - product.rank) / (products.length * 4)

    const maxConceptScore = totalWeight * 3 + rawTerms.size
    const relevance = maxConceptScore > 0 ? Math.min(99, Math.round((score / maxConceptScore) * 100)) : 0

    return { ...product, relevance, _score: score + qualityBoost }
  })

  return scored
    .filter((p) => p._score > 0)
    .sort((a, b) => b._score - a._score)
    .map(({ _score, ...rest }) => rest)
}
