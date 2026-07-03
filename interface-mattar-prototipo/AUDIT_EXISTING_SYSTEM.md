# AUDIT_EXISTING_SYSTEM

Data da auditoria: 2026-06-30
Projeto auditado: `C:\Users\vitor\Documents\GitHub\mattar-\interface-mattar-prototipo`
Backup congelado: `backup_before_editorial_refactor/`

## Regra de congelamento

Backup completo criado antes de qualquer alteracao de layout ou implementacao editorial. A pasta `backup_before_editorial_refactor/` contem copia dos arquivos existentes no projeto antes desta auditoria. Nenhum layout foi implementado nesta etapa.

## Acesso confirmado

### Arquivos atuais do projeto

- `index.html`: acessivel.
- `styles.css`: acessivel.
- `script.js`: acessivel.
- CSS/JS adicionais: `editor.css`, `editor.js`, `budget.css`, `budget.js` acessiveis.
- HTML adicionais: `editor.html`, `budget.html` acessiveis.
- Pasta `assets/`: acessivel.
- SVGs/vetores do M: `assets/brand/Logo-Vector.svg`, `assets/Lab Mattar/Logo-Vector.svg`, `docs/Vector.svg`, `docs/Vector 2.svg` acessiveis.
- Arquivos de modais, interacoes vetoriais e estados editaveis: `script.js`, `styles.css`, `editor.js`, `budget.js`, `local_editor_server.py` acessiveis.

### Referencias visuais finais

Todos os PDFs foram localizados em `C:\Users\vitor\Desktop\paginas` / `C:\Users\vitor\Desktop\páginas` e renderizados como previa temporaria no workspace:

- `abertura.pdf`: acessivel, 1 pagina, 1920 x 1080 pt.
- `introdução 01.pdf`: acessivel, 1 pagina, 1920 x 1080 pt.
- `introdução 02.pdf`: acessivel.
- `introdução 03.pdf`: acessivel.
- `introdução 04.pdf`: acessivel.
- `introdução 05.pdf`: acessivel.
- `projetos.pdf`: acessivel.
- `processo.pdf`: acessivel.
- `comissionamento.pdf`: acessivel.

Observacao: o Poppler gerou avisos de `Bad bounding box in Type 3 glyph` ao renderizar alguns PDFs, mas os PNGs foram gerados e puderam ser inspecionados.

### Assets de imagem externos

- `C:\Users\vitor\Desktop\introdução 6.png`: acessivel.
- `C:\Users\vitor\Desktop\projetos 6.png`: acessivel.
- `C:\Users\vitor\Desktop\Group 49.png`: acessivel.
- `C:\Users\vitor\Desktop\Nova pasta (2)\Vector.png`: acessivel.
- `C:\Users\vitor\Desktop\Nova pasta (2)\Vector-1.png`: acessivel.
- `C:\Users\vitor\Desktop\Nova pasta (2)\Vector-2.png`: acessivel.
- `C:\Users\vitor\Desktop\Nova pasta (2)\Vector-3.png`: acessivel.

Videos/holders de abertura: nao ha arquivo de video dentro do projeto atual. Foram encontrados videos soltos no Desktop (`TDMovieOut.*.mov`), mas nenhum esta identificado como holder de abertura. Classificacao: CORRIGIR na etapa de organizacao de assets, sem usar caminho absoluto no HTML final.

## Leitura visual dos PDFs

- `abertura.pdf`: fundo claro, M grande como mascara de imagem/video a esquerda, bloco tipografico a direita com `COMISSIONAMENTO` e `LAB MATTAR`.
- `introdução 01.pdf` a `introdução 05.pdf`: cena com foto full-bleed do instituto, linha horizontal superior, logo M no canto superior direito, texto institucional pequeno alinhado a esquerda; estados posteriores escurecem o fundo e revelam M grande com imagem interna.
- `projetos.pdf`: fundo fotografico escuro, texto no topo/esquerda, barra vertical esquerda, logo M no topo direito; titulo em oblique/bold oblique e corpo menor.
- `processo.pdf`: fundo claro, texto alinhado a esquerda, barra vertical, cards/frames pequenos na parte inferior com M/vetores como mascaras ou marcas.
- `comissionamento.pdf`: fundo claro, barra vertical vermelha a esquerda, bloco de texto principal a esquerda, bloco de contato/download/projetos a direita, logo M vermelho no topo direito.

## Classificacao por subsistema

