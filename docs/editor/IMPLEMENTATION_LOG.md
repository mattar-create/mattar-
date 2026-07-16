# Implementation Log

## 2026-07-12 - editor/00-baseline

Objetivo: iniciar a implementacao incremental do editor visual apenas com levantamento, baseline e documentacao.

Executado:

- Confirmada ausencia de `AGENTS.md` e de `docs/editor/EDITOR_RULES.md` anteriores.
- Criado `docs/editor/EDITOR_RULES.md` com protocolo inicial.
- Confirmado que a arvore atual nao e um repositorio Git.
- Criado checkpoint leve `editor/00-baseline` por hashes em `checkpoints/editor-00-baseline.md`.
- Servidor estatico iniciado em `http://127.0.0.1:4174/`.
- Rota local respondeu `200 OK`.
- `node --check app.js` executado sem erros.
- `node --check data/slides.js` executado sem erros.
- Identificadas as 24 paginas existentes no nivel necessario.
- Selecionados tres casos reais:
  - `06-refeicao-como-composicao`;
  - `08-transicao-a-obra`;
  - `21-transicao-repertorio-expansao`.
- Documentados arquivos, componentes, textos, assets, estilos, animacoes, interacoes, propriedades fixas e controles possiveis em `docs/editor/SELECTED_CASES.md`.

Nao executado por restricao desta etapa:

- Nenhum schema universal.
- Nenhuma store do editor.
- Nenhuma rota de editor.
- Nenhuma alteracao em componentes das paginas.
- Nenhuma instalacao de dependencia.
- Nenhuma correcao de problemas preexistentes sem relacao direta com o baseline.

Limitacoes registradas:

- Automacao de navegador/captura por plugin falhou por ACL do ambiente.
- Capturas novas nao foram produzidas; foi documentado procedimento exato de comparacao visual e foram preservadas capturas existentes `qa-desktop.png`, `qa-mobile.png`, `qa-mobile-500.png`.

## 2026-07-13 - editor/01-structure

Objetivo: implementar a primeira estrutura funcional do editor visual sem avancar para edicao de conteudo.

Arquivos criados/alterados:

- `editor/index.html`: nova rota estatica isolada em `/editor/`, com barra superior, navegador de paginas, canvas e painel contextual.
- `editor/editor.css`: layout do editor, frame proporcional de 1440 x 900, zoom/ajuste a area e modo preview.
- `editor/editor.js`: leitura de `window.MATTAR_SLIDES`, listagem real das 24 paginas, selecao de pagina, painel de propriedades, zoom e alternancia preview/editor.
- `app.js`: API minima `window.MattarPresentation`, suporte a `?slide=N`/hash e mensagens `mattar:select-slide`/`mattar:slide-change` para controlar a apresentacao real dentro do iframe.
- `checkpoints/editor-01-structure.md`: checkpoint leve da etapa.

Paginas afetadas:

- Todas as paginas reais podem ser selecionadas pelo navegador do editor.
- Os tres casos documentados continuam sendo cobertos: `06-refeicao-como-composicao`, `08-transicao-a-obra`, `21-transicao-repertorio-expansao`.

Controles adicionados:

- Selecao de pagina no navegador lateral.
- Zoom do canvas: ajustar, 100%, 75%, 50%.
- Botao Preview para esconder paines e liberar a apresentacao real.
- Botao Voltar ao editor.
- Link para abrir a apresentacao original.

Propriedades fixas mantidas:

- Textos continuam em `data/slides.js`.
- Renderizadores de pagina continuam em `app.js`.
- Transicoes GSAP, teclado, wheel e touch permanecem no runtime da apresentacao.
- Nao ha edicao de texto, upload, drag, resize, timeline, schema universal ou store global.

Testes executados:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/`: `200 OK`.
- `http://127.0.0.1:4174/editor/`: `200 OK`.
- `http://127.0.0.1:4174/editor`: `301 Moved Permanently` para `/editor/`, comportamento normal de pasta estatica.

Limitacoes conhecidas:

- A validacao visual automatizada continua limitada pela ACL do ambiente registrada no baseline.
- O canvas usa iframe da apresentacao real; manipulacao direta de elementos fica propositalmente fora desta etapa.
- O painel contextual mostra propriedades basicas e uma area preparada para controles futuros, sem implementar abstracao de editor.
- No modo editor, o iframe nao recebe ponteiro para evitar interacao acidental; no modo preview, o iframe recebe ponteiro e foco.

## 2026-07-13 - editor/02-text-override

Objetivo: implementar a primeira propriedade realmente editavel somente no caso de conteudo `06-refeicao-como-composicao`.

Arquivos criados/alterados:

- `app.js`: adiciona `EDITABLE_TITLE_ELEMENT_ID`, atributos `data-editor-element-id` no titulo real do slide selecionado, camada de overrides em memoria recebida do editor, selecao visual por clique no canvas e mensagens `mattar:element-selected`, `mattar:set-overrides`, `mattar:set-selected-element`.
- `styles.css`: adiciona destaque visual minimo para elemento editavel/selecionado, sem alterar tipografia, fonte, tamanho ou posicao.
- `editor/editor.js`: substitui estado solto por store nativa minima com pagina ativa, elemento selecionado, overrides, undo e redo; adiciona persistencia local em `localStorage` com chave versionada `mattar-editor-draft:v1`; trata JSON invalido com fallback seguro.
- `editor/editor.css`: adiciona estilos do controle de edicao no inspector e permite clique no iframe do canvas para selecionar o titulo real.
- `checkpoints/editor-02-text-override.md`: checkpoint leve da etapa.

Pagina afetada:

- Apenas `06-refeicao-como-composicao`, indice 5.

Elemento convertido para edicao:

- `06-refeicao-como-composicao:title`.
- Valor original preservado em `data/slides.js` e em `data-editor-original`.
- Sem override, a apresentacao usa `slide.title` original.
- Com override enviado pelo editor, o titulo renderizado e atualizado no iframe real.

Controles adicionados:

- Selecionar titulo.
- Campo textual no inspector.
- Confirmar.
- Cancelar.
- Original/reset do elemento.
- Undo.
- Redo.
- Reset da pagina.

Persistencia:

