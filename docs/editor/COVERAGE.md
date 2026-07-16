# Editor Coverage

Atualizado em 2026-07-13. Esta cobertura registra a expansao incremental das capacidades ja aprovadas e a estabilizacao do fluxo portatil de projeto. A familia convertida para edicao direta continua sendo `conteudo`; as demais familias estao mapeadas, mas permanecem bloqueadas para edicao direta ate validacao especifica.

## Familias reais

- `capa`: pagina de abertura tipografica.
- `conteudo`: paginas conceituais e editoriais sobre linguagem, metodo e elementos.
- `transicao`: paginas vermelhas de mudanca de capitulo.
- `projeto`: paginas de Aleteia e Urban Flora.
- `portfolio`: paginas de repertorio e formatos.
- `encerramento`: contato e sintese final.

## Capacidades reaplicadas nesta rodada

- Texto: titulo real (`h1`) das paginas da familia `conteudo`, com IDs estaveis no formato `<pageId>:title`.
- Imagem: slot incremental de imagem nas paginas de conteudo do tipo `text-image`, com IDs estaveis no formato `<pageId>:media`.
- Organizacao macro: permanece ativa para todas as paginas via estrutura persistida do draft.
- Motion: controle aprovado de `motion:transition11` permanece disponivel quando a transicao real da pagina e `slideshow-11`.
- Componente interativo: carrossel vertical aprovado permanece restrito a `21-transicao-repertorio-expansao:vertical-carousel`.

## Tabela de cobertura

| Pagina | Familia | Elementos editaveis | Elementos ainda fixos | Motion editavel | Componentes editaveis | Limitacoes | Status |
|---|---|---|---|---|---|---|---|
| 01 `01-capa` | capa | Organizacao macro | Titulo de capa, support, hero visual futuro | Nao | Nao | Familia nao convertida nesta rodada | Mapeada |
| 02 `02-a-artista` | conteudo | Titulo; imagem por asset existente; fit; posicao X/Y | Lead, corpo, highlights, layout e visualSlot | `slideshow-11` | Nao | Slot de imagem segue incremental; sem upload | Convertida e validada |
| 03 `03-origem-da-linguagem` | conteudo | Titulo; imagem por asset existente; fit; posicao X/Y | Lead, corpo, highlights, layout e visualSlot | Nao | Nao | Slot de imagem segue incremental; sem upload | Convertida e validada |
| 04 `04-transicao-a-linguagem` | transicao | Organizacao macro | Texto, fundo vermelho e composicao | Nao | Nao | Familia nao convertida nesta rodada | Mapeada |
| 05 `05-gastroperformance` | conteudo | Titulo | Lead, corpo, highlights e diagrama futuro | `slideshow-11` | Nao | Sem controle de imagem nesta etapa | Convertida e validada |
| 06 `06-refeicao-como-composicao` | conteudo | Titulo; imagem por asset existente; fit; posicao X/Y | Lead, corpo, highlights e layout | `slideshow-11` | Nao | Mantem comportamento aprovado das etapas 2 e 3 | Convertida e validada |
| 07 `07-diferencial-imersivo` | conteudo | Titulo | Lead, corpo, highlights e diagrama futuro | Nao | Nao | Sem controle de imagem nesta etapa | Convertida e validada |
| 08 `08-transicao-a-obra` | transicao | Organizacao macro | Texto e composicao vermelha | Nao | Nao | Familia nao convertida nesta rodada | Mapeada |
| 09 `09-elementos-da-linguagem` | conteudo | Titulo | Lead, corpo, highlights e grid futuro | `slideshow-11` | Nao | Sem controle de imagem nesta etapa | Convertida e validada |
| 10 `10-a-mesa` | conteudo | Titulo | Lead, corpo, highlights e imagem/hero futuro | `slideshow-11` | Nao | Sem controle de imagem nesta etapa | Convertida e validada |
| 11 `11-o-prato` | conteudo | Titulo | Lead, corpo, highlights e imagem/hero futuro | `slideshow-11` | Nao | Sem controle de imagem nesta etapa | Convertida e validada |
| 12 `12-imagem-som-espaco` | conteudo | Titulo; imagem por asset existente; fit; posicao X/Y | Lead, corpo, highlights, layout e visualSlot | `slideshow-11` | Nao | Slot de imagem segue incremental; sem upload | Convertida e validada |
| 13 `13-metodo` | conteudo | Titulo | Lead, corpo, highlights e diagrama futuro | `slideshow-11` | Nao | Sem controle de imagem nesta etapa | Convertida e validada |
| 14 `14-jornada-da-experiencia` | conteudo | Titulo | Lead, corpo, highlights e fluxo futuro | Nao | Nao | Sem controle de imagem nesta etapa | Convertida e validada |
| 15 `15-transicao-obras-principais` | transicao | Organizacao macro | Texto e composicao vermelha | Nao | Nao | Familia nao convertida nesta rodada | Mapeada |
| 16 `16-projetos-como-aplicacao` | projeto | Organizacao macro | Texto, cases, layout e slots visuais | Nao | Nao | Familia nao convertida nesta rodada | Mapeada |
| 17 `17-aleteia-definicao` | projeto | Organizacao macro | Texto, hero e atmosfera | `slideshow-11` | Nao | Familia nao convertida nesta rodada | Mapeada |
| 18 `18-aleteia-estrutura` | projeto | Organizacao macro | Texto, sequencia e dados de escala | Nao | Nao | Familia nao convertida nesta rodada | Mapeada |
| 19 `19-urban-flora-definicao` | projeto | Organizacao macro | Texto, hero e atmosfera | `slideshow-11` | Nao | Familia nao convertida nesta rodada | Mapeada |
| 20 `20-urban-flora-estrutura` | projeto | Organizacao macro | Texto, atos e estrutura visual | Nao | Nao | Familia nao convertida nesta rodada | Mapeada |
| 21 `21-transicao-repertorio-expansao` | transicao | Organizacao macro | Texto de transicao | Nao | Carrossel vertical aprovado | Componente editavel ja validado, familia transicao ainda nao convertida | Validada parcialmente |
| 22 `22-repertorio` | portfolio | Organizacao macro | Texto, grid/cards e navegacao futura | `slideshow-11` | Nao | Familia nao convertida nesta rodada | Mapeada |
| 23 `23-formatos-e-comissionamentos` | portfolio | Organizacao macro | Texto, cards e filtros futuros | Nao | Nao | Familia nao convertida nesta rodada | Mapeada |
| 24 `24-sintese-e-contato` | encerramento | Organizacao macro | Texto de contato e hierarquia final | Nao | Nao | Familia nao convertida nesta rodada | Mapeada |