| Parte | Arquivos | Classificacao | Motivo |
| --- | --- | --- | --- |
| Backup de congelamento | `backup_before_editorial_refactor/` | PRESERVAR | Deve permanecer intocado como snapshot do estado anterior. |
| Estrutura principal HTML | `index.html` | CORRIGIR | Contem o esqueleto publico e pontos de montagem validos, mas as quatro secoes atuais nao correspondem as cinco cenas dos PDFs. Tambem ha textos com encoding quebrado. |
| Motor visual vetorial de fundo | `index.html`, `styles.css`, `script.js` (`red-shape`, `shape-layer`, `readShapeMetrics`, `drawShape`, `interpolateShape`, `updateScrollState`) | PRESERVAR | E o principal motor interativo existente: transforma formas, controla progresso por scroll e gera atmosfera visual. Deve ser adaptado as cenas novas, nao apagado. |
| Tela de entrada atual | `entry-screen` em `index.html`, `styles.css`, `dismissEntryScreen` em `script.js` | CORRIGIR | A logica de dismiss por pointer/click/wheel/teclado e util; a composicao vermelha atual sera substituida pela abertura do PDF com M mascarado. |
| Campos de cor e atmosfera | `color-field`, `paper-counterform`, `brand-atmosphere` em `styles.css` | CORRIGIR | Ha potencial visual, mas os PDFs pedem composicoes mais contidas. Manter apenas quando servir ao layout, reduzir quando conflitar. |
| Navegacao lateral atual | `section-rail`, `scrollToSection`, `applyInitialSection`, hashchange | CORRIGIR | O mecanismo de navegacao por hash e util; a UI com quatro itens nao corresponde as cenas finais. |
| Secoes publicas atuais | `comissionamento`, `pesquisa`, `producao`, `registros` em `index.html` | SUBSTITUIR | O conteudo editorial final muda para `Abertura`, `Introdução`, `Projeto / Urban Flora`, `Narrativa`, `Proposta`. |
| Galeria horizontal | `.gallery`, `renderGallery`, `handleGalleryWheel`, `handleGalleryPointerDown/Move/End`, `suppressDraggedGalleryClick` | PRESERVAR | Interacao forte ja implementada: wheel horizontal, drag pointer, scroll snap, hover/focus. Pode ser reaproveitada em Projetos ou em chamadas de Proposta. |
| Overlay/deck de projeto | `.deck-overlay`, `buildDeckMarkup`, `openDeck`, `closeDeck`, `switchDeck`, `setActiveDeck`, `findDeckTarget`, `lockPage`, `unlockPage` | PRESERVAR | Equivale aos modais/expansoes existentes. Nao deve ser removido; pode receber novo conteudo e nova pele editorial. |
| Slides internos de midia | `getMediaSlides`, `setActiveMediaSlide`, `advanceMediaSlide`, `scrollActiveMediaGallery`, `.media-gallery`, `.media-card` | PRESERVAR | Resolve navegacao de imagens, wheel e teclado dentro dos modais. Deve continuar funcionando. |
| Carregamento de projetos | `assets/data/projects.json`, `loadProjects`, `fetchProjectsData`, `refreshProjectsFromDataSource`, `normalizeProject` | PRESERVAR | Permite conteudo editavel e preview via localStorage. Deve ser mantido para nao quebrar o editor. |
| Modelo atual de dados de projeto | `assets/data/projects.json` | CORRIGIR | Hoje contem apenas DADIVA e layout especifico. Precisa aceitar Urban Flora e possivelmente cenas/editorial, mantendo compatibilidade. |
| Normalizacao de midia | `normalizeMediaPath`, `inferMediaType`, `externalVideoEmbed`, `renderMediaItem` | PRESERVAR | Importante para imagens, videos locais e embeds externos sem caminhos absolutos. |
| Tipografia local | `assets/fonts/*.otf`, `@font-face` em `styles.css`, pacote Univers em `assets/Lab Mattar/...` | PRESERVAR | Os PDFs dependem de Univers LT Std, inclusive Oblique/Bold Oblique disponiveis no pacote de marca. |
| CSS responsivo e reduced motion | `styles.css` media queries, `prefers-reduced-motion` | PRESERVAR | Ja ha cuidado com telas menores e movimento reduzido. Deve ser testado de novo nas cinco cenas. |
| Estilos de deck especificos da DADIVA | `styles.css` seletores `[data-project-id="dadiva"]` | CORRIGIR | Sao uteis como prova de customizacao por projeto, mas nao podem ditar Urban Flora ou as cenas finais. |
| Editor de projetos | `editor.html`, `editor.css`, `editor.js` | PRESERVAR | E um sistema editavel existente com preview, upload, ajuste de grid, rascunho, exportacao e salvamento local. Nao remover. |
| Preview do editor | `renderPreview`, `.preview-frame`, `data-action="toggle-grid"` | PRESERVAR | Ajuda a validar composicao sem mexer direto no site final. Pode precisar apenas de compatibilidade com novos campos. |
| Editor de assets | `renderAssetLibrary`, `handleCoverFile`, `handleGalleryFiles`, `addGalleryAsset`, `addSuggestedGalleryAssets` | PRESERVAR | Essencial para manter imagens e galerias editaveis. |
| Servidor local | `local_editor_server.py` | PRESERVAR | Tem `safe_path` e endpoints para salvar projetos/orcamentos dentro do projeto. Nao alterar salvo se novos assets exigirem endpoint compativel. |
| Sistema de orcamento | `budget.html`, `budget.css`, `budget.js`, `assets/data/budget-document.json`, `budget-models.json` | PRESERVAR | Contem estados editaveis por `contenteditable`, biblioteca/modelos, salvar, compartilhar e exportar PDF. O pedido diz para nao remover modais/estados editaveis. |
| Conteudo orcamentario na cena Proposta | `budget.*`, `comissionamento.pdf` | CORRIGIR | A cena Proposta deve linkar/baixar proposta e talvez integrar com `budget.html`, mas sem apagar a ferramenta editavel. |
| Assets duplicados de marca | `assets/brand/Logo-Vector.svg`, `assets/Lab Mattar/Logo-Vector.svg`, `docs/Vector*.svg` | CORRIGIR | Ha duplicacao util para referencia, mas o HTML final deve usar caminhos relativos organizados e uma fonte clara de verdade. |
| Assets historicos em `assets/Lab Mattar/` | varios PNG/PDF/fontes | PRESERVAR | Biblioteca rica de material visual. Nao limpar. Usar apenas assets necessarios no layout final. |
| Textos com caracteres quebrados | `index.html`, `README.md`, `editor.html`, `budget.html`, JSONs exibidos no console | CORRIGIR | Ha mojibake (`Navega??o`, `OrÃ§amento`, etc.). Deve ser corrigido em etapa controlada para preservar Portugues correto. |
| Caminhos absolutos externos | Assets citados no pedido no Desktop | CORRIGIR | Devem ser copiados/organizados em `assets/` antes de uso. O HTML final nao deve apontar para caminhos Windows. |
| Layout atual como landing/narrativa generica | `index.html`, `styles.css` | SUBSTITUIR | A estrutura editorial final deve seguir PDFs. Nao virar landing page generica. |

