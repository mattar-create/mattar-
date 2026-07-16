export type GalleryImage = { id: string; src: string; alt?: string; caption?: string; credit?: string; };
export type ProjectEntry = { id: string; title: string; year?: string; description?: string; location?: string; images: GalleryImage[]; };
export const projectsImmersiveDinners: ProjectEntry[] = [
  { id: "urban-flora", title: "Urban Flora", year: "", description: "", location: "", images: [] },
  { id: "aleteia", title: "Aleteia", year: "", description: "", location: "", images: [] },
  { id: "poiesis", title: "Poiesis", year: "", description: "", location: "", images: [] },
  { id: "concha-y-toro", title: "Concha y Toro", year: "", description: "", location: "", images: [] },
];
