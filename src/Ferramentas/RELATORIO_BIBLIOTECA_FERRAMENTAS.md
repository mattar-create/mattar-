# Relatório de biblioteca de ferramentas

Pasta analisada: `C:\Users\vitor\Documents\Ferramentas`

Data do inventário: 2026-07-14

## 1. Visão geral

Esta pasta reúne protótipos visuais em HTML/CSS/JS para animação de marca, galerias de imagem, interações com o vetor Mattar, morph de formas e visualização geográfica. A maioria dos arquivos é autônoma e pode ser aberta diretamente no navegador. Há duas exceções importantes:

- `mattar-3d-world-flows.html` depende de internet/CDN para carregar D3, TopoJSON e mapa-múndi.
- `vertical-image-carousel.html` e `dynamic-image-webpage.html` dependem de imagens locais em `file:///C:/Users/vitor/Desktop/Mattar/11_Criacao%20Codex%20-%20Simone%20Historia/Interface/assets/image/`.

O conjunto já é adequado como base para uma biblioteca de elementos reutilizáveis em apresentações: existem componentes de motion, SVG, canvas, galerias, controles de cor, sliders de parâmetros e presets visuais.

## 2. Ferramentas disponíveis

| Ferramenta | Arquivo | Função principal | Tecnologia | Status para biblioteca |
|---|---|---|---|---|
| Carrossel vertical 3D | `vertical-image-carousel.html` | Carrossel cilíndrico vertical de imagens com rotação 3D contínua | HTML, CSS 3D, JS | Reutilizável como módulo de galeria/motion |
| Galeria dinâmica | `dynamic-image-webpage.html` | Slider editorial em tela cheia com navegação, shuffle e thumbnails laterais | HTML, CSS, JS | Reutilizável para abertura visual de apresentação |
| Mattar Rubber Vector | `rubber-vector.html` | Vetor M com efeito rubber band por cursor | Canvas 2D, Path2D | Bom como vinheta/interação de marca |
| M Rubber Interaction | `rubber-m-vector.html` | Contorno do M deformado por pontos/bolinhas internas | Canvas 2D | Protótipo editável com muitos controles |
| M Rubber Interaction V2 | `rubber-m-vector-v2.html` | Versão com membrana/rigidez, impacto e resposta mais física | Canvas 2D | Melhor candidato para biblioteca de deformação |
| M Text Contour | `rubber-m-vector-text.html` | Texto animado ao redor do contorno do M | Canvas 2D | Reutilizável para composição tipográfica |
| M Text Contour V2 | `rubber-m-vector-text-v2.html` | Texto no contorno com bolinhas e offset para fora | Canvas 2D | Versão mais completa que V1 |
| M Text Contour V3 | `rubber-m-vector-text-v3.html` | Texto externo ao M com bolinhas influenciando o fluxo | Canvas 2D | Melhor candidato para tipografia interativa |
| Morph Mattar Shapes | `morph-mattar-shapes.html` | Morph entre quatro conjuntos SVG Mattar | SVG, JS, interpolação de contornos | Excelente para transições entre slides |
| Modelos de Animação Textual | `modelos-animacao-textual.html` | Catálogo de cinco presets de animação textual | HTML, CSS animations, JS | Biblioteca direta de motion textual |
| Mattar 3D World Flows | `mattar-3d-world-flows.html` | Globo ortográfico com rotas, hubs, partículas e tooltip | SVG, D3, TopoJSON | Reutilizável para mapas e narrativas globais |
| Mattar Cursor Tilt | `cursor-tilt-mattar/` | Vetor M com tilt 3D controlado por cursor e painéis de cor | HTML, CSS, JS | Ferramenta pronta com UI de edição |

## 3. Dependências e assets

### 3.1 Assets externos de imagem

Usados por:

- `vertical-image-carousel.html`
- `dynamic-image-webpage.html`

Diretório configurado no código:

`file:///C:/Users/vitor/Desktop/Mattar/11_Criacao%20Codex%20-%20Simone%20Historia/Interface/assets/image/`

