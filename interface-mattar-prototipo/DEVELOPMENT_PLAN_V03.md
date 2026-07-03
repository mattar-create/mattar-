# DEVELOPMENT_PLAN_V03

Status: aguardando aprovacao antes de qualquer implementacao de layout.
Projeto: `interface-mattar-prototipo`
Base de seguranca: `backup_before_editorial_refactor/`

## Principio de implementacao

O projeto nao sera refeito do zero. A camada editorial nova deve ser aplicada sobre o motor interativo existente: vetor/fundo animado, galeria, deck/modal, editor, orcamento editavel, transicoes e persistencia local. Os PDFs mandam no layout, escala, composicao e texto visivel; o codigo atual manda nas interacoes que ja funcionam.

## Preservar

- `backup_before_editorial_refactor/` intocado.
- Motor de scroll e variaveis visuais de `script.js`: `updateScrollState`, `setSectionVisibility`, `requestUpdate`, shape interpolation e estados de secao.
- Motor de vetor/SVG: `red-shape`, `readShapeMetrics`, `drawShape`, `interpolateShape`, `ellipsePath`, `roundedRectPath`.
- Dismiss da abertura: `dismissEntryScreen`, mas com nova pele visual baseada em `abertura.pdf`.
- Galeria publica: `renderGallery`, wheel horizontal, pointer drag, hover/focus e supressao de click apos drag.
- Deck/modal de projetos: `openDeck`, `closeDeck`, `switchDeck`, `setActiveDeck`, `lockPage`, `unlockPage`, `findDeckTarget`.
- Midia de deck: `renderMediaItem`, `externalVideoEmbed`, `setActiveMediaSlide`, `advanceMediaSlide`, `scrollActiveMediaGallery`.
- Editor de projetos inteiro, incluindo preview, upload, ranges, biblioteca de assets, rascunho, exportacao JSON e salvamento local.
- Orcamento editavel inteiro, incluindo `contenteditable`, salvar, modelos, compartilhar e exportar PDF.
- `local_editor_server.py` e seus endpoints seguros, salvo ajuste minimo se novos assets exigirem compatibilidade.
- Fontes Univers locais e SVGs de marca.

## Corrigir

- Encoding/mojibake dos textos existentes antes ou durante a troca editorial, com cuidado para nao quebrar dados JSON.
- Estrutura de secoes: passar de quatro secoes atuais para cinco cenas finais.
- Navegacao/hash: atualizar IDs e labels para as cenas finais sem perder deep-link.
- Dados de projeto: manter compatibilidade com `projects.json`, mas adicionar conteudo/asset para Urban Flora quando aprovado.
- Duplicacao/organizacao de assets de marca e novos assets vindos do Desktop.
- Ausencia de video de abertura identificado no projeto: copiar/definir holder relativo em `assets/`.
- Layout responsivo: recalibrar de acordo com PDFs 16:9 e estados mobile.
- Integracao da Proposta com `budget.html`: preservar ferramenta e conectar por link/download/modal conforme aprovado.

## Substituir

- Conteudo publico atual de `Comissionamento`, `Pesquisa`, `Produção`, `Registros` pela sequencia editorial final.
- Abertura vermelha atual por abertura clara com M mascarado e bloco de texto conforme `abertura.pdf`.
- Composicao generica de leitura atual quando conflitar com os PDFs.
- Textos de placeholder por textos visiveis finais dos PDFs/descritivo aprovado.

## Cenas finais

### 01 Abertura

Fonte: `abertura.pdf`.

- Fundo claro.
- M grande a esquerda como mascara de imagem/video.
- Titulo/subtitulo/cliente em bloco a direita.
- Preservar interacao de entrada/dismiss atual.
- Implementar video somente apos asset ser organizado em caminho relativo; se nao houver video, usar holder temporario aprovado.

### 02 Introducao

Fonte: `introdução 01.pdf` a `introdução 05.pdf`, asset `introdução 6.png`, imagens `Nova pasta (2)`.

- Foto full-bleed do instituto.
- Texto institucional pequeno no lado esquerdo.
- Linha superior e M no topo direito.
- Hover no M: revelar opacidade/imagem conforme descricao.
- Click no M: escurecer fundo e navegar pelas imagens sequenciais `Vector.png`, `Vector-1.png`, `Vector-2.png`, `Vector-3.png`, sem caminho absoluto.
- Reaproveitar logica de overlay/deck se a interacao virar modal; caso seja in-scene, reaproveitar estado CSS e funcoes de troca de midia.

### 03 Projeto / Urban Flora

Fonte: `projetos.pdf`, asset `projetos 6.png`.

- Fundo fotografico escuro.
- Titulo no topo/esquerda em Univers LT Std Oblique/Bold Oblique, 32px, line-height 125%.
- Corpo em Univers LT Std Light, 24px, line-height 125%.
- Barra vertical alinhada com a area de texto indicando passagem/leitura.
- Manter potencial de galeria/deck para projetos, mas a composicao principal segue PDF.

### 04 Narrativa

Fonte: `processo.pdf`, asset `Group 49.png`.

- Fundo claro.
- Texto alinhado ao topo/esquerda, Univers LT Std Light, 24px, line-height 125%.
- Barra vertical esquerda.
- Ilustracao/holder como pequeno filme ou imagem temporaria.
- Reaproveitar renderizacao de midia para aceitar video futuramente.

### 05 Proposta

Fonte: `comissionamento.pdf`.

- Fundo claro.
- Bloco textual principal a esquerda.
- Bloco direito com LAB MATTAR, endereco, download da proposta, thumbs de projetos e contato.
- Barra vertical vermelha a esquerda.
- Preservar e linkar `budget.html` como documento editavel/orcamentario; nao remover nem simplificar o sistema de orcamento.