## Interacoes e comportamentos identificados

- Dismiss da entrada por `pointerdown`, `click`, `wheel`, `touchmove` e `keydown`.
- Scroll global atualiza CSS vars: `--scroll-progress`, `--scroll-unit`, `--shape-*`, `--section-opacity` e estado `body[data-section]`.
- Vetor/fundo animado via SVG path `#red-shape`, interpolacao de formas e campos cromaticos.
- Navegacao por hash e links `data-target-section`.
- Galeria carregada dinamicamente de JSON, com hover/focus, wheel horizontal, pointer drag e supressao de click apos drag.
- Deck/modal expandido com `aria-hidden`, foco, travamento de pagina, `Escape`, setas de teclado, botoes proximo/anterior e restauracao de scroll.
- Galeria interna de midia com uma imagem ativa por vez e wheel/teclado.
- Editor de projetos com ranges de grid, upload de capa/galeria, biblioteca de assets, preview e grid toggle.
- Persistencia local via `localStorage` para preview e rascunhos.
- Servidor local com endpoints `save-projects`, `write-file`, `save-budget-document`, `create-budget-document` e `budget-documents`.
- Orcamento editavel por `contenteditable`, controles inline, biblioteca de modelos, compartilhamento por hash e exportacao via print/PDF.

## Pendencias antes de implementar

- Definir qual video de abertura deve entrar na mascara M, ou confirmar uso temporario de imagem holder.
- Copiar assets externos do Desktop para uma pasta relativa do projeto antes de referenciar no HTML/CSS/JS.
- Validar se o editor de projetos deve editar apenas os modais/projetos ou tambem textos das cinco cenas.
- Corrigir encoding em etapa propria, com teste visual, para nao piorar textos existentes.
- Decidir como integrar `budget.html` a cena Proposta: link/download, modal, ou chamada externa preservando a ferramenta.


## Inventario de arquivos auditados