Imagens listadas nos dois códigos:

| Asset | Função |
|---|---|
| `213__DSF2886 1.png` | Imagem de galeria |
| `imageye___-_imgi_11_fc_30bienal_13-copia-1024x683 1.png` | Imagem de galeria |
| `imageye___-_imgi_1_bc6bb143-76b8-4163-9425-6a29743deeb4 1.png` | Imagem de galeria |
| `imageye___-_imgi_1_beluzco2-copia 1.png` | Imagem de galeria |
| `imageye___-_imgi_1_Copia-de-25_04_2016_6077-1-scaled 1.png` | Imagem de galeria |
| `imageye___-_imgi_1_Migraflix-Overview-v-2.00_00_07_10.Quadro006-e1760977785415 1.png` | Imagem de galeria |
| `imageye___-_imgi_2_8152968c-583b-498d-b5c7-ff1ab8eee30f 2.png` | Imagem de galeria |
| `imageye___-_imgi_2_beluzco_03-copia-2048x884 1.png` | Imagem de galeria |
| `imageye___-_imgi_2_IMG_5728-scaled 1.png` | Imagem de galeria |
| `imageye___-_imgi_30_Captura-de-Tela-2023-12-21-as-08.26.23-copia-1024x702 1.png` | Imagem de galeria |
| `imageye___-_imgi_33_Migraflix-Overview-v-2.00_00_01_20.Quadro003-800x1423 1.png` | Imagem de galeria |
| `imageye___-_imgi_38_Captura-de-Tela-2023-12-21-as-08.26.41-copia-768x768 1.png` | Imagem de galeria |
| `imageye___-_imgi_3_Concha-Y-Toro-Simone-Copiar-06.00_00_30_28.Quadro024-scaled 1.png` | Imagem de galeria |
| `imageye___-_imgi_3_fc_30bienal_05-copia 1.png` | Imagem de galeria |
| `imageye___-_imgi_41_Migraflix-Overview-v-2.00_00_06_20.Quadro005-864x1536 1.png` | Imagem de galeria |
| `imageye___-_imgi_42_geluminas_16-copia-1024x720 1.png` | Imagem de galeria |
| `imageye___-_imgi_4_geluminas_06-copia-2048x1365 1.png` | Imagem de galeria |
| `imageye___-_imgi_60_Selecao-24_05.00_55_43_01.Quadro025-1400x2489 1.png` | Imagem de galeria |
| `imageye___-_imgi_7_Concha-Y-Toro-Simone-Copiar-06.00_00_28_23.Quadro020-scaled 1.png` | Imagem de galeria |
| `imageye___-_imgi_9_Dadiva-Selecao-Total.00_17_03_06.Quadro004-scaled 1.png` | Imagem de galeria |
| `JG0A0215 1.png` | Imagem de galeria |
| `JG0A0408 1.png` | Imagem de galeria |
| `_DSF6711 1.png` | Imagem de galeria |
| `_DSF7104 1.png` | Imagem de galeria |
| `_DSF8072 1.png` | Imagem de galeria |

Observação: para transformar essas ferramentas em biblioteca portátil, recomenda-se copiar esses arquivos para uma pasta interna, por exemplo `assets/images/`, e substituir o `imageDir`.

### 3.2 Assets vetoriais embutidos

| Asset | Local | Função |
|---|---|---|
| Vetor M Mattar, path SVG | `rubber-vector.html`, `cursor-tilt-mattar/index.html`, `modelos-animacao-textual.html` | Marca principal usada como forma, máscara ou objeto animado |
| Contorno M por pontos | `rubber-m-vector*.html`, `rubber-m-vector-text*.html` | Malha/base geométrica para deformações no canvas |
| Quatro conjuntos SVG Mattar | `morph-mattar-shapes.html` | Fontes do morph, nomeadas como `Conjunto 1`, `Conjunto 2`, `Conjunto 3`, `Conjunto 4` |
| Ícones SVG inline de navegação | `dynamic-image-webpage.html` | Botões de shuffle, anterior e próxima imagem |
| Globo/mapa SVG dinâmico | `mattar-3d-world-flows.html` | Camada de visualização geográfica renderizada via D3 |

