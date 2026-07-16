export type GalleryImage = { id: string; src: string; alt?: string; caption?: string; credit?: string; };
export type ProjectEntry = { id: string; title: string; year?: string; description?: string; location?: string; images: GalleryImage[]; };
export const projectsTastingInstallations: ProjectEntry[] = [
  { id: "fome-come", title: "Fome Come", year: "", description: "", location: "", images: [] },
  { id: "geluminas", title: "Gelúminas", year: "", description: "", location: "", images: [] },
  { id: "apex", title: "Apex", year: "", description: "", location: "", images: [] },
];