- Draft local salvo em `localStorage` por `mattar-editor-draft:v1`.
- O navegador salva apenas `activePage`, `selectedElement` e `overrides`.
- Historico existe em memoria da sessao, conforme necessario para undo/redo.

Propriedades fixas mantidas:

- Nenhum outro texto foi convertido.
- Nenhum upload, drag, resize, timeline, backend ou biblioteca externa foi criado.
- Nenhuma fonte, tamanho ou posicao ficou editavel.
- O canvas continua usando o renderizador real por iframe.
- A apresentacao original segue acessivel sem interface do editor.

Testes executados:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/`: `200 OK`.
- `http://127.0.0.1:4174/editor/`: `200 OK`.

Limitacoes conhecidas:

- A validacao visual automatizada continua limitada pela ACL do ambiente registrada no baseline.
- A persistencia e local ao navegador; nao grava arquivos do repositorio e nao sincroniza entre dispositivos.
- O preview reflete o override porque usa o iframe real controlado pelo editor; a rota original aberta diretamente nao mostra interface do editor.
- Etapa 3, imagem/asset existente, nao foi implementada.

## 2026-07-13 - rollback para editor/01-structure

Motivo: a versao com primeira propriedade editavel (`editor/02-text-override`) foi considerada instavel e removida do codigo ativo.

Acoes executadas:

- Removida a camada de `elementId`, overrides e selecao textual de `app.js`.
- Removidos estilos de selecao textual adicionados em `styles.css`.
- Restaurado `editor/editor.js` para a estrutura funcional da Etapa 1: lista de paginas, selecao, propriedades basicas, zoom e preview.
- Removidos controles de inspector editavel, `localStorage`, undo/redo e reset da Etapa 2.
- Restaurado `editor/editor.css` para o comportamento da Etapa 1: iframe sem interacao no modo editor e interativo apenas no modo preview.

Estado ativo apos rollback:

- Editor estrutural da Etapa 1 ativo em `/editor/`.
- Apresentacao original preservada em `/`.
- `editor/02-text-override` permanece apenas como registro/checkpoint historico, nao como funcionalidade ativa.

Testes executados:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/`: `200 OK`.
- `http://127.0.0.1:4174/editor/`: `200 OK`.

## 2026-07-13 - restore de editor/02-text-override

Motivo: o usuario solicitou retornar exatamente a versao produzida pelo comando da primeira propriedade editavel, desfazendo o rollback anterior para `editor/01-structure`.

Acoes executadas:

- Restaurada a camada de `elementId` e overrides em `app.js`.
- Restaurado o elemento editavel `06-refeicao-como-composicao:title` no titulo real renderizado pelo componente existente.
- Restauradas as mensagens `mattar:set-overrides`, `mattar:set-selected-element` e `mattar:element-selected`.
- Restaurada a selecao visual no canvas real.
- Restaurado `editor/editor.js` com store nativa minima, `localStorage`, undo, redo, reset do elemento e reset da pagina.
- Restaurados os estilos do inspector editavel e do destaque de selecao.

Estado ativo apos restore:

- `editor/02-text-override` esta novamente ativo no codigo.
- `editor/rollback-to-01-structure` permanece apenas como historico.
- Etapa 3 de imagem/asset existente continua nao implementada.

Testes executados:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/`: `200 OK`.
- `http://127.0.0.1:4174/editor/`: `200 OK`.

## 2026-07-13 - hotfix estabilidade selecao de paginas

Problema observado:

- No editor da Etapa 2, ao selecionar uma pagina, a apresentacao oscilava entre a primeira pagina e a pagina selecionada.

Causa:

- O iframe da apresentacao enviava eventos `mattar:slide-change` para o editor tambem no modo editor. Eventos atrasados, especialmente da pagina inicial, podiam disputar com a selecao feita no navegador lateral.

Correcao:

- `editor/editor.js` agora trata a lista/pagina ativa do editor como fonte de verdade enquanto `isPreview` e falso.
- Eventos `mattar:slide-change` vindos do iframe sao ignorados no modo editor.
- No modo Preview, esses eventos continuam sendo aceitos para preservar a navegacao real da apresentacao.

Arquivos alterados:

- `editor/editor.js`.

Testes executados:

- `node --check editor/editor.js`: sem erros.
- `node --check app.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/`: `200 OK`.
- `http://127.0.0.1:4174/editor/`: `200 OK`.

## 2026-07-13 - editor/03-existing-image-asset

Objetivo: provar edicao visual de midia sem upload, usando somente assets de imagem existentes.

Escopo:

- Pagina afetada: `06-refeicao-como-composicao`.
- Elemento de midia criado: `06-refeicao-como-composicao:media`.
- Estado original preservado: a pagina continua sem imagem quando nao ha override de midia.
- A imagem passa a aparecer apenas quando o editor grava um override com asset existente.

Arquivos alterados:

- `app.js`: adiciona slot incremental `renderEditableMedia(slide)`, camada de override de midia, `data-editor-element-kind="media"`, aplicacao de `src`, `object-fit` e `object-position` no renderizador real.
- `styles.css`: adiciona estilos do slot `.editable-media-slot`, estado vazio invisivel e ponto focal visual quando selecionado.
- `editor/editor.js`: adiciona manifesto minimo `ASSET_MANIFEST`, suporte a override de midia no store nativo, persistencia local versionada `mattar-editor-draft:v2`, controles de asset, fit, posicao X/Y, foco por clique, reset, undo e redo.
- `editor/editor.css`: adiciona leitura de asset/dimensoes e estilos dos controles de midia.

Controles adicionados:

- Inserir/substituir imagem por asset existente.
- Alternar `object-fit` entre `cover` e `contain`.
- Ajustar `object-position` horizontal e vertical por sliders.
- Ajustar ponto focal clicando na imagem no canvas.
- Selecionar imagem no canvas depois de inserida.
- Restaurar imagem original, que neste caso e ausencia de imagem.
- Undo, redo e reset da pagina conectados tambem a midia.

Persistencia:

- Store local migrou para `mattar-editor-draft:v2`.
- Leitura tolera o draft legado `mattar-editor-draft:v1`.
- Dados invalidos de midia sao descartados sem quebrar a apresentacao.