- .gitignore
- .htaccess
- _headers
- assets/brand/Logo-Vector.svg
- assets/brand/mattar-footer-ref.png
- assets/brand/mattar-mark-ref.png
- assets/covers/concha-cover.png
- assets/covers/concreto-cover.png
- assets/covers/dadiva-cover.png
- assets/covers/fome-come-cover.png
- assets/covers/geluminia-cover.png
- assets/covers/mulher-vida-liberdade-cover.png
- assets/covers/soviet-cover.png
- assets/data/boticario-gastroperformance.json
- assets/data/budget-document.json
- assets/data/budget-models.json
- assets/data/projects.json
- assets/fonts/UniversLTStd.otf
- assets/fonts/UniversLTStd-Bold.otf
- assets/fonts/UniversLTStd-Light.otf
- assets/Lab Mattar/Carta Orçamentária/Slide 16_9 - 7.pdf
- assets/Lab Mattar/Carta Orçamentária/Slide 16_9 - 8.pdf
- assets/Lab Mattar/Carta Orçamentária/Slide 16_9 - 9.pdf
- assets/Lab Mattar/imagens/CAPAS/CONCHA Y ROTO (2).png
- assets/Lab Mattar/imagens/CAPAS/Frame 935827.png
- assets/Lab Mattar/imagens/CAPAS/Frame 935827-1.png
- assets/Lab Mattar/imagens/CAPAS/Frame 935827-2.png
- assets/Lab Mattar/imagens/CAPAS/Frame 935827-3.png
- assets/Lab Mattar/imagens/CAPAS/Frame 935827-4.png
- assets/Lab Mattar/imagens/CAPAS/Frame 935827-5.png
- assets/Lab Mattar/imagens/PROJETOS/CONCHA Y ROTO (1).png
- assets/Lab Mattar/imagens/PROJETOS/CONCRETO (1).png
- assets/Lab Mattar/imagens/PROJETOS/CONCRETO (2).png
- assets/Lab Mattar/imagens/PROJETOS/CONCRETO (3).png
- assets/Lab Mattar/imagens/PROJETOS/DADIVA (1).png
- assets/Lab Mattar/imagens/PROJETOS/DADIVA (2).png
- assets/Lab Mattar/imagens/PROJETOS/DADIVA (3).png
- assets/Lab Mattar/imagens/PROJETOS/DADIVA (4).png
- assets/Lab Mattar/imagens/PROJETOS/DADIVA (5).png
- assets/Lab Mattar/imagens/PROJETOS/FOME COME (1).png
- assets/Lab Mattar/imagens/PROJETOS/FOME COME (2).png
- assets/Lab Mattar/imagens/PROJETOS/FOME COME (3).png
- assets/Lab Mattar/imagens/PROJETOS/FOME COME (4).png
- assets/Lab Mattar/imagens/PROJETOS/FOME COME (5).png
- assets/Lab Mattar/imagens/PROJETOS/GELUMINAS (1).png
- assets/Lab Mattar/imagens/PROJETOS/GELUMINAS (2).png
- assets/Lab Mattar/imagens/PROJETOS/GELUMINAS (3).png
- assets/Lab Mattar/imagens/PROJETOS/GELUMINAS (4).png
- assets/Lab Mattar/imagens/PROJETOS/GELUMINAS (5).png
- assets/Lab Mattar/imagens/PROJETOS/SOVIET (1).png
- assets/Lab Mattar/imagens/PROJETOS/SOVIET (2).png
- assets/Lab Mattar/imagens/textos/chernobil-macas-texto.png
- assets/Lab Mattar/imagens/textos/Concha y Toro.png
- assets/Lab Mattar/imagens/textos/Concreto Efêmero (2017).png
- assets/Lab Mattar/imagens/textos/concreto-efemero-texto.png
- assets/Lab Mattar/imagens/textos/DÁDIVA (2022).png
- assets/Lab Mattar/imagens/textos/dadiva-texto.png
- assets/Lab Mattar/imagens/textos/don-melchor-texto.png
- assets/Lab Mattar/imagens/textos/Fome Come (2012).png
- assets/Lab Mattar/imagens/textos/fome-come-descricao.png
- assets/Lab Mattar/imagens/textos/fome-come-texto.png
- assets/Lab Mattar/imagens/textos/Gelúminas (2017).png
- assets/Lab Mattar/imagens/textos/geluminas-texto.png
- assets/Lab Mattar/imagens/textos/imageye___-_imgi_2_Concha-Y-Toro-Simone-Copiar-06.00_00_22_25.Quadro016-scaled 1.png
- assets/Lab Mattar/imagens/textos/imageye___-_imgi_3_Concha-Y-Toro-Simone-Copiar-06.00_00_30_28.Quadro024-scaled 1.png
- assets/Lab Mattar/imagens/textos/imageye___-_imgi_4_Concha-Y-Toro-Simone-Copiar-06.00_00_45_18.Quadro027-scaled 1.png
- assets/Lab Mattar/imagens/textos/Mulher, Vida, Liberdade (2025).png
- assets/Lab Mattar/imagens/textos/mulher-vida-liberdade-texto.png
- assets/Lab Mattar/imagens/textos/Rectangle 1.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-1.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-10.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-11.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-12.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-13.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-14.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-15.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-2.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-3.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-4.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-5.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-6.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-7.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-8.png
- assets/Lab Mattar/imagens/textos/Rectangle 1-9.png
- assets/Lab Mattar/imagens/textos/Soviet Roulette (2012).png
- assets/Lab Mattar/Logo-Vector.svg
- assets/Lab Mattar/PÁGINAS/CONCHA Y TORO.png
- assets/Lab Mattar/PÁGINAS/CONCRETO.png
- assets/Lab Mattar/PÁGINAS/CONCRETO-1.png
- assets/Lab Mattar/PÁGINAS/CONCRETO-2.png
- assets/Lab Mattar/PÁGINAS/CONCRETO-3.png
- assets/Lab Mattar/PÁGINAS/DADIVA.png
- assets/Lab Mattar/PÁGINAS/DADIVA-1.png
- assets/Lab Mattar/PÁGINAS/FOME COME.png
- assets/Lab Mattar/PÁGINAS/FOME COME-1.png
- assets/Lab Mattar/PÁGINAS/GELUMINIA.png
- assets/Lab Mattar/PÁGINAS/GELUMINIA-1.png
- assets/Lab Mattar/PÁGINAS/GELUMINIA-2.png
- assets/Lab Mattar/PÁGINAS/GELUMINIA-3.png
- assets/Lab Mattar/PÁGINAS/GELUMINIA-4.png
- assets/Lab Mattar/PÁGINAS/MULHER, VIDA, LIBERDADE.png
- assets/Lab Mattar/PÁGINAS/MULHER, VIDA, LIBERDADE-1.png
- assets/Lab Mattar/PÁGINAS/Nova/CONCHA Y TORO.png
- assets/Lab Mattar/PÁGINAS/Nova/CONCRETO.png
- assets/Lab Mattar/PÁGINAS/Nova/CONCRETO-1.png
- assets/Lab Mattar/PÁGINAS/Nova/CONCRETO-2.png
- assets/Lab Mattar/PÁGINAS/Nova/CONCRETO-3.png
- assets/Lab Mattar/PÁGINAS/Nova/DADIVA.png
- assets/Lab Mattar/PÁGINAS/Nova/DADIVA-1.png
- assets/Lab Mattar/PÁGINAS/Nova/FOME COME.png
- assets/Lab Mattar/PÁGINAS/Nova/FOME COME-1.png
- assets/Lab Mattar/PÁGINAS/Nova/GELUMINIA.png
- assets/Lab Mattar/PÁGINAS/Nova/GELUMINIA-1.png
- assets/Lab Mattar/PÁGINAS/Nova/GELUMINIA-2.png
- assets/Lab Mattar/PÁGINAS/Nova/GELUMINIA-3.png
- assets/Lab Mattar/PÁGINAS/Nova/GELUMINIA-4.png
- assets/Lab Mattar/PÁGINAS/Nova/MULHER, VIDA, LIBERDADE.png
- assets/Lab Mattar/PÁGINAS/Nova/MULHER, VIDA, LIBERDADE-1.png
- assets/Lab Mattar/PÁGINAS/Nova/SOVIET.png
- assets/Lab Mattar/PÁGINAS/Nova/SOVIET-1.png
- assets/Lab Mattar/PÁGINAS/Nova/SOVIET-2.png
- assets/Lab Mattar/PÁGINAS/SOVIET.png
- assets/Lab Mattar/PÁGINAS/SOVIET-1.png
- assets/Lab Mattar/PÁGINAS/SOVIET-2.png
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-Black.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-BlackEx.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-BlackExObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-BlackObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-Bold.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-BoldCn.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-BoldCnObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-BoldEx.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-BoldExObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-BoldObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-Cn.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-CnObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-Ex.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-ExObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-Light.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-LightCn.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-LightCnObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-LightObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-LightUltraCn.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-Obl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-ThinUltraCn.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-UltraCn.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-XBlack.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-XBlackEx.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-XBlackExObl.otf
- assets/Lab Mattar/Recursos da Marca/03_Tipografia/univers-lt/UniversLTStd-XBlackObl.otf
- assets/Lab Mattar/Recursos da Marca/05_Fotos/Frame 935822.png
- assets/Lab Mattar/Recursos da Marca/05_Fotos/Frame 935830.png
- assets/Lab Mattar/Recursos da Marca/05_Fotos/Frame 935833.png
- assets/Lab Mattar/Recursos da Marca/05_Fotos/Frame 935886.png
- assets/pages/CONCHA Y TORO.png
- assets/pages/concha-info.png
- assets/pages/CONCRETO.png
- assets/pages/CONCRETO-1.png
- assets/pages/CONCRETO-2.png
- assets/pages/CONCRETO-3.png
- assets/pages/concreto-images-1.png
- assets/pages/concreto-images-2.png
- assets/pages/concreto-images-3.png
- assets/pages/concreto-info.png
- assets/pages/DADIVA.png
- assets/pages/DADIVA-1.png
- assets/pages/dadiva-images-1.png
- assets/pages/dadiva-info.png
- assets/pages/FOME COME.png
- assets/pages/FOME COME-1.png
- assets/pages/fome-come-images-1.png
- assets/pages/fome-come-info.png
- assets/pages/GELUMINIA.png
- assets/pages/GELUMINIA-1.png
- assets/pages/GELUMINIA-2.png
- assets/pages/GELUMINIA-3.png
- assets/pages/GELUMINIA-4.png
- assets/pages/geluminia-images-1.png
- assets/pages/geluminia-images-2.png
- assets/pages/geluminia-images-3.png
- assets/pages/geluminia-images-4.png
- assets/pages/geluminia-info.png
- assets/pages/MULHER, VIDA, LIBERDADE.png
- assets/pages/MULHER, VIDA, LIBERDADE-1.png
- assets/pages/mulher-vida-liberdade-images-1.png
- assets/pages/mulher-vida-liberdade-info.png
- assets/pages/SOVIET.png
- assets/pages/SOVIET-1.png
- assets/pages/SOVIET-2.png
- assets/pages/soviet-images-1.png
- assets/pages/soviet-images-2.png
- assets/pages/soviet-info.png
- assets/photos/deck-01.png
- assets/photos/deck-02.png
- assets/photos/deck-03.png
- assets/photos/entry-cover.png
- assets/photos/photo-01.png
- assets/photos/photo-02.png
- assets/photos/photo-03.png
- assets/project-media/concha-1.png
- assets/project-media/concha-2.png
- assets/project-media/concha-cover.png
- assets/project-media/concreto-1.png
- assets/project-media/concreto-2.png
- assets/project-media/concreto-3.png
- assets/project-media/concreto-capa.png
- assets/project-media/dadiva-1.png
- assets/project-media/dadiva-2.png
- assets/project-media/dadiva-capa.png
- assets/project-media/fome-01.png
- assets/project-media/fome-02.png
- assets/project-media/fome-03.png
- assets/project-media/fome-04.png
- assets/project-media/fome-capa.png
- assets/project-media/gelu-02.png
- assets/project-media/gelu-03.png
- assets/project-media/gelu-04.png
- assets/project-media/gelu-05.png
- assets/project-media/geluminas-cover.png
- assets/project-media/soviet-1.png
- assets/project-media/soviet-capa.png
- assets/project-media/soviet-link.png
- assets/visual-01.png
- assets/visual-02.png
- assets/visual-03.png
- assets/visual-04.png
- budget.css
- budget.html
- budget.js
- cover-candidates.png
- docs/Slide 16_9 - 7.pdf
- docs/Slide 16_9 - 8.pdf
- docs/Slide 16_9 - 9.pdf
- docs/Vector 2.svg
- docs/Vector.svg
- editor.css
- editor.html
- editor.js
- index.html
- local_editor_server.py
- README.md
- review-gallery-fixed.png
- script.js
- styles.css

