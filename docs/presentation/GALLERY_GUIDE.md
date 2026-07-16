# Guia de preenchimento das galerias

Os arquivos de dados ficam em `src/presentation-data/`.

## Imagens

Use o modelo:

```ts
type GalleryImage = {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
  credit?: string;
};
```

Recomendação de caminho para novas imagens: `public/presentation-assets/images/` ou `public/presentation-assets/projects/`.

## Projetos

Use o modelo:

```ts
type ProjectEntry = {
  id: string;
  title: string;
  year?: string;
  description?: string;
  location?: string;
  images: GalleryImage[];
};
```

Não é necessário preencher todos os campos de uma vez. Campos desconhecidos devem permanecer vazios.

## Arquivos

- `carousel-gastroperformance.ts`: imagens do carrossel da Página 3.
- `carousel-simone.ts`: imagens do carrossel da Página 4.
- `world-projects.ts`: pontos e fichas da Página 6.
- `projects-edible-sculptures.ts`: projetos da Página 7.
- `projects-tasting-installations.ts`: projetos da Página 8.
- `projects-immersive-dinners.ts`: projetos da Página 9.