Restricoes respeitadas:

- Nenhum upload.
- Nenhum gerenciador global de midia.
- Nenhum video ou SVG convertido.
- Nenhuma biblioteca de crop instalada.
- Nenhum drag livre do container da imagem.
- Nenhuma alteracao em todos os caminhos de assets.

Testes executados:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/`: `200 OK`.
- `http://127.0.0.1:4174/editor/`: `200 OK`.

Limitacoes conhecidas:

- Como a pagina selecionada nao renderizava imagem originalmente, o slot de midia tem estado original vazio. O criterio de inserir/trocar imagem e atendido por override com asset existente.
- As dimensoes naturais sao carregadas no navegador por `Image`; ate o carregamento terminar, o inspector mostra `Carregando dimensoes`.

## 2026-07-13 - hotfix centralizacao do canvas em telas menores

Problema observado:

- Em telas menores, o centro da pagina renderizada no canvas nao ficava alinhado ao centro da area de exibicao. O frame escalado era recortado lateralmente, fazendo a pagina aparecer deslocada.

Causa:

- O `.frame-shell` era centralizado com tamanho de layout original `1440 x 900` e depois escalado com `transform`. Como transform nao altera o tamanho ocupado no layout, o viewport podia recortar uma area errada do iframe.

Correcao:

- `.frame-shell` agora tem largura e altura ja calculadas pelo tamanho escalado.
- O `iframe` interno continua com `1440 x 900`, mas recebe `transform: scale(...)` com `transform-origin: top left`.
- `fitFrame()` agora calcula a escala por largura/altura disponiveis e aplica a variavel `--frame-scale` sem depender do tamanho de layout original.
- O modo Preview continua em tela cheia, sem transform.

Arquivos alterados:

- `editor/editor.css`.
- `editor/editor.js`.

Testes executados:

- `node --check editor/editor.js`: sem erros.
- `node --check app.js`: sem erros.
- `http://127.0.0.1:4174/`: `200 OK`.
- `http://127.0.0.1:4174/editor/`: `200 OK`.

## 2026-07-13 - editor/04-macro-structure

Objetivo: transformar o navegador lateral em controle funcional da estrutura da apresentacao.

Escopo:

- A fonte real continua sendo `data/slides.js`.
- O editor passa a persistir uma estrutura de draft em `mattar-editor-draft:v3`.
- Cada item de estrutura guarda `sourceId`, `instanceId`, `hidden` e `label`.
- Duplicatas recebem `instanceId` proprio, preservando o `sourceId` e a ligacao dos overrides existentes.

Arquivos alterados:

- `editor/editor.js`: adiciona estrutura macro persistida, agrupamento por secao, selecao por instancia, mover para cima/baixo, duplicar, ocultar/reexibir, renomear identificacao interna e preview pela sequencia visivel.
- `editor/editor.css`: adiciona miniatura textual, chips de visibilidade/transicao, acoes compactas, grupos por secao e estado visual de pagina oculta.
- `app.js`: aceita `mattar:set-structure`, renderiza a apresentacao a partir da sequencia visivel enviada pelo editor, mantem os slides originais como fonte e usa transicoes associadas ao slide fonte.

Controles adicionados:

- Reordenar paginas por botoes subir/descer.
- Duplicar pagina real na sequencia do draft.
- Ocultar e reexibir paginas.
- Renomear identificacao interna por prompt simples.
- Ver secao, tipo, estado visivel/oculto e transicao no navegador e no inspector.
- Preview inicia a partir da pagina selecionada, respeita ordem do draft e ignora paginas ocultas.

Preservacao:

- `index.html` continua usando a apresentacao original sem interface do editor.
- O editor nao altera `data/slides.js` nem salva arquivos pelo navegador.
- Overrides de texto/imagem continuam ligados aos elementIds existentes da pagina fonte.
- Eventos `mattar:slide-change` continuam ignorados no modo editor para evitar oscilacao; no Preview continuam ativos.

Testes executados:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/index.html`: `200 OK`.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.

Limitacoes conhecidas:

- A reordenacao inicial usa botoes subir/descer, nao drag-and-drop.
- A miniatura e uma representacao visual simples, nao screenshot real da pagina.
- Nao ha selecao multipla nesta etapa.
- Nao ha editor detalhado de transicao; o tipo de transicao e apenas exibido.
- A tentativa de smoke test visual via Playwright nao foi executada porque o REPL local falhou por ACL do sandbox.

## 2026-07-13 - hotfix conteudo da visao macro

Problema observado:

- A visao macro do editor ficava navegavel, mas sem renderizar corretamente o conteudo das paginas da apresentacao.

Causa:

- O `editor/editor.js` referenciava helpers da estrutura macro (`sourceSlide`, `sanitizeStructure`, `activeVisibleIndex`, `transitionForSource`) que nao estavam presentes no arquivo final depois da edicao incremental.
- Como era erro de runtime, `node --check` nao acusava o problema.

Correcao:

- Reinseridos `TRANSITION_MAP` e helpers de estrutura macro no topo de `editor/editor.js`.
- Mantida a logica de draft `mattar-editor-draft:v3` e a preservacao dos slides fonte.

Validacao:

- `node --check editor/editor.js`: sem erros.
- `node --check app.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- Simulacao local com DOM minimo: 24 slides carregados, HTML da lista gerado e inspector gerado.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4174/index.html`: `200 OK`.

## 2026-07-13 - editor/05-motion-transition11

Objetivo: implementar o primeiro controle de motion sobre uma animacao real existente.

Animacao escolhida:

- `transition11(fromSlide, toSlide, direction, toIndex)` em `app.js`.
- Usada na navegacao da pagina de conteudo selecionada `06-refeicao-como-composicao` conforme `TRANSITION_MAP`.
- Implementacao original: GSAP com entrada vertical da pagina/texto e saida do slide anterior.

Parametros expostos:

- Animacao ativa: `slideshow-11`.
- Duracao da entrada da pagina.
- Delay da entrada.
- Easing da entrada: `sine.inOut`, `power2.out`, `power2.inOut`, `expo.out`.
- Distancia vertical da pagina em `%`.
- Distancia vertical do texto em `px`.
- Stagger: exibido como nao aplicavel para esta animacao.

Arquivos alterados:

- `app.js`: adiciona `MOTION_TRANSITION11_ID`, valores padrao da animacao, leitura sanitizada do override, parametrizacao de `transition11`, replay isolado `playTransition11MotionPreview()` e reset `resetCurrentMotionPreview()` via mensagens do editor.
- `editor/editor.js`: adiciona `TARGET_MOTION_ID`, `DEFAULT_MOTION`, sanitizacao/persistencia do override de motion, case `set-motion`, painel de Motion no inspector, controles de replay/reset/original e sliders/select conectados ao historico.
- `docs/editor/IMPLEMENTATION_LOG.md`: registra a etapa.

Preservacao:

- O preset original continua sendo o padrao quando nao existe override.
- A animacao continua usando GSAP e a funcao `transition11`; nao houve troca por CSS, keyframes livres ou timeline de editor.
- `index.html` segue usando a apresentacao original sem interface de editor.
- O override entra na camada ja existente e aparece no preview real porque `transition11` consulta `editorOverrides`.

Controles adicionados:

- Selecionar motion.
- Reproduzir animacao isolada no canvas.
- Reiniciar visualizacao do motion.
- Alterar duracao, delay, easing, distancia da pagina e distancia do texto.
- Restaurar valores originais.
- Undo/redo via historico existente do editor.

Testes executados:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- Simulacao local com DOM minimo: 24 slides carregados, HTML da lista gerado, inspector gerado e painel de Motion presente.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4174/index.html`: `200 OK`.

