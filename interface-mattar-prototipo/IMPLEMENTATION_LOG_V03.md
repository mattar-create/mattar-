# IMPLEMENTATION_LOG_V03

## Escopo executado

- Backup anterior preservado em `backup_before_editorial_refactor/`.
- Auditoria e plano mantidos em `AUDIT_EXISTING_SYSTEM.md` e `DEVELOPMENT_PLAN_V03.md`.
- Assets editoriais copiados para `assets/editorial/`, sem caminhos absolutos no HTML/CSS/JS final.
- Estrutura principal reorganizada em cinco cenas: abertura, introducao, projetos, narrativa e proposta.
- Sistema antigo de decks/modais foi preservado e reaproveitado na cena de proposta.

## Preservado

- Motor de scroll e variaveis de progresso.
- Overlay `deck-overlay`.
- Funcoes de deck/modal: `openDeck`, `closeDeck`, `switchDeck`, `setActiveDeck`, navegacao por setas e navegacao interna de midias.
- Editor e budget externos: `editor.html`, `editor.js`, `budget.html`, `budget.js`, `editor.css`, `budget.css`.
- Arquivos de midia existentes em `assets/project-media/` e dados em `assets/data/projects.json`.

## Adaptado

- `index.html`: nova camada editorial com cinco cenas e miniaturas de comissionamento ligadas aos decks existentes.
- `styles.css`: tokens visuais editoriais, layouts das cenas, comportamento da introducao, proposta e responsividade.
- `script.js`: mapeamento de cinco cenas, inicializacao direta por `?unit=`, sequencia interativa da introducao e preservacao dos handlers antigos de decks.
- `assets/data/projects.json`: ampliado para os cinco projetos usados como miniaturas/decks na proposta.

## Interacoes verificadas

- `?skipEntry=1&unit=0` abre a cena de abertura.
- `?skipEntry=1&unit=1` abre a cena de introducao.
- Clique no M da introducao ativa o estado escuro da sequencia.
- Controle "proxima" da introducao troca `vector-0.png` para `vector-1.png`.
- `?skipEntry=1&unit=4` abre a cena de proposta.
- Clique em miniatura com `data-open-deck="dadiva"` abre o `deck-overlay` e ativa o deck `dadiva`.
- `editor.html` responde HTTP 200.
- `budget.html` responde HTTP 200.

## Verificacoes tecnicas

- `script.js` passou em `node --check`.
- `assets/data/projects.json` passou em `JSON.parse`.
- Busca por caminhos absolutos Windows em `index.html`, `styles.css` e `script.js` nao retornou ocorrencias.

## Observacoes

- A abertura usa imagem holder em mascara de M. Nenhum video especifico de abertura foi identificado no projeto durante a auditoria.
- Os PDFs continuam sendo a referencia para ajustes finos posteriores de escala, alinhamento e composicao.
- O sistema de modais finais foi mantido; as miniaturas da proposta agora funcionam como entrada para esses modais.

## Ajuste V05 - modal e responsividade

- O modal da introducao foi corrigido para ocultar o M-gatilho enquanto a sequencia esta aberta, evitando a duplicacao visual.
- Em mobile/tablet retrato, o texto da introducao e ocultado durante o modal para nao ficar por baixo do M.
- Foram adicionados controles de teclado ao modal da introducao: `Escape`, `ArrowLeft` e `ArrowRight`.
- O breakpoint ate 900px agora recebe layout responsivo dedicado para abertura, introducao, projeto, narrativa e proposta.
- A abertura mobile foi ajustada para impedir sobreposicao entre M e titulo.
- Validado no viewport estreito: abertura sem corte, projeto sem overflow, modal da introducao limpo.
- Validado na proposta: miniatura `dadiva` abre o `deck-overlay` e ativa o deck `dadiva`.

## Ajuste V07 - escala editorial

- A escala responsiva foi normalizada em um bloco final para reduzir conflito entre ajustes anteriores.
- Textos de projeto, narrativa e proposta foram reduzidos em desktop e mobile.
- Abertura mobile recebeu M menor/mais alto e titulo com respiro abaixo.
- Introducao mobile recebeu texto menor, menos margem vertical e M inativo invisivel.
- `applyInitialSection()` passou a ler os parametros atuais da URL e reaplicar a cena inicial apos o scroll programatico.
- Tentativa de migrar cenas para fluxo `sticky` foi revertida por gerar captura em branco no Chrome headless; o motor de cenas fixas foi preservado.

## Ajuste V09 - hierarquia responsiva e deep links

- Foi aplicada uma camada final de hierarquia responsiva para desktop, mobile retrato e mobile estreito.
- Abertura, Introducao, Projeto e Proposta foram recapturadas em viewport 599x898.
- `unit=1`, `unit=2` e `unit=4` passaram a renderizar a cena correta sem cair de volta na Abertura.
- A trava `forcedInitialUnit` preserva a cena indicada por URL ate o usuario interagir com scroll/toque/teclado.
- HTML atualizado para `styles.css?v=18` e `script.js?v=5`.

## Ajuste V10 - abertura em viewports menores

- A abertura recebeu uma camada final para retrato menor, evitando que `COMISSIONAMENTO` encoste ou atravesse a mascara do M.
- HTML atualizado para `styles.css?v=19`.
- Conferido no navegador do app em 390x844, 599x898, 820x1024 e 1024x1024.
- Em 390x844, 599x898 e 820x1024 o titulo fica abaixo do M com respiro vertical; em 1024x1024 a composicao volta para M a esquerda e texto a direita.
- Foram salvos screenshots de auditoria responsiva em `tmp/mattar-iab-responsive-v19/`.
