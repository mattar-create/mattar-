# Mattar Project Format

Formato atual: `mattar-editor-project` versao `1`.

## Objetivo

O arquivo JSON exportado transporta apenas decisoes editoriais. Ele nao duplica codigo, assets, imagens, fontes ou bibliotecas.

## Estrutura

```json
{
  "kind": "mattar-editor-project",
  "version": 1,
  "app": "Lab Mattar Editor",
  "createdAt": "2026-07-13T16:30:00.000Z",
  "metadata": {
    "title": "Lab Mattar - Simone Mattar",
    "slideCount": 24,
    "activePage": 5,
    "exportedFrom": "editor/index.html"
  },
  "project": {
    "structure": [
      {
        "sourceId": "06-refeicao-como-composicao",
        "instanceId": "06-refeicao-como-composicao:base",
        "hidden": false,
        "label": ""
      }
    ],
    "overrides": {
      "06-refeicao-como-composicao:title": "Novo titulo",
      "06-refeicao-como-composicao:media": {
        "src": "213__DSF2886 1.png",
        "fit": "cover",
        "x": 50,
        "y": 50
      },
      "motion:transition11": {
        "duration": 0.56,
        "delay": 0.08,
        "easing": "sine.inOut",
        "distance": 5,
        "copyDistance": 20
      },
      "21-transicao-repertorio-expansao:vertical-carousel": {
        "items": ["213__DSF2886 1.png"],
        "autoplay": true,
        "duration": 42
      }
    },
    "activePage": 5,
    "selectedElement": ""
  }
}
```

## Campos

- `kind`: identificador do formato. Deve ser `mattar-editor-project`.
- `version`: versao do formato. A versao aceita nesta etapa e `1`.
- `metadata`: informacoes de transporte e diagnostico; nao controla renderizacao.
- `project.structure`: sequencia editada da apresentacao.
- `project.overrides`: alteracoes por IDs estaveis.
- `project.activePage`: pagina ativa sugerida ao importar.
- `project.selectedElement`: reservado para estado de UI, limpo na importacao.

## Validacao

Na importacao, o editor:

- rejeita `kind` desconhecido;
- rejeita versao diferente de `1`;
- remove paginas cujo `sourceId` nao exista em `data/slides.js`;
- evita `instanceId` duplicado;
- garante ao menos uma pagina visivel;
- descarta overrides desconhecidos;
- valida assets contra manifestos existentes;
- limita valores numericos de motion e posicao.

## Player

O player continua original quando aberto diretamente. Quando usado pelo editor ou por outro controlador, pode receber:

- `mattar:set-structure` com `project.structure`;
- `mattar:set-overrides` com `project.overrides`;
- ou `mattar:set-project` com o documento completo exportado.