Limitacoes conhecidas:

- Controle limitado ao preset real `slideshow-11`.
- Nao ha timeline, keyframes livres ou editor detalhado de transicoes.
- O replay isolado anima a pagina atual no canvas; o preview de navegacao real continua acontecendo ao navegar entre paginas.

## 2026-07-13 - hotfix fluxo texto e imagem

Problema observado:

- O usuario nao conseguia inserir imagem nem editar texto de forma direta no editor.

Causa:

- O campo de texto ficava desabilitado ate o usuario selecionar explicitamente o titulo.
- O botao `Selecionar imagem` ficava desabilitado quando ainda nao existia override de imagem, criando um fluxo circular para a primeira insercao.
- Se a pagina 06 estivesse oculta na visao macro, os comandos podiam selecionar a instancia mas o canvas continuava mostrando outra pagina visivel.

Correcao:

- O textarea do titulo da pagina 06 fica editavel diretamente no inspector.
- A previa do texto agora entra nos overrides temporarios sempre que a pagina ativa e a pagina alvo, mesmo antes da selecao visual do titulo.
- O botao de midia passa a mostrar `Inserir imagem` quando nao ha asset e insere o primeiro asset existente do manifesto como ponto de partida.
- Os comandos de texto e imagem preferem uma instancia visivel da pagina 06 e reexibem a pagina se apenas uma instancia oculta estiver disponivel.

Validacao:

- `node --check editor/editor.js`: sem erros.
- `node --check app.js`: sem erros.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4174/index.html`: `200 OK`.

## 2026-07-13 - editor/06-editable-carousel-component

Objetivo: provar que o editor consegue operar um componente interativo real com colecao de itens.

Componente escolhido:

- Pagina: `21-transicao-repertorio-expansao`.
- Componente principal: `renderVerticalImageCarousel(slide, index)` em `app.js`.
- Colecao original: `VERTICAL_CAROUSEL_IMAGES`.
- Inicializacao original: `window.VerticalImageCarousel.init(presentation)` em `vendor/vertical-image-carousel/vertical-image-carousel.js`.
- Animacao original: CSS `verticalImageCarouselRotate` em `vendor/vertical-image-carousel/vertical-image-carousel.css`.

Identificador estavel:

- `21-transicao-repertorio-expansao:vertical-carousel`.

Controles adicionados:

- Selecionar o componente pelo inspector.
- Ver lista de itens do carrossel.
- Selecionar item.
- Substituir asset do item usando asset existente.
- Adicionar item usando asset existente.
- Remover item.
- Reordenar item por subir/descer.
- Ligar/desligar autoplay.
- Ajustar duracao do ciclo quando autoplay esta ativo.
- Restaurar carrossel original.

Arquivos alterados:

- `app.js`: adiciona identificador estavel do carrossel, sanitizacao do override, leitura de colecao/autoplay/duracao e re-render do componente real ao receber overrides.
- `editor/editor.js`: adiciona manifesto dos assets do carrossel, override persistente, reducer `set-carousel`, painel do componente, lista de itens e acoes de colecao.
- `editor/editor.css`: adiciona estilos compactos para a lista de itens no inspector.
- `docs/editor/IMPLEMENTATION_LOG.md`: registra a etapa.

Preservacao:

- O componente real continua sendo `vertical-image-carousel`.
- A lista padrao, movimento, responsividade e inicializador original sao preservados sem override.
- Nenhum upload foi implementado.
- Nenhum construtor generico de componentes foi criado.
- Nenhum drag-and-drop interno foi adicionado; reordenacao usa botoes/lista.

IntegraÃ§Ã£o:

- Overrides persistem em `mattar-editor-draft:v3`.
- Historico, undo/redo e reset usam o fluxo existente do editor.
- Preview real reflete mudancas porque `app.js` re-renderiza a apresentacao ao receber `mattar:set-overrides`.

Testes executados:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- Simulacao local do editor na pagina 21: painel do carrossel presente, lista e botao adicionar presentes.
- Simulacao local do app: 24 slides renderizados e carrossel com identificador editavel presente.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4174/index.html`: `200 OK`.

Limitacoes conhecidas:

- O carrossel e decorativo e usa `pointer-events: none`; nesta etapa, a selecao do componente ocorre pelo inspector, nao por clique direto no canvas.
- Nao ha legenda visual nativa no componente atual, portanto nao foi criado campo de legenda artificial.
- A edicao cobre somente este componente real selecionado.
## 2026-07-13 - editor/07-content-family-coverage

Objetivo: expandir o editor usando somente capacidades ja aprovadas, parando ao final da primeira familia para validacao.

Familia convertida:

