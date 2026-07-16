export type GalleryImage = { id: string; src: string; alt?: string; caption?: string; credit?: string; };
export type ProjectEntry = { id: string; title: string; year?: string; description?: string; location?: string; images: GalleryImage[]; };
export const projectsEdibleSculptures: ProjectEntry[] = [
  { id: "dadiva", title: "Dádiva", year: "", description: "", location: "", images: [] },
  { id: "nuvem-negra", title: "Nuvem Negra", year: "", description: "", location: "", images: [] },
];
