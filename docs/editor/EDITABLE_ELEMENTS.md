# Editable Elements

## Textos livres

Elementos com `data-editor-element-kind="text"` sao editaveis quando pertencem a paginas convertidas.

Paginas com edicao direta obrigatoria:

- `08-transicao-a-obra:base`: `title`, `lead`.
- `09-elementos-da-linguagem:base`: `title`, `lead`, `body-0`, `body-1`.
- `16-projetos-como-aplicacao:base`: `title`, `lead`, `body-0`, `body-1`.

Controles disponiveis:

- conteudo textual;
- fonte;
- peso;
- tamanho;
- entrelinha;
- tracking;
- alinhamento;
- cor;
- largura;
- overflow;
- movimento;
- resize de largura;
- camada;
- bloquear;
- ocultar.

## Imagens livres ou substituiveis

Slots convertidos:

- `02-a-artista:media`;
- `03-origem-da-linguagem:media`;
- `06-refeicao-como-composicao:media`;
- `12-imagem-som-espaco:media`.

Controles disponiveis:

- inserir/substituir por asset existente do manifesto interno;
- `object-fit`;
- foco X/Y;
- movimento;
- resize preservando proporcao;
- camada;
- bloquear;
- ocultar;
- reset.

## Componentes editaveis

- `21-transicao-repertorio-expansao:vertical-carousel`: colecao de assets existente, autoplay e duracao.

## Motion editavel

- `motion:transition11`: duracao, delay, easing, distancia da pagina e distancia do texto.

## Elementos bloqueados

- fundos;
- layout estrutural da pagina;
- transicoes nao convertidas;
- imagens internas nao marcadas como `media`;
- carrossel como objeto espacial no canvas;
- grupos e selecao multipla.