### 3.3 Dependências externas de código

| Dependência | Usada em | Função |
|---|---|---|
| `https://esm.sh/d3-geo@3.1.1` | `mattar-3d-world-flows.html` | Projeção ortográfica, caminhos geográficos, interpolação de rotas |
| `https://esm.sh/d3-selection@3.0.0` | `mattar-3d-world-flows.html` | Seleção e manipulação SVG |
| `https://esm.sh/d3-drag@3.0.0` | `mattar-3d-world-flows.html` | Arrastar o globo |
| `https://esm.sh/topojson-client@3.1.0` | `mattar-3d-world-flows.html` | Conversão de TopoJSON para GeoJSON |
| `https://esm.sh/@d3-maps/atlas@1.0.0/world/countries/countries-110m` | `mattar-3d-world-flows.html` | Base geográfica dos países |

## 4. Controles editáveis por ferramenta

### 4.1 `vertical-image-carousel.html`

Controles visíveis:

- `shuffle`: sorteia novas imagens.
- `speed`: slider de velocidade, de 16s a 80s.
- `scale`: slider de escala, de 48% a 120%.

Parâmetros editáveis no código:

- `imageDir`: origem das imagens.
- `imageNames`: lista de assets.
- `count`: quantidade de imagens no carrossel, hoje `18`.
- CSS `.card`: proporção, raio, sombra e escala visual.
- CSS `.a3d`: duração inicial da animação, hoje `32s`.

Funções principais:

- `shuffle(items)`: embaralha a lista.
- `render()`: cria os elementos `img`, aplica índice 3D e injeta no carrossel.

### 4.2 `dynamic-image-webpage.html`

Controles visíveis:

- `shuffle`: sorteia/reordena imagens.
- `.prev`: imagem anterior.
- `.next`: próxima imagem.
- Teclado: seta direita, seta esquerda e tecla `R`.
- Clique em thumbnail lateral: promove a imagem clicada.

Parâmetros editáveis no código:

- `imageDir`: origem das imagens.
- `imageNames`: lista de assets.
- CSS `.item:nth-child(...)`: posição dos cards, comportamento de destaque e thumbnails.
- Textos automáticos em `createItem`: kicker, título e contador.

Funções principais:

- `shuffle(items)`: embaralha a lista.
- `createItem(name, index, total)`: monta cada slide.
- `renderRandomOrder()`: renderiza a galeria em nova ordem.
- `next()` e `previous()`: fazem a rotação dos slides.

### 4.3 `rubber-vector.html`

Controles visíveis:

- Interação por cursor/arraste no canvas.

Parâmetros editáveis no código:

- `LOGO_PATH`: path vetorial do M.
- `LOGO_WIDTH` e `LOGO_HEIGHT`: dimensões base.
- `settings`: dimensões, DPR, cores, intensidade visual e parâmetros de banda.
- `satellites`: pontos auxiliares que geram o contorno elástico em volta da marca.

Funções principais:

- `findHull(points)`: calcula o contorno convexo.
- `drawRoundedHull(hull, radius)`: desenha o contorno elástico arredondado.
- `logoMetrics(time)`: calcula escala e posição responsiva do logo.
- `getLogoPoints(metrics, time)`: gera pontos da deformação.
- `drawLogo(metrics, time)`: desenha o M.
- `draw(time)`: loop de animação.
- `setPointer(event)`: lê o cursor para tensionar a marca.

### 4.4 `rubber-m-vector.html`

Controles visíveis:

- `numPoints`: quantidade de bolinhas, 2 a 26.
- `ballRadius`: raio das bolinhas, 4 a 34.
- `lineWidth`: espessura do M, 1 a 18.
- `force`: força da deformação, 0 a 80.
- `speed`: velocidade, 0 a 300.
- `smooth`: suavidade, 0 a 100.
- `foreground`: cor do M.
- `background`: cor do fundo.
- `drawPoints`: mostrar/ocultar bolinhas.
- `debug`: mostrar/ocultar borda de debug.
- `reset`: restaura padrões.
- `shuffle`: reposiciona bolinhas.
- Arraste de bolinhas no canvas.

