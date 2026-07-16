export type GalleryImage = { id: string; src: string; alt?: string; caption?: string; credit?: string; };
export type WorldProjectPoint = { id: string; city: string; country: string; coordinates: [number | null, number | null] | null; project: string; year?: string; description?: string; thumbnail?: string; images: GalleryImage[]; };
export const worldProjects: WorldProjectPoint[] = [
  { id: "sao-paulo-manifesto-como-penso-como", city: "São Paulo", country: "", coordinates: null, project: "Manifesto Como Penso Como", year: "", description: "", thumbnail: "", images: [] },
  { id: "colombia-relatos-agua", city: "", country: "Colômbia", coordinates: null, project: "Mercado clandestino de conocimiento y no-conocimiento útil: relatos colombianos en torno al agua", year: "", description: "", thumbnail: "", images: [] },
  { id: "russia-soviet-roulette", city: "", country: "Rússia", coordinates: null, project: "Soviet Roulette", year: "", description: "", thumbnail: "", images: [] },
];
