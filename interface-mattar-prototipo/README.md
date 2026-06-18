# Interface Mattar | Protótipo de Leitura

Este protótipo transforma as páginas estáticas em uma leitura web contínua:
o texto rola, enquanto o campo visual fica fixo e o vermelho se concentra em
um elemento gráfico lateral.

## Navegação direta

- `index.html#comissionamento`
- `index.html#pesquisa`
- `index.html#producao`
- `index.html#registros`

## Editor de projetos

O modo de edição fica separado da interface principal:

- `editor.html`

Ele edita os projetos de:

- `assets/data/projects.json`

Durante desenvolvimento local, abra o editor pelo servidor de edição:

```txt
python local_editor_server.py
http://127.0.0.1:4174/editor.html
```

Esse servidor grava `assets/data/projects.json` e os arquivos adicionados em
`assets/projects/<id-do-projeto>/`.

O editor controla conteúdo, imagem de capa, galeria e posição da capa dentro do
grid aprovado. Ele não libera diagramação livre, para manter texto alinhado e
imagens preenchendo os espaços definidos.

A galeria aceita:

- imagens locais;
- vídeos locais;
- links externos de vídeo, como YouTube ou Vimeo.

## Direção atual

- Primeira tela integralmente vermelha.
- Texto inicial com quebras de linha controladas no HTML.
- Tipografia Univers Roman 55.
- Linha superior fixa como régua de leitura.
- Acento móvel acompanha o progresso do scroll.
- Grid estrutural de 12 colunas por 12 linhas, invisível por padrão.
- O vermelho não aparece como faixa de divisão entre páginas.
- A galeria de projetos é carregada a partir de `assets/data/projects.json`.
- Cada projeto usa o template validado da DÁDIVA: texto + capa no primeiro slide e galeria com uma imagem por vez no segundo slide.

## Inspeção de grid

O grid não aparece na versão final. Para revisar alinhamentos, adicione
temporariamente `data-grid="visible"` na tag `<body>` do `index.html`.