Funções principais:

- `pointInPolygon`, `randomInsideM`, `closestInside`: mantêm pontos dentro do M.
- `sampleOutline`: cria amostras do contorno.
- `stepBalls`: atualiza física simples das bolinhas.
- `deformedBoundary`: calcula contorno deformado.
- `drawElasticM`: desenha a forma final.
- `bindControls`: liga UI aos parâmetros.

### 4.5 `rubber-m-vector-v2.html`

Controles visíveis:

- `numPoints`: 2 a 30.
- `ballRadius`: 4 a 36.
- `lineWidth`: 1 a 18.
- `force`: impacto, 0 a 120.
- `speed`: 0 a 320.
- `stiffness`: rigidez, 0 a 100.
- `foreground`: cor do M.
- `background`: cor do fundo.
- `drawPoints`: mostrar bolinhas.
- `debug`: debug de borda.
- `reset` e `shuffle`.
- Arraste de bolinhas no canvas.

Diferença em relação à V1:

- Usa `buildMembrane`, `stepMembrane` e `traceMembrane`, criando uma resposta mais contínua do contorno.
- É mais adequada para exportar como preset de deformação física.

### 4.6 `rubber-m-vector-text.html`

Controles visíveis:

- `text`: texto exibido no contorno.
- `mScale`: escala do M.
- `fontSize`: tamanho da fonte.
- `spacing`: espaçamento entre caracteres/palavras.
- `offset`: deslocamento do texto.
- `flow`: fluxo/animação ao longo do caminho.
- `fontWeight`: peso tipográfico.
- `elasticity`: elasticidade do contorno.
- `textColor`: cor do texto.
- `bgColor`: cor do fundo.
- `showGuides`: exibir guias.
- `showPoints`: exibir pontos.
- `reset` e `shuffle`.

Funções principais:

- `buildNodes`: cria nós do contorno.
- `stepNodes`: anima a elasticidade.
- `getPathPoints`: obtém o caminho do M.
- `pointAtDistance`: posiciona texto por distância ao longo do path.
- `drawTextOnPath`: desenha texto no contorno.
- `drawGuides` e `drawAnchorPoints`: camadas auxiliares.

### 4.7 `rubber-m-vector-text-v2.html`

Controles visíveis adicionais:

- `outward`: desloca o texto para fora do contorno.
- `ballCount`: quantidade de bolinhas.
- `ballRadius`: raio das bolinhas.
- `showBalls`: modo bolinhas.

Funções adicionais:

- `updateBallCount`: controla número de bolinhas.
- `stepBalls`: anima bolinhas.
- `drawBalls`: desenha bolinhas.
- `outwardNormalAt` e `readableAngle`: melhoram orientação e legibilidade do texto.

Uso recomendado:

- Composição tipográfica dinâmica com opção de exibir/ocultar a camada de interação.

### 4.8 `rubber-m-vector-text-v3.html`

Controles visíveis:

- `text`, `mScale`, `fontSize`, `spacing`, `outward`, `offset`, `flow`, `fontWeight`, `elasticity`.
- `ballCount`, `ballRadius`.
- `textColor`, `bgColor`.
- `ballsAffect`: bolinhas influenciam o texto.
- `showBalls`: mostra bolinhas.
- `showGuides`: mostra guias.
- `showPoints`: mostra pontos.
- `reset` e `shuffle`.

Diferença em relação à V2:

- `ballsAffect` separa visualização das bolinhas da influência real sobre o texto.
- Usa `defaults` e `settings = { ...defaults }`, facilitando criar presets.
- `normalizedReadableAngle` e `outwardVectorAt` melhoram a leitura fora do M.

Uso recomendado:

- Versão principal para biblioteca de texto no contorno.