- `conteudo`: paginas 02, 03, 05, 06, 07, 09, 10, 11, 12, 13 e 14.

Controles reaplicados:

- Titulo real editavel com IDs estaveis `<pageId>:title`.
- Imagem incremental editavel nas paginas `text-image` 02, 03, 06 e 12 com IDs `<pageId>:media`.
- Organizacao macro existente preservada para todas as paginas.
- Motion `motion:transition11` preservado nas paginas que ja usam `slideshow-11`.
- Carrossel vertical aprovado preservado somente na pagina 21.

Arquivos alterados:

- `app.js`: o renderizador real reconhece os IDs editaveis da familia conteudo e segue usando overrides somente quando existem.
- `editor/editor.js`: o inspector resolve titulo e midia pela pagina ativa, mantendo historico, persistencia, preview e reset por elemento/pagina.
- `docs/editor/COVERAGE.md`: novo mapa de cobertura por pagina, familia, controles, limitacoes e validacao.
- `docs/editor/IMPLEMENTATION_LOG.md`: registro desta etapa.

Preservacao:

- Nenhuma nova infraestrutura foi criada.
- Nenhum novo tipo de edicao foi introduzido.
- Nenhuma pagina foi redesenhada.
- Lead, corpo, highlights, layout, drag/resize e uploads permanecem bloqueados.
- A apresentacao original continua acessivel por `index.html`.

Validacao:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/index.html`: `200 OK`.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.

Limitacao:

- Esta etapa para na familia `conteudo`. As familias `capa`, `transicao`, `projeto`, `portfolio` e `encerramento` ficam apenas mapeadas no coverage para as proximas rodadas.
## 2026-07-13 - editor/08-portable-project-stabilization

Objetivo: estabilizar o editor como ferramenta utilizavel no fluxo real e preparar transporte portatil das alteracoes.

Formato definido:

- `kind`: `mattar-editor-project`.
- `version`: `1`.
- `metadata`: titulo, contagem de paginas, pagina ativa e origem da exportacao.
- `project.structure`: ordem, duplicatas, labels e paginas ocultas.
- `project.overrides`: texto, imagem, motion e componente editavel.
- `project.activePage` e `project.selectedElement`: estado minimo de UI.

Implementado:

- Botao `Exportar` para baixar JSON versionado.
- Botao `Importar` para ler JSON local, validar versao/formato e sanitizar dados.
- Backup local antes de importar ou restaurar original.
- Botao `Restaurar original` com confirmacao e reset do draft local.
- Player aceita documento exportado por mensagem `mattar:set-project`, alem das mensagens existentes `mattar:set-structure` e `mattar:set-overrides`.
- Ausencia de projeto exportado mantem `index.html` como apresentacao original.

Arquivos alterados/criados:

- `editor/index.html`: controles de exportacao, importacao, reset seguro e input de arquivo.
- `editor/editor.js`: formato de projeto, validacao, backup, exportacao, importacao e reset.
- `app.js`: receptor opcional `mattar:set-project` no player.
- `docs/editor/USER_GUIDE.md`: guia de uso.
- `docs/editor/PROJECT_FORMAT.md`: contrato JSON.
- `docs/editor/KNOWN_LIMITATIONS.md`: limitacoes conhecidas.
- `docs/editor/COVERAGE.md`: cobertura final atualizada.

Validacao:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/index.html`: `200 OK`.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.

Limitacoes:

- Sem backend, publicacao online ou sincronizacao.
- Sem lista visual de backups.
- Sem ferramenta nova de screenshot ou teste visual automatizado.
- Build formal nao existe nesta pasta por ausencia de `package.json`; a validacao estavel continua sendo sintaxe e servidor estatico.
## 2026-07-13 - editor/09-direct-text-selection-ux

Objetivo: criar selecao textual consistente e permitir edicao direta de texto no canvas, sem implementar imagem, upload, drag, resize ou reorganizacao de paginas.

Diagnostico:

- Registrado em `docs/editor/DIRECT_EDITING_IMPLEMENTATION.md` antes das alteracoes.
- Causa principal identificada: selecao antiga guardava somente `elementId`, sem `pageId`, permitindo que o inspector continuasse apontando para elemento de outra pagina.

Paginas obrigatorias convertidas:

- `08-transicao-a-obra:base`: `title`, `lead`.
- `09-elementos-da-linguagem:base`: `title`, `lead`, `body-0`, `body-1`.
- `16-projetos-como-aplicacao:base`: `title`, `lead`, `body-0`, `body-1`.

Arquivos alterados/criados:

- `app.js`: adiciona slots textuais diretos, IDs estaveis, `contenteditable` somente no texto selecionado e mensagens `mattar:text-input`/`mattar:text-commit`.
- `editor/editor.js`: adiciona modelo `selection` com `pageId`, `elementId`, `elementType: text`; limpa selecao ao trocar de pagina; aceita overrides textuais dos novos slots; persiste selecao versionada com fallback legado.
- `styles.css`: adiciona foco/caret para texto editavel direto, sem mudar tipografia ou layout.
- `docs/editor/DIRECT_EDITING_IMPLEMENTATION.md`: diagnostico restrito da etapa.

Preservacao:

- Sem upload.
- Sem drag/resize.
- Sem edicao de imagem nesta etapa.
- Sem nova rota ou backend.
- A apresentacao original segue acessivel por `index.html`.

Validacao:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- Simulacao estrutural confirmou IDs textuais nas paginas 08, 09 e 16.
- `http://127.0.0.1:4174/index.html`: `200 OK`.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.

Limitacoes:

- A edicao direta e textual simples; nao ha rich text.
- O undo/redo do historico do editor continua baseado em snapshots de overrides e pode ser granular em edicoes diretas confirmadas.
- Validacao visual interativa no browser embutido segue limitada por ACL do ambiente.


### Ajuste de estabilidade da edicao direta

- A edicao direta no canvas agora guarda o snapshot anterior de `overrides` antes da primeira tecla e usa esse snapshot no commit do texto.
- Undo/redo voltam a restaurar corretamente o estado anterior de uma edicao feita diretamente no canvas.
- O snapshot temporario e limpo ao trocar de pagina ou selecionar outro elemento textual, evitando historico cruzado entre paginas.
- Validacao repetida: `node --check app.js` e `node --check editor/editor.js` sem erros.

