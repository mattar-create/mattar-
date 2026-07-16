# Baseline Status

Data: 2026-07-12

## Escopo

Pasta analisada: `C:\Users\vitor\Desktop\Mattar\11_Criacao Codex - Simone Historia\Interface - ferramentas`

Pasta original preservada: `C:\Users\vitor\Desktop\Mattar\11_Criacao Codex - Simone Historia\Interface`

## Repositorio e checkpoint

- `C:\Users\vitor\Desktop\Mattar` nao e um repositorio Git.
- `Interface - ferramentas` tambem nao e um repositorio Git.
- Commit atual: nao disponivel, porque nao ha `.git` nesta arvore.
- Checkpoint equivalente criado por documentacao/hashes: `editor/00-baseline`.
- Arquivo de checkpoint: `checkpoints/editor-00-baseline.md`.

## Execucao

Modo funcional identificado:

- `file:///C:/Users/vitor/Desktop/Mattar/11_Criacao%20Codex%20-%20Simone%20Historia/Interface%20-%20ferramentas/index.html`
- `http://127.0.0.1:4174/` com servidor estatico local iniciado por `python -m http.server 4174 --bind 127.0.0.1`.

Confirmacao HTTP:

- `Invoke-WebRequest http://127.0.0.1:4174/` retornou `200 OK`.

## Build

Nao existe `package.json`, script de build ou pipeline local identificado nesta pasta. A apresentacao e um site estatico composto por `index.html`, `data/slides.js`, `app.js`, `styles.css`, assets locais e bibliotecas em `vendor/`.

Verificacoes executadas:

- `node --check app.js`: sem erros.
- `node --check data/slides.js`: sem erros.

## Erros e limitacoes preexistentes

- Nao ha protocolo anterior em `AGENTS.md` ou `docs/editor/EDITOR_RULES.md`; este arquivo de regras foi criado nesta etapa.
- A sandbox do Windows retornou `helper_unknown_error: apply deny-read ACLs` em algumas leituras recursivas e na automacao do navegador via plugin. Leituras necessarias foram refeitas com permissao elevada.
- A automacao de browser via Node REPL falhou antes de capturar telas por causa da mesma ACL. Nao foram instaladas ferramentas adicionais de screenshot.
- Ja existiam capturas gerais: `qa-desktop.png`, `qa-mobile.png`, `qa-mobile-500.png`.

## Arquivos centrais do baseline

- `index.html`: entrada, chrome fixo, overlay de transicao, imports.
- `data/slides.js`: dados dos 24 slides.
- `app.js`: renderizacao, navegacao, transicoes e binding de input.
- `styles.css`: layout, tipografia, paginas vermelhas e responsivo.
- `vendor/slideshow/gsap.min.js`: animacao.
- `vendor/slideshow/Observer.min.js`: presente, mas nao usado diretamente em `app.js`.
- `vendor/vertical-image-carousel/vertical-image-carousel.js`: inicializacao do carrossel vertical.
- `vendor/vertical-image-carousel/vertical-image-carousel.css`: animacao e layout do carrossel vertical.

## Paginas existentes

| Indice | Id | Secao | Tipo geral | Componente responsavel | Texto | Imagem | Motion | Interativo |
|---:|---|---|---|---|---|---|---|---|
| 0 | `01-capa` | Abertura | `cover` | `renderCover` | sim | nao renderizada | transicao de slide | navegacao global |
| 1 | `02-a-artista` | Origem do gesto | `text-image` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 2 | `03-origem-da-linguagem` | Origem do gesto | `text-image` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 3 | `04-transicao-a-linguagem` | Quando comer vira percepcao | `red-transition` | `renderTransition` | sim | carrossel vertical | slide + carrossel CSS | navegacao global |
| 4 | `05-gastroperformance` | Quando comer vira percepcao | `definition` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 5 | `06-refeicao-como-composicao` | Quando comer vira percepcao | `text-image` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 6 | `07-diferencial-imersivo` | Quando comer vira percepcao | `definition` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 7 | `08-transicao-a-obra` | A obra acontece entre elementos | `red-transition` | `renderTransition` | sim | carrossel vertical | slide + carrossel CSS | navegacao global |
| 8 | `09-elementos-da-linguagem` | A obra acontece entre elementos | `elements-list` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 9 | `10-a-mesa` | A obra acontece entre elementos | `object-focus` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 10 | `11-o-prato` | A obra acontece entre elementos | `object-focus` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 11 | `12-imagem-som-espaco` | A obra acontece entre elementos | `text-image` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 12 | `13-metodo` | A obra acontece entre elementos | `method` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 13 | `14-jornada-da-experiencia` | A obra acontece entre elementos | `journey` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 14 | `15-transicao-obras-principais` | Obras que abrem mundos | `red-transition` | `renderTransition` | sim | carrossel vertical | slide + carrossel CSS | navegacao global |
| 15 | `16-projetos-como-aplicacao` | Obras que abrem mundos | `project-intro` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 16 | `17-aleteia-definicao` | Aleteia | `project-case` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 17 | `18-aleteia-estrutura` | Aleteia | `project-case` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 18 | `19-urban-flora-definicao` | Urban Flora | `project-case` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 19 | `20-urban-flora-estrutura` | Urban Flora | `project-case` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 20 | `21-transicao-repertorio-expansao` | Portfolio | `red-transition` | `renderTransition` | sim | carrossel vertical | slide + carrossel CSS | navegacao global |
| 21 | `22-repertorio` | Portfolio | `repertoire-grid` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 22 | `23-formatos-e-comissionamentos` | Portfolio | `formats` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |
| 23 | `24-sintese-e-contato` | Contato | `closing` | `renderStandard` | sim | nao renderizada | transicao de slide | navegacao global |

Observacao: os campos `visualSlot`, `highlights`, `motionNote`, `topic` e `eyebrow` existem nos dados, mas a renderizacao atual usa principalmente `title`, `lead`, `body`, `section` e `pageType`.