### 4.9 `morph-mattar-shapes.html`

Controles visíveis:

- `fromShape`: select da forma inicial.
- `toShape`: select da forma final.
- `progress`: progresso manual do morph, 0 a 1000.
- `duration`: duração da animação, 600ms a 5200ms.
- `play`: executa o morph.
- `swap`: troca origem e destino.
- `loop`: roda sequência 1-4.
- `random`: escolhe par aleatório.

Assets internos:

- `Conjunto 1`
- `Conjunto 2`
- `Conjunto 3`
- `Conjunto 4`

Funções principais:

- `parseSource`: lê SVG bruto e extrai contornos.
- `samplePath` e `parsePolygonPoints`: convertem paths e polígonos em pontos.
- `resampleClosedPolyline`: normaliza quantidade de pontos.
- `alignPoints`: alinha contornos para interpolação.
- `buildMorphPair`: prepara par de morph.
- `contourPath`: reconstrói path SVG.
- `render`: desenha o estado atual.
- `play`, `toggleLoop`, `runLoopSegment`: controlam animação.

Uso recomendado:

- Transições entre capítulos, aberturas de seção e animações de identidade visual.

### 4.10 `modelos-animacao-textual.html`

Controles visíveis:

- `jump`: select para navegar entre modelos.
- `replay`: reinicia animações.
- `pause`: pausa/anima o documento.
- Botões `cascade-rhythm`: `Editorial`, `Impacto`, `Respirado`.

Modelos/presets:

- `line`: Revelação por linha.
- `cut`: Campo cromático.
- `compress`: Entrada por compressão.
- `m`: Texto puxado pelo M.
- `cascade`: Editorial em cascata.

Funções principais:

- `splitVisualLines`: quebra texto em linhas visuais para animação.
- `rebuildLineReveals`: reconstrói máscaras de linhas.
- `replayAnimations`: reinicia classes/animações CSS.
- `setCascadeRhythm`: troca ritmo do preset cascata.
- `IntersectionObserver`: ativa seções ao entrar na tela.

Uso recomendado:

- Biblioteca de presets de motion textual para apresentações e peças editoriais.

### 4.11 `mattar-3d-world-flows.html`

Controles visíveis:

- `speed`: velocidade da rotação/partículas, 0 a 240, exibida como multiplicador.
- `rotate`: liga/desliga rotação automática.
- `reset`: centraliza o globo.
- Arraste no SVG: rotaciona o globo.
- Hover/click em rotas, hubs e partículas: mostra tooltip e atualiza painel de seleção.

Rotas configuradas:

- São Paulo -> Lisboa.
- São Paulo -> Nova York.
- São Paulo -> Londres.
- São Paulo -> Dubai.
- São Paulo -> Tóquio.
- Lisboa -> Cidade do Cabo.

Hubs configurados:

- São Paulo.
- Lisboa.
- Nova York.
- Londres.
- Dubai.
- Tóquio.
- Cidade do Cabo.

Funções principais:

- `routeFeature`: cria arco geográfico.
- `routePoint`: calcula posição da partícula na rota.
- `showTooltip`, `showFlow`, `showHub`: interações informativas.
- `draw`: redesenha globo, rotas, hubs e partículas.
- `frame`: loop de animação.

Uso recomendado:

- Visualização de redes, atuação internacional, fluxos de projetos ou narrativa de expansão.

### 4.12 `cursor-tilt-mattar/`

Arquivos:

- `cursor-tilt-mattar/index.html`: estrutura e controles.
- `cursor-tilt-mattar/styles.css`: tema, variáveis e layout.
- `cursor-tilt-mattar/app.js`: lógica de cursor, cor e animação.

Controles visíveis:

- `rotation`: rotação 3D, 0 a 32.
- `travel`: deslocamento do logo, 0 a 70px.
- `scale`: escala, 60% a 220%.
- `perspective`: perspectiva, 320px a 1200px.
- `glow`: brilho, 0% a 100%.
- Swatches do vetor: vermelho, preto, claro.
- Swatches do fundo: preto, claro, vermelho, cinza quente.
- `autoMode`: modo automático.
- `reset`: restaura padrões.
- Movimento do cursor sobre a área de preview.