## 2026-07-13 - editor/10-ux2-contextual-inspector

Objetivo: reorganizar a interface do editor, reduzir metadados permanentes, ampliar a area util do canvas e tornar o inspector contextual depois da edicao direta de texto.

Estrutura anterior:

- Barra superior misturava navegacao, exportacao/importacao, preview e status tecnico da pagina.
- Navegador lateral exibia varias acoes permanentes pequenas por pagina.
- Inspector sempre iniciava por metadados tecnicos e depois empilhava controles de texto, midia, motion e componentes.
- Mensagens de familia bloqueada, controles futuros e selecao manual de titulo podiam ocupar a area principal.

Nova estrutura:

- Barra superior mantem nome do editor, recolher paginas/inspector, undo, redo, zoom, preview, exportar, importar, restaurar e abrir original.
- Navegador lateral mostra secao, indice, titulo, miniatura textual, estado e um unico menu contextual `...` por pagina.
- Canvas ganha mais area com topbar menor, paineis mais estreitos e botoes para recolher lateral esquerda e inspector.
- Inspector alterna entre estado de pagina e estado de texto selecionado.
- Metadados tecnicos foram movidos para `Informacoes tecnicas`, recolhida por padrao.

Botoes removidos da superficie principal:

- Botoes permanentes por pagina para mover, duplicar, ocultar e renomear.
- Botao manual `Selecionar titulo`.
- Area `Controles futuros`.
- Mensagem `Familia bloqueada` no inspector principal.
- Undo/redo duplicados no inspector principal, realocados para a barra superior.

Controles realocados:

- Acoes de pagina secundarias foram para o menu contextual `...` e para a area de acoes da pagina ativa no inspector.
- Motion permanece em secao recolhivel.
- Componente interativo permanece recolhivel quando aplicavel.
- Dados tecnicos ficam em secao recolhivel, nao no topo do inspector.

Texto selecionado:

- Inspector mostra primeiro `Conteudo`, sincronizado com o canvas.
- Adicionados controles tipograficos incrementais: fonte, peso, tamanho, entrelinha, tracking, alinhamento e cor.
- Adicionados controles de caixa: largura e overflow, com altura/quebra de linha preservadas pelo template.
- Controles usam valores fechados do sistema visual existente.
- Mudancas integram overrides, persistencia, preview e historico undo/redo.
- Drafts antigos em que texto era string continuam aceitos; novos overrides podem ser `{ text, style }`.

Arquivos alterados:

- `editor/index.html`: reorganizacao da barra superior, remocao de `future-controls`, novo inspector contextual e botoes de recolher paineis.
- `editor/editor.js`: menus contextuais por pagina, inspector de pagina/texto, controles tipograficos, estado de paineis recolhidos, undo/redo global e sanitizacao de overrides textuais com estilo.
- `editor/editor.css`: layout mais compacto, paineis recolhiveis, menu `...`, inspector em secoes recolhiveis e canvas com mais area util.
- `app.js`: renderizador real passa a aplicar overrides textuais em formato legado string ou novo `{ text, style }`.
- `styles.css`: feedback visual de selecao/edicao textual suavizado.

Validacao:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4174/index.html`: `200 OK`.

Capturas:

- Tentativa de conexao ao navegador interno falhou por ACL do ambiente (`windows sandbox failed: helper_unknown_error: apply deny-read ACLs`).
- Procedimento manual de comparacao: abrir `http://127.0.0.1:4174/editor/index.html`, selecionar uma pagina sem elemento, confirmar inspector de pagina; clicar em um texto editavel nas paginas 08, 09 ou 16, confirmar inspector de texto e alterar tipografia; recolher paginas/inspector; entrar em Preview e confirmar correspondencia visual.

Limitacoes:

- Sem imagens, upload, drag de elementos, resize ou nova reorganizacao de paginas nesta etapa.
- Controles tipograficos sao fechados em presets simples; nao ha editor tipografico livre.
- Captura automatizada nao foi produzida por restricao de ACL do ambiente.
- O codigo preserva funcionalidades de midia/motion/carrossel ja existentes, mas elas nao foram ampliadas nesta etapa.

## 2026-07-13 - editor/11-ux4-direct-manipulation

Objetivo: implementar a primeira manipulacao espacial direta no canvas e reordenacao das paginas por drag and drop, sem criar selecao multipla, grupos, timeline, backend ou componentes novos.

Premissa ajustada:

- A etapa UX 3 completa, com biblioteca visual de assets e arquivos locais, ainda nao esta implementada nesta base.
- Esta etapa usa os elementos ja existentes e convertidos: textos editaveis e slots de imagem ja aprovados em etapas anteriores.

Elementos livres:

- Textos com `data-editor-element-kind="text"` nas paginas ja convertidas, incluindo 08, 09 e 16.
- Slots de imagem com `data-editor-element-kind="media"` nas paginas de conteudo ja convertidas.

Elementos bloqueados:

- Estrutura da pagina, fundo, transicoes, chrome da apresentacao, carrossel como componente estrutural e imagens internas nao convertidas.
- Elementos bloqueados pelo controle de camada nao respondem a drag/resize.

Estrategia de drag e resize:

- Sem biblioteca externa.
- O iframe da apresentacao real detecta pointer drag/resize no elemento selecionado.
- Durante o movimento, o layout e aplicado temporariamente no proprio elemento para feedback imediato.
- O editor recebe mensagens `mattar:layout-input` e `mattar:layout-commit` e grava `layout` dentro do override existente.
- Textos movidos ou redimensionados nao escalam tipografia; resize altera a largura da caixa.
- Imagens preservam proporcao no resize direto.
- Snapping minimo cobre grid de 6px, bordas e centro da pagina.
- Guias horizontal/vertical aparecem durante drag/resize.

Camadas e acoes contextuais:

- Inspector passa a exibir acoes de camada para o elemento selecionado: trazer para frente, subir, descer, enviar para tras, bloquear/desbloquear e ocultar/reexibir.
- Delete/Backspace ocultam o elemento selecionado quando nao ha campo de texto ativo.
- Escape limpa a selecao.
- Setas movem o elemento selecionado; Shift + setas move em passo maior.
- Ctrl/Cmd + Z e Ctrl/Cmd + Shift + Z acionam undo/redo.