## Funcoes existentes a reaproveitar

- Forma/vetor/scroll: `clamp`, `lerp`, `smoothstep`, `colorMix`, `opacityWindow`, `readShapeMetrics`, `ellipsePath`, `roundedRectPath`, `shapeToBox`, `drawShape`, `interpolateShape`, `updateScrollState`, `setSectionVisibility`, `requestUpdate`.
- Dados/midia: `normalizeMediaPath`, `normalizeProject`, `normalizeMediaItem`, `inferMediaType`, `externalVideoEmbed`, `renderMediaItem`, `loadProjects`, `fetchProjectsData`, `refreshProjectsFromDataSource`.
- Galeria/deck: `renderGallery`, `preloadDeckImages`, `buildDeckMarkup`, `applyDeckImageRatios`, `getMediaSlides`, `setActiveMediaSlide`, `syncActiveMediaPage`, `lockPage`, `unlockPage`, `setActiveDeck`, `switchDeck`, `openDeck`, `closeDeck`, `advanceMediaSlide`, `scrollActiveMediaGallery`.
- Navegacao: `scrollToSection`, `applyInitialSection`, `handleDirectionalKeys`.
- Interacao horizontal: `canGalleryScroll`, `canHorizontalScroll`, `handleGalleryWheel`, `handleHorizontalWheel`, `handleGalleryPointerDown`, `handleGalleryPointerMove`, `handleGalleryPointerEnd`, `suppressDraggedGalleryClick`.
- Editor/orcamento: preservar todas as funcoes de `editor.js` e `budget.js`, especialmente salvamento, preview, upload, contenteditable e exportacao.

## Arquivos que deverao ser alterados depois da aprovacao

- `index.html`: nova estrutura semantica das cinco cenas, mantendo pontos de montagem para galeria/deck.
- `styles.css`: tokens visuais, layouts responsivos, estados hover/click e adaptacao aos PDFs.
- `script.js`: mapear cenas, adaptar scroll/shape/deck/midia sem apagar funcoes existentes.
- `assets/data/projects.json`: adicionar/ajustar dados de Urban Flora e thumbs se necessario.
- `README.md`: atualizar documentacao apos implementacao.
- `assets/`: adicionar copias relativas dos assets externos aprovados.

## Arquivos que nao devem ser tocados sem necessidade explicita

- `backup_before_editorial_refactor/`.
- `editor.html`, `editor.css`, `editor.js`, salvo ajuste estritamente necessario para compatibilidade de dados.
- `budget.html`, `budget.css`, `budget.js`, salvo ajuste estritamente necessario para a cena Proposta.
- `local_editor_server.py`, salvo endpoint minimo para novos assets se indispensavel.
- `assets/Lab Mattar/` como biblioteca historica.
- `docs/` existentes.
- `.htaccess`, `_headers`, `.gitignore`.

## Ordem de implementacao apos aprovacao

1. Organizar assets: copiar `introdução 6.png`, `projetos 6.png`, `Group 49.png`, imagens de `Nova pasta (2)` e video/holder de abertura para subpastas relativas em `assets/editorial/`.
2. Criar tokens visuais: cores, fonte Univers Light/Oblique/Bold Oblique, medidas 16:9, barras, logo M, espacamentos de cena.
3. Preservar motor de interacao: isolar funcoes existentes, evitar remocao de deck/editor/orcamento.
4. Criar estrutura de cenas: cinco sections com IDs definitivos e fallback acessivel.
5. Aplicar layout dos PDFs: cena por cena, comparando com previews renderizadas.
6. Reintegrar interacoes: hover/click do M na Introducao, abertura com dismiss, deck/galeria/projetos e proposta/download.
7. Testar modais: abrir/fechar, Escape, setas, wheel, foco, travamento/restauracao de scroll.
8. Testar responsividade: desktop 1920x1080, laptop 1440x900, tablet, mobile; garantir sem sobreposicao.
9. Documentar tudo: atualizar README e registrar assets, decisoes e eventuais substituicoes.

## Criterios de teste

- `index.html` carrega sem erros de console.
- Nenhum caminho absoluto do Windows aparece em HTML/CSS/JS final.
- As cinco cenas aparecem na ordem correta: Abertura, Introducao, Projeto/Urban Flora, Narrativa, Proposta.
- A composicao desktop se aproxima dos PDFs em alinhamento, escala, hierarquia e cores.
- Abertura responde ao primeiro gesto como antes, sem quebrar a nova composicao.
- Hover/click no M da Introducao funciona e permite navegar imagens internas.
- Deck/modal de projetos continua abrindo e fechando por click, Escape e controles internos.
- Editor de projetos continua abrindo `editor.html`, salvando rascunho, exportando JSON e preview local.
- Orcamento continua abrindo `budget.html`, editavel por `contenteditable`, com salvar/print/compartilhar preservados.
- Scroll, hash e teclado nao brigam com modais abertos.
- Mobile nao apresenta texto sobreposto, botoes inacessiveis ou imagens cortadas de forma incoerente.
- `prefers-reduced-motion` continua reduzindo animacoes/transicoes.

## Bloqueios/decisoes para aprovacao

- Confirmar qual video de abertura usar, ou aprovar holder temporario estatico.
- Confirmar se a cena Proposta deve abrir `budget.html`, baixar PDF existente, ou ambos.
- Confirmar se o editor deve continuar focado em projetos ou tambem editar textos das cinco cenas.

Nenhuma implementacao de layout deve comecar antes da aprovacao deste plano.