Funções principais:

- `hexToRgb`: converte cor para RGB.
- `setVectorColor`: altera cor do vetor e brilho.
- `setBackgroundColor`: altera fundo.
- `updateLabels`: sincroniza outputs e variáveis CSS.
- `setPointerFromEvent`: lê posição do cursor.
- `render`: aplica tilt, deslocamento e modo automático.

Uso recomendado:

- Ferramenta de exploração de marca para capturas, vídeos curtos ou elementos interativos em apresentações digitais.

## 5. Controles editáveis consolidados

### Controles de conteúdo

- Textos: `text` em `rubber-m-vector-text*.html`; textos HTML em `modelos-animacao-textual.html`; labels/detalhes em `mattar-3d-world-flows.html`.
- Imagens: `imageNames` e `imageDir` nas duas galerias.
- Rotas: arrays `flows` e `hubs` no mapa global.
- Formas SVG: `RAW_SVGS` em `morph-mattar-shapes.html`; `LOGO_PATH` e outlines do M nos arquivos rubber.

### Controles visuais

- Cores: `foreground`, `background`, `textColor`, `bgColor`, swatches e variáveis CSS.
- Escala: `scale`, `mScale`, `fontSize`, CSS `--scale`.
- Espessura: `lineWidth`, peso tipográfico `fontWeight`.
- Intensidade de movimento: `force`, `impact`, `elasticity`, `stiffness`, `smooth`, `travel`, `rotation`, `glow`.

### Controles de tempo

- Velocidade: `speed` em carrossel, rubber e mapa.
- Duração: `duration` no morph.
- Ritmo: `cascade-rhythm` em animação textual.
- Fluxo: `flow` em texto no contorno.

## 6. Recomendações para transformar em biblioteca

1. Criar uma pasta `assets/` dentro de `Ferramentas` e internalizar imagens e SVGs hoje embutidos ou apontados para o Desktop.
2. Padronizar nomes dos módulos: `gallery-3d`, `gallery-editorial`, `m-rubber`, `m-rubber-text`, `morph-shapes`, `text-motion`, `world-flows`, `cursor-tilt`.
3. Separar cada ferramenta em `index.html`, `styles.css`, `app.js` quando houver reuso previsto.
4. Criar presets JSON para valores editáveis, especialmente nas ferramentas `rubber-m-vector-text-v3.html`, `morph-mattar-shapes.html` e `modelos-animacao-textual.html`.
5. Adicionar função de exportação futura: PNG/canvas frame, SVG estático, ou captura de preset para inserir em apresentações.
6. Corrigir caracteres com encoding quebrado em alguns textos visíveis, por exemplo `Rotação`, `Interação`, `Seleção`, `São Paulo`, antes de empacotar para uso final.

## 7. Prioridade de reaproveitamento

Alta prioridade:

- `modelos-animacao-textual.html`: já funciona como catálogo de motion.
- `morph-mattar-shapes.html`: forte valor para transições visuais.
- `rubber-m-vector-text-v3.html`: ferramenta mais completa para tipografia sobre o M.
- `cursor-tilt-mattar/`: ferramenta com UI clara e separação de arquivos.

Prioridade média:

- `dynamic-image-webpage.html`: bom impacto visual, mas precisa internalizar imagens.
- `vertical-image-carousel.html`: bom módulo de galeria, também depende de imagens externas.
- `mattar-3d-world-flows.html`: visual forte, mas depende de CDN e precisa opção offline se for para biblioteca fechada.

Prioridade experimental:

- `rubber-vector.html`
- `rubber-m-vector.html`
- `rubber-m-vector-v2.html`
- `rubber-m-vector-text.html`
- `rubber-m-vector-text-v2.html`

Esses arquivos são úteis como laboratório de variações, mas a biblioteca final provavelmente deve consolidar as melhores ideias nas versões V2/V3.