Reorganizacao de paginas:

- Cada pagina no navegador lateral agora e arrastavel.
- O drop mostra linha de insercao antes/depois da pagina alvo.
- A ordem e atualizada ao soltar, preservando `sourceId`, `instanceId`, overrides e transicoes por fonte.
- O historico foi expandido para guardar snapshots de `overrides`, `structure` e `activePage`, permitindo undo/redo tambem para reorganizacao de paginas.

Acoes removidas/reduzidas:

- Reordenacao principal deixa de depender de botoes subir/descer; eles permanecem apenas no menu contextual como alternativa acessivel.
- Acoes de pagina continuam agrupadas no menu `...`.

Arquivos alterados:

- `app.js`: layout livre, aplicacao de transformacoes no renderizador real, drag/resize no canvas, snapping e guias.
- `editor/editor.js`: selecao de midia, overrides com `layout`, historico de estrutura, drag/drop de paginas, atalhos e acoes de camada.
- `styles.css`: handles, cursor, guias de snapping e feedback de manipulacao.
- `editor/editor.css`: feedback de drag/drop das paginas e controles de camadas.
- `docs/editor/IMPLEMENTATION_LOG.md`: registro da etapa.

Validacao:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4174/index.html`: `200 OK`.

Capturas:

- Captura automatica nao foi produzida porque a conexao ao navegador interno segue bloqueada por ACL do ambiente.
- Procedimento manual: abrir `/editor/index.html`, selecionar texto ou imagem convertida, arrastar no canvas, redimensionar pelo canto inferior direito, testar setas/Shift+setas, arrastar paginas na lateral, acionar Preview e comparar com o canvas.

Limitacoes:

- Nao ha selecao multipla.
- Nao ha duplicacao real de elementos individuais nesta etapa; duplicacao de pagina continua existente.
- Nao ha biblioteca completa de assets/arquivos locais porque a UX 3 ainda nao foi implementada nesta base.
- Snapping e propositalmente simples.
- Elementos estruturais e imagens internas nao convertidas continuam bloqueados.

## 2026-07-13 - editor/12-ux5-flow-consolidation

Objetivo: consolidar o fluxo real de edicao sem adicionar novas categorias de recurso.

Resultado do fluxo:

- Editor e apresentacao original validados em servidor estatico correto na porta `4176`.
- Fluxos de texto direto, tipografia, movimento/resize de elementos convertidos, crop de imagem convertida, organizacao de paginas, ocultacao, preview, exportacao e importacao JSON permanecem suportados.
- Fluxos dependentes da UX 3 completa continuam bloqueados: biblioteca visual de assets, importacao local de imagem e drag de asset da biblioteca.
- Duplicacao de elemento individual tambem segue bloqueada; duplicacao de pagina existe.

Bugs corrigidos:

- Preview nao recebe mais selecao ativa, evitando contornos de editor no modo de apresentacao.
- Ocultar elemento selecionado limpa a selecao quando ele passa a ficar oculto.
- Drag nao inicia sobre texto em modo de digitacao ativa, salvo com `Alt` pressionado.
- Escape dentro do texto editavel confirma o conteudo e sai da selecao visual no iframe.

Documentacao atualizada:

- `docs/editor/USER_FLOW.md`.
- `docs/editor/EDITABLE_ELEMENTS.md`.
- `docs/editor/KNOWN_LIMITATIONS.md`.
- `docs/editor/IMPLEMENTATION_LOG.md`.

Validacao:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- `http://127.0.0.1:4176/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4176/index.html`: `200 OK`.

Dependencias adicionadas:

- Nenhuma.

Capturas:

- Capturas automaticas nao foram produzidas porque a conexao ao navegador interno segue bloqueada por ACL do ambiente.

Limitacoes restantes:

- UX 3 completa ainda pendente nesta base.
- Duplicacao de elemento individual ainda pendente.
- Validacao interativa de reload/localStorage/export-import precisa ser feita manualmente no navegador por indisponibilidade de automacao visual.
## Hotfix - sincronizacao da pagina ativa no editor

Problema observado:

- Ao clicar em paginas no navegador lateral, a visualizacao no canvas podia permanecer na pagina anterior ou voltar apos o re-render do iframe.

Ajuste aplicado:

- `editor/editor.js`: apos selecionar uma pagina, o editor reenfileira a mensagem `mattar:select-slide` depois de sincronizar estrutura e overrides.
- `app.js`: o player passa a memorizar o indice solicitado pelo editor durante re-renders de estrutura e overrides, preservando a pagina clicada.

Validacao:

- `node --check editor/editor.js`: sem erros.
- `node --check app.js`: sem erros.
- `http://127.0.0.1:4176/editor/index.html`: `200 OK`.
Complemento do hotfix:

- `editor/editor.js`: a selecao de pagina agora usa o item inteiro do navegador lateral (`data-page-index`), nao apenas o botao interno.
- `editor/editor.js`: o reducer `select-page` limpa a selecao antiga no mesmo update quando ela nao pertence a nova pagina ativa.
- `editor/index.html` e `index.html`: scripts versionados para evitar cache antigo de `editor.js` e `app.js` durante testes locais.
Segundo complemento do hotfix:

- `editor/editor.js`: os cards do navegador lateral agora chamam `MATTAR_EDITOR_SELECT_PAGE` diretamente em `pointerdown`, evitando perda de clique causada por `draggable` ou pelo listener delegado.
- `editor/index.html`: cache-busting atualizado para `20260713-page-select-3`.
Terceiro complemento do hotfix de selecao:

- `editor/editor.js`: o card de pagina deixou de ser `draggable`, evitando conflito entre selecao e reorganizacao por arraste no card inteiro.
- `editor/editor.js`: o botao da pagina chama `MATTAR_EDITOR_SELECT_PAGE` diretamente via `onclick`.
- `editor/index.html`: adicionado seletor explicito `Pagina ativa` na barra superior, ligado ao mesmo fluxo de `selectPage`, para garantir selecao de qualquer pagina e diagnosticar falhas da lista lateral.
- `editor/index.html`: cache-busting atualizado para `20260713-page-select-6`.

