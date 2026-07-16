# Selected Cases

Tres paginas reais para orientar a implementacao incremental do editor visual.

## Caso 1: pagina de conteudo com texto, imagem prevista e animacao

- Pagina: indice `5`, id `06-refeicao-como-composicao`.
- Secao: `Quando comer vira percepcao`.
- Tipo declarado: `text-image`.
- Componente principal atual: `renderStandard(slide)` em `app.js`.
- Arquivos envolvidos:
  - `data/slides.js`: objeto do slide, textos e metadados.
  - `app.js`: `renderStandard`, `renderSlide`, `goTo`, `transition11`.
  - `styles.css`: `.page-copy`, `.page-copy h1`, `.slide-lead`, responsivo.
  - `vendor/slideshow/gsap.min.js`: animacoes de transicao.
- Origem dos textos:
  - `title`, `lead`, `body`, `highlights`, `motionNote` no objeto `06-refeicao-como-composicao`.
- Origem dos assets:
  - A pagina declara `visualSlot: "labeledComposition"`, mas nenhuma imagem e renderizada hoje para este `pageType`.
  - Assets disponiveis em `assets/image/` podem ser usados em etapa futura, mas nao estao vinculados a este slide.
- Estilos:
  - Layout textual via `.page-copy`.
  - Titulo via `.page-copy h1`.
  - Lead via `.slide-lead`.
- Animacoes:
  - Entrada/saida entre slides por `transition11` quando navegada a partir do slide anterior/seguinte conforme `TRANSITION_MAP`.
  - A pagina em si nao tem animacao interna independente.
- Interacoes:
  - Navegacao global por teclado, wheel e touch em `bindKeyboard` e `bindPointerInput`.
- Propriedades atualmente fixas:
  - Posicao, largura e escala tipografica de `.page-copy`.
  - Ordem: titulo, lead, corpo.
  - Nenhum renderer especifico para `text-image`; portanto a imagem prevista nao aparece.
- Propriedades que podem receber controles sem reconstrucao:
  - `title`, `lead`, `body`.
  - `section` usado no chrome.
  - `transitionToNext`/mapa de transicao, com cuidado porque a fonte efetiva hoje e `TRANSITION_MAP`.
  - `visualSlot`, `highlights` e `motionNote` podem virar controles editoriais, mesmo sem impacto visual imediato.

## Caso 2: pagina de transicao

- Pagina: indice `7`, id `08-transicao-a-obra`.
- Secao: `A obra acontece entre elementos`.
- Tipo declarado: `red-transition`.
- Componente principal atual: `renderTransition(slide, index)` em `app.js`.
- Arquivos envolvidos:
  - `data/slides.js`: objeto do slide, texto curto e metadados.
  - `app.js`: `TRANSITION_TYPES`, `renderTransition`, `renderVerticalImageCarousel`, `renderSlide`, `updateChrome`.
  - `styles.css`: `.slide--red`, `.page-copy--transition`, `body.is-red-page`, `.transition-overlay`, `.transition-panel`.
  - `vendor/vertical-image-carousel/vertical-image-carousel.js`.
  - `vendor/vertical-image-carousel/vertical-image-carousel.css`.
- Origem dos textos:
  - `title` e `lead` do objeto `08-transicao-a-obra`.
  - `body` existe, mas `renderTransition` prioriza `lead` quando presente.
- Origem dos assets:
  - `app.js` usa `VERTICAL_CAROUSEL_IMAGES`.
  - Imagens carregadas de `assets/image/`.
  - A ordem e deslocada por `carouselImagesForSlide(index)`.
- Estilos:
  - Fundo vermelho por `.slide--red`.
  - Texto marfim por `.slide--red .page-copy h1`, `.slide--red .page-copy p`, `.slide--red .slide-lead`.
  - Composicao grande por `.page-copy--transition`.
- Animacoes:
  - Transicao de slide por `transition12` ou outro item de `TRANSITION_MAP`.
  - Carrossel vertical com `@keyframes verticalImageCarouselRotate`.
