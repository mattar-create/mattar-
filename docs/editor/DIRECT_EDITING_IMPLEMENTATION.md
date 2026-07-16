# Direct Editing Implementation

## Diagnostico tecnico restrito

### Store do editor

O store atual fica em `editor/editor.js`, na variavel `state`, com reducer manual em `reduce(currentState, action)` e atualizacao por `dispatch(action)`.

### Pagina ativa

A pagina ativa e `state.activePage`, indice da instancia dentro de `state.structure`. A pagina fonte e resolvida por `activeInstance()` e `activeSlide()`.

### Elemento selecionado

Antes desta etapa, a selecao era guardada como string em `state.selectedElement`. Esse valor continha apenas `elementId`, sem `pageId` e sem tipo de elemento.

### Overrides

Os overrides ficam em `state.overrides`, indexados por IDs estaveis como `09-elementos-da-linguagem:title`, `06-refeicao-como-composicao:media`, `motion:transition11` e `21-transicao-repertorio-expansao:vertical-carousel`.

### Canvas

O canvas do editor e um iframe em `editor/index.html` com `src="../index.html?slide=0"`. Ele renderiza a apresentacao real por `app.js`; o editor envia mensagens `mattar:set-structure`, `mattar:set-overrides`, `mattar:set-selected-element` e `mattar:select-slide`.

### Codigo atual de edicao do titulo

A edicao textual anterior se concentrava em `editableControl()` no inspector e em `commit-title` no reducer. O canvas apenas enviava selecao por `mattar:element-selected`; a alteracao de texto vinha do textarea lateral e era enviada ao iframe por overrides.

### Restricoes por familia

A conversao textual estava presa a `CONTENT_TITLE_PAGE_IDS`, principalmente titulos de paginas de conteudo. Paginas de transicao e projeto apareciam como familia bloqueada porque nao havia elementos textuais declarados para elas no renderizador/editor.

### Persistencia

A persistencia usa `localStorage` com chave `mattar-editor-draft:v3`. O formato exportavel usa `mattar-editor-project` versao `1`.

### Undo e redo

Undo/redo guardam snapshots de `state.overrides` em `state.past` e `state.future`. Acoes como `commit-title`, `set-media`, `set-motion`, `set-carousel` e `reset-element` empurram historico por `pushHistory()`.

## Causa da selecao apontar para outra pagina

A selecao anterior nao carregava `pageId`; era apenas um `elementId`. Ao trocar `state.activePage`, o editor so limpava selecao em alguns casos, verificando se a nova pagina tinha titulo/midia convertidos. Isso deixava espaco para um `elementId` de outra pagina continuar no inspector e ser reenviado ao iframe por `mattar:set-selected-element`.

O modelo correto para esta etapa e:

```ts
type EditorSelection =
  | {
      pageId: string;
      elementId: string;
      elementType: "text";
    }
  | null;
```

A selecao deve ser validada contra a pagina ativa, e qualquer troca de pagina deve limpar uma selecao cujo `pageId` nao corresponda ao `sourceId` da nova pagina ativa.