Validacao:

- `node --check editor/editor.js`: sem erros.
- `http://127.0.0.1:4176/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4176/index.html`: `200 OK`.
## Estabilizacao do fluxo principal - 2026-07-14

Escopo:

- Navegacao entre paginas.
- Selecao de elementos no canvas.
- Inspector contextual de texto/imagem.
- Substituicao e enquadramento de imagem com assets existentes.

Correcoes aplicadas:

- `editor/editor.js`: adicionada identidade estavel `activePageId` para a pagina ativa, mantendo `activePage` apenas como indice derivado/compatibilidade.
- `editor/editor.js`: lista, topo, inspector, historico, persistencia, import/export e preview passam a derivar o indice ativo por `activePageIndex()`.
- `editor/editor.js`: `select-page` agora grava `activePageId` e limpa selecao que nao pertence a pagina ativa no mesmo update.
- `editor/editor.js`: `updateProperties()` agora decide entre inspector de pagina, texto e imagem a partir da selecao contextual real.
- `editor/editor.js`: inspector de imagem reconectado aos controles existentes de asset, object-fit e foco horizontal/vertical.
- `editor/index.html`: cache-busting atualizado para `20260714-stabilize-flow-1`.

Validacao local:

- `node --check editor/editor.js`: sem erros.
- `node --check app.js`: sem erros.
- `http://127.0.0.1:4176/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4176/index.html`: `200 OK`.

Observacao:

- A automacao visual do navegador interno permanece indisponivel neste ambiente por bloqueio de ACL; a validacao interativa final deve ser feita na aba do editor.
## Etapa 1 - cobertura textual completa - 2026-07-14

Checkpoint:

- Criado checkpoint local em `checkpoints/20260714-etapa1-text-baseline` porque este diretório não possui repositório Git detectável.

Arquivos modificados:

- `app.js`.
- `editor/editor.js`.
- `editor/index.html`.
- `index.html`.
- `docs/editor/TEXT_COVERAGE.md`.
- `docs/editor/IMPLEMENTATION_LOG.md`.

Mudanças:

- A cobertura textual passou a ser derivada de `data/slides.js`, mantendo IDs estáveis no formato `pageId:slot`.
- Todos os slides passam a reconhecer slots textuais para `section`, `title`, `eyebrow`, `topic`, `lead` e `body-*` quando presentes nos dados.
- A capa agora usa o mesmo renderizador textual editável para nome, headline e apoio.
- O rótulo de seção visível no chrome da apresentação é editável por página como `section-label`.
- O inspector textual voltou a resolver `originalTextForElement()` e `selectedTextInfo()` com role, original, override, estilo e layout.
- Taxonomia textual documentada em `docs/editor/TEXT_COVERAGE.md`.

Validação:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `http://127.0.0.1:4176/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4176/index.html`: `200 OK`.

Limitações desta etapa:

- O texto global fixo `LAB MATTAR` não foi convertido por não pertencer a uma página específica.
- Não foram implementados novos recursos de imagem, motion, componente, upload, backend ou timeline.
- A validação visual automatizada continua indisponível por bloqueio de ACL do ambiente; a validação final deve ser feita no navegador.
## Reversao - Etapa 1 textual - 2026-07-14

Pedido do usuario: a versao de cobertura textual completa nao estava agradavel.

Acoes:

- Restaurados `app.js`, `editor/editor.js`, `editor/index.html` e `editor/editor.css` a partir de `checkpoints/20260714-etapa1-text-baseline`.
- Removido `docs/editor/TEXT_COVERAGE.md`, criado na etapa revertida.
- `index.html` voltou a carregar `data/slides.js` e `app.js` com cache-busting `20260714-stabilize-flow-1`.

Validacao:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `http://127.0.0.1:4176/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4176/index.html`: `200 OK`.


## Correcao de paineis e componentes existentes - 2026-07-14

Pedido do usuario: apos a reversao, o inspector e as paginas nao estavam visiveis e os componentes editaveis existentes nao apareciam com clareza.

Acoes:

- Removida a regra responsiva que escondia automaticamente o inspector abaixo de 1080px.
- Mantidos os botoes manuais de recolher/mostrar Paginas e Inspector.
- Adicionados atalhos no inspector da pagina para selecionar os componentes ja suportados: titulo, imagem, motion e carrossel quando disponiveis.
- Atualizado o cache-busting do editor para `20260714-panels-editables-1`.

Validacao:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `http://127.0.0.1:4176/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4176/index.html`: `200 OK`.

Limitacoes:

- Esta correcao nao reintroduz a cobertura textual completa revertida.
- A validacao visual automatizada segue indisponivel por bloqueio de ACL do ambiente; validar no navegador com recarregamento forte.

## Correcao de edicao de textos alem dos titulos - 2026-07-14

Pedido do usuario: o editor ainda permitia editar somente titulos, enquanto textos corridos das paginas nao ficavam acessiveis.

Acoes:

- Criado checkpoint local em `checkpoints/20260714-fix-body-text-editing-baseline` antes da alteracao.
- Reintroduzido no editor o mapeamento minimo `elementId -> texto original` para `title`, `lead` e `body-*`.
- O inspector da pagina agora mostra a secao `Textos editaveis`, com botoes para titulo, subtitulo/abertura e paragrafos de corpo quando existem.
- O seletor textual foi generalizado para `data-select-text`, mantendo `Selecionar titulo` como compatibilidade interna.
- O player e o editor agora habilitam `lead` e `body-*` para paginas que ja usam o renderizador textual padrao, sem converter capa, labels globais ou um schema universal.
- Atualizado o cache-busting do editor para `20260714-body-text-editing-2`.

Validacao:

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `http://127.0.0.1:4176/editor/index.html`: `200 OK`.
- `http://127.0.0.1:4176/index.html`: `200 OK`.

Limites:

- Esta correcao cobre textos renderizados como `lead` e `body` no template real das paginas.
- Nao foram convertidos textos estruturais globais, capa, labels de chrome, upload, imagens, motion ou novos componentes.