## Funcoes JS existentes

- budget.js:139 - `function clone(value) {`
- budget.js:143 - `function normalizeDocumentPath(value = DATA_PATH) {`
- budget.js:156 - `function documentStorageKey(path) {`
- budget.js:160 - `function slugify(value) {`
- budget.js:170 - `function storedLibraryFallback() {`
- budget.js:174 - `function loadStoredLibrary() {`
- budget.js:192 - `function saveStoredLibrary(library) {`
- budget.js:202 - `function modelInfoFromDocument(document, path = documentDataPath) {`
- budget.js:220 - `function uniqueModelPath(baseSlug) {`
- budget.js:238 - `function setCurrentDocumentPath(path) {`
- budget.js:248 - `function setStatus(message) {`
- budget.js:256 - `function escapeHtml(value = "") {`
- budget.js:264 - `function richText(value = "") {`
- budget.js:268 - `function plainTextFromEditable(el) {`
- budget.js:272 - `function dataToHash(data) {`
- budget.js:276 - `function dataFromHash() {`
- budget.js:285 - `async function loadDefaultData() {`
- budget.js:301 - `function setPath(path, value) {`
- budget.js:311 - `function syncFromDom() {`
- budget.js:318 - `function setPdfTitle() {`
- budget.js:326 - `function editable(path, value, tag = "span", className = "") {`
- budget.js:330 - `function renderHeader() {`
- budget.js:338 - `function renderDetails() {`
- budget.js:349 - `function renderBankingDetails() {`
- budget.js:360 - `function renderCommissioningParagraphs() {`
- budget.js:371 - `function renderApprovalFields() {`
- budget.js:384 - `function renderTopics(sectionName) {`
- budget.js:397 - `function renderTopicControls(sectionName) {`
- budget.js:407 - `function render() {`
- budget.js:457 - `function updatePageScale() {`
- budget.js:463 - `async function apiPost(path, body) {`
- budget.js:478 - `function documentLabel(documentInfo) {`
- budget.js:484 - `function renderDocumentLibrary() {`
- budget.js:505 - `async function loadDocumentLibrary() {`
- budget.js:553 - `function navigateToDocument(path) {`
- budget.js:560 - `async function openDocument(path) {`
- budget.js:570 - `function saveBrowserDraft(message = "Documento salvo neste navegador.") {`
- budget.js:576 - `async function saveBudgetDocument(options = {}) {`
- budget.js:614 - `async function saveModel() {`
- budget.js:684 - `function scheduleAutosave() {`
- budget.js:691 - `function generateShareLink() {`
- budget.js:700 - `async function resetModel() {`
- budget.js:710 - `function addTopic(section, index = selectedTopic.section === section ? selectedTopic.index : 0) {`
- budget.js:728 - `function removeTopic(section, index = selectedTopic.section === section ? selectedTopic.index : 0) {`
- budget.js:761 - `function addDetail() {`
- budget.js:768 - `function removeDetail() {`
- budget.js:779 - `function exportPdf() {`
- budget.js:785 - `function selectTopicFromEvent(event) {`
- budget.js:838 - `async function init() {`
- editor.js:88 - `function cloneProject(project) {`
- editor.js:92 - `function field(name) {`
- editor.js:96 - `function currentProject() {`
- editor.js:100 - `function slugify(value) {`
- editor.js:110 - `function normalizeMediaPath(value = "") {`
- editor.js:125 - `function projectSearchTerms(project = currentProject()) {`
- editor.js:139 - `function isSuggestedAsset(path, project = currentProject()) {`
- editor.js:144 - `function isCoverAsset(path) {`
- editor.js:148 - `function suggestedAssets(project = currentProject()) {`
- editor.js:153 - `function setStatus(message, isError = false) {`
- editor.js:158 - `function escapeHtml(value = "") {`
- editor.js:166 - `function scheduleLocalAutosave() {`
- editor.js:173 - `function inferMediaType(src = "") {`
- editor.js:187 - `function normalizeMediaItem(item) {`
- editor.js:204 - `function normalizeProject(project) {`
- editor.js:220 - `function renderMediaAssetOptions() {`
- editor.js:228 - `async function loadProjects() {`
- editor.js:246 - `function renderProjectList() {`
- editor.js:255 - `function fillForm() {`
- editor.js:281 - `function updateOutputs() {`
- editor.js:287 - `function updateTextMeter() {`
- editor.js:297 - `function mediaPreviewMarkup(item, index) {`
- editor.js:312 - `function renderGalleryEditor() {`
- editor.js:328 - `function renderAssetLibrary() {`
- editor.js:352 - `function renderPreview() {`
- editor.js:387 - `function updateProjectFromForm() {`
- editor.js:413 - `function addProject() {`
- editor.js:426 - `function duplicateProject() {`
- editor.js:437 - `function deleteProject() {`
- editor.js:450 - `function fileExtension(file) {`
- editor.js:454 - `function projectMediaPath(project, filename) {`
- editor.js:458 - `function handleCoverFile(file) {`
- editor.js:480 - `function handleGalleryFiles(files) {`
- editor.js:508 - `function addGalleryPath() {`
- editor.js:525 - `function setCoverPath(path) {`
- editor.js:536 - `function addGalleryAsset(path) {`
- editor.js:551 - `function addSuggestedGalleryAssets() {`
- editor.js:571 - `function cleanProject(project) {`
- editor.js:582 - `function cleanData() {`
- editor.js:588 - `function publishPreviewData() {`
- editor.js:592 - `function saveDraft() {`
- editor.js:599 - `function exportJson() {`
- editor.js:609 - `async function toBase64FromFile(file) {`
- editor.js:622 - `async function apiPost(path, body) {`
- editor.js:637 - `async function saveLocalRepository(options = {}) {`
- editor.js:671 - `function renderAll() {`
- editor.js:743 - `async function init() {`
- script.js:207 - `const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);`
- script.js:208 - `const lerp = (from, to, amount) => from + (to - from) * amount;`
- script.js:209 - `const smoothstep = (value) => value * value * (3 - 2 * value);`
- script.js:217 - `function colorMix(from, to, amount) {`
- script.js:222 - `function opacityWindow(unit, fadeInStart, fullStart, fullEnd, fadeOutEnd) {`
- script.js:238 - `function readShapeMetrics() {`
- script.js:325 - `function ellipsePath(cx, cy, rx, ry) {`
- script.js:336 - `function roundedRectPath(x, y, w, h, r) {`
- script.js:353 - `function shapeToBox(shape) {`
- script.js:367 - `function drawShape(shape) {`
- script.js:375 - `function interpolateShape(unit) {`
- script.js:422 - `const shouldUseLocalPreview = () => {`
- script.js:440 - `function normalizeMediaPath(value = "") {`
- script.js:455 - `function normalizeProject(project, index = 0, total = 1) {`
- script.js:482 - `function normalizeMediaItem(item) {`
- script.js:499 - `function inferMediaType(src = "") {`
- script.js:513 - `function externalVideoEmbed(src) {`
- script.js:537 - `function renderMediaItem(item, project, index) {`
- script.js:561 - `function slugify(value) {`
- script.js:571 - `function escapeAttribute(value) {`
- script.js:579 - `async function loadProjects() {`
- script.js:595 - `async function fetchProjectsData() {`
- script.js:605 - `async function refreshProjectsFromDataSource() {`
- script.js:612 - `function renderGallery() {`
- script.js:630 - `function preloadDeckImages() {`
- script.js:638 - `function buildDeckMarkup() {`
- script.js:710 - `function applyDeckImageRatios() {`
- script.js:716 - `const applyRatio = () => {`
- script.js:736 - `function getMediaSlides(page) {`
- script.js:740 - `function setActiveMediaSlide(page, nextIndex = 0) {`
- script.js:760 - `function syncActiveMediaPage(page) {`
- script.js:769 - `function updateScrollState() {`
- script.js:795 - `function setSectionVisibility(unit) {`
- script.js:820 - `function lockPage() {`
- script.js:829 - `function unlockPage() {`
- script.js:837 - `function setActiveDeck(deckId) {`
- script.js:857 - `function switchDeck(deckId) {`
- script.js:865 - `function getActiveDeckPage() {`
- script.js:869 - `function isDeckId(deckId) {`
- script.js:877 - `function findDeckTarget(direction) {`
- script.js:891 - `async function openDeck(deckId, triggerElement = null) {`
- script.js:928 - `async function closeDeck() {`
- script.js:944 - `function advanceMediaSlide(direction) {`
- script.js:968 - `function scrollActiveMediaGallery(deltaY) {`
- script.js:995 - `function scrollToSection(sectionId) {`
- script.js:1009 - `function requestUpdate() {`
- script.js:1016 - `function dismissEntryScreen() {`
- script.js:1026 - `function canGalleryScroll(delta) {`
- script.js:1030 - `function canHorizontalScroll(element, delta) {`
- script.js:1048 - `function handleGalleryWheel(event) {`
- script.js:1062 - `function handleHorizontalWheel(event) {`
- script.js:1077 - `function handleGalleryPointerDown(event) {`
- script.js:1091 - `function handleGalleryPointerMove(event) {`
- script.js:1108 - `function handleGalleryPointerEnd(event) {`
- script.js:1132 - `function suppressDraggedGalleryClick(event) {`
- script.js:1142 - `function handleDirectionalKeys(event) {`
- script.js:1166 - `function applyInitialSection() {`
- script.js:1295 - `async function initializeApp() {`