- Interacoes:
  - Navegacao global por teclado, wheel e touch.
  - O carrossel e decorativo: `pointer-events: none`.
- Propriedades atualmente fixas:
  - Paleta vermelha/marfim.
  - Imagens do carrossel globais, nao por slide.
  - Velocidade/raio/tamanho do carrossel em CSS.
  - Lead substitui o corpo na renderizacao.
- Propriedades que podem receber controles sem reconstrucao:
  - `title`, `lead`, `body`.
  - Classe/tipo `red-transition` para ativar renderer.
  - Variante do carrossel, hoje derivada de `index % 4`.
  - Lista de imagens, se futuramente for movida de constante global para configuracao do slide.

## Caso 3: pagina com carrossel/componente em sequencia

- Pagina: indice `20`, id `21-transicao-repertorio-expansao`.
- Secao: `Portfolio`.
- Tipo declarado: `red-transition`.
- Componente principal atual: `renderTransition(slide, index)` com `renderVerticalImageCarousel(slide, index)`.
- Arquivos envolvidos:
  - `data/slides.js`: objeto do slide.
  - `app.js`: `VERTICAL_CAROUSEL_IMAGES`, `carouselImagesForSlide`, `renderVerticalImageCarousel`, `renderTransition`.
  - `vendor/vertical-image-carousel/vertical-image-carousel.js`: inicializa variaveis por card.
  - `vendor/vertical-image-carousel/vertical-image-carousel.css`: layout 3D, keyframes e responsivo.
  - `assets/image/`: imagens usadas pelo carrossel.
- Origem dos textos:
  - `title: "Portfólio"` e `lead: "A linguagem em obra."` no objeto do slide.
  - `body` existe, mas nao aparece enquanto houver `lead`.
- Origem dos assets:
  - Lista fixa `VERTICAL_CAROUSEL_IMAGES` em `app.js`.
  - Arquivos de imagem em `assets/image/`.
  - Offset calculado por `(index * 3) % VERTICAL_CAROUSEL_IMAGES.length`.
- Estilos:
  - `.vertical-image-carousel`, `__scene`, `__ring`, `__card`, `__image`.
  - Variantes `.vertical-image-carousel--variant-0..3`.
  - Estados responsivos em `@media (max-width: 900px)` e `@media (max-height: 700px)`.
- Animacoes:
  - Rotacao continua do ring por `verticalImageCarouselRotate`.
  - Duracao padrao 42s, com variantes 44s, 46s e 50s.
  - Em `prefers-reduced-motion`, duracao sobe para 180s.
- Interacoes:
  - Componente nao recebe input direto.
  - Sequencia visual automatica.
  - Navegacao da apresentacao por teclado/wheel/touch.
- Propriedades atualmente fixas:
  - Lista de imagens global.
  - Quantidade de imagens igual ao tamanho de `VERTICAL_CAROUSEL_IMAGES`.
  - Perspectiva, raio, largura, duracao e direcao em CSS.
  - Offset por indice do slide.
- Propriedades que podem receber controles sem reconstrucao:
  - Selecionar conjunto/ordem de imagens por slide.
  - Duracao da rotacao por variavel CSS.
  - Variante visual.
  - `title`, `lead`, exibicao opcional do `body`.

## Comparacao visual recomendada

Sem instalar ferramentas novas:

1. Abrir `http://127.0.0.1:4174/` ou o arquivo `index.html` por `file:///`.
2. Usar resolucao desktop aproximada de `1440x900`.
3. Recarregar a pagina e comparar a tela inicial com `qa-desktop.png`.
4. Avancar ate o indice `5` com seta para baixo seis vezes para validar `06-refeicao-como-composicao`.
5. Avancar ate o indice `7` para validar `08-transicao-a-obra`.
6. Avancar ate o indice `20` para validar `21-transicao-repertorio-expansao`.
7. Conferir: chrome lateral, secao atual, texto, fundo, transicao, carrossel vertical nas paginas vermelhas e ausencia de quebras responsivas.
8. Para mobile, repetir com largura aproximada de `500px` e comparar contra `qa-mobile-500.png`.