## Comparacao visual da familia conteudo

Procedimento manual de comparacao, sem instalar ferramenta nova:

1. Abrir `http://127.0.0.1:4174/index.html` e navegar pelas paginas 02, 03, 05, 06, 07, 09, 10, 11, 12, 13 e 14 sem draft ativo.
2. Abrir `http://127.0.0.1:4174/editor/index.html`.
3. Selecionar cada pagina da familia `conteudo` no navegador lateral.
4. Confirmar que o canvas mostra a pagina real, nao uma reconstrução paralela.
5. Para paginas 02, 03, 06 e 12, inserir imagem existente, trocar asset, ajustar `cover/contain` e posicao X/Y; depois usar reset da imagem.
6. Para todas as paginas de conteudo, alterar temporariamente o titulo, entrar em Preview, voltar ao editor, executar undo/redo e reset da pagina.
7. Recarregar o editor e confirmar que o draft persistiu localmente; abrir `index.html` diretamente e confirmar que a apresentacao original nao mostra interface de editor.

## Portabilidade e estabilidade

- Exportacao JSON: `mattar-editor-project` versao `1`.
- Importacao JSON: valida `kind`, `version`, estrutura, overrides, assets, motion e componente.
- Backup local: criado antes de importar ou restaurar original em `mattar-editor-draft-backup:v1`.
- Reset seguro: `Restaurar original` volta ao estado base e preserva backup local.
- Player: continua original sem projeto; pode receber o documento por `mattar:set-project` ou receber estrutura/overrides separadamente pelo editor.
- Documentacao: `USER_GUIDE.md`, `PROJECT_FORMAT.md` e `KNOWN_LIMITATIONS.md`.

## Validacao executada

- `node --check app.js`: sem erros.
- `node --check editor/editor.js`: sem erros.
- `node --check data/slides.js`: sem erros.
- Export/import/reset: validado por sintaxe, contrato documentado e rotas estaticas; fluxo visual deve ser conferido no navegador usando `USER_GUIDE.md`.
- `http://127.0.0.1:4174/index.html`: `200 OK`.
- `http://127.0.0.1:4174/editor/index.html`: `200 OK`.

## Build

Nao ha `package.json` ou pipeline de build nesta pasta. A validacao de build desta etapa e a checagem sintatica dos scripts, mais a execucao pelo servidor estatico local ja usado nas etapas anteriores.


