# User Flow - UX 5 Consolidation

Data: 2026-07-13
Servidor validado: `http://127.0.0.1:4176/`

## Resultado do fluxo obrigatorio

1. Abrir editor: validado por HTTP em `/editor/index.html` com `200 OK`.
2. Selecionar `09-elementos-da-linguagem:base`: suportado pelo navegador lateral e estrutura persistida.
3. Editar titulo diretamente: suportado para `09-elementos-da-linguagem:title`.
4. Editar corpo diretamente: suportado para `09-elementos-da-linguagem:body-0` e `body-1`.
5. Alterar propriedades tipograficas: suportado para textos selecionados via inspector contextual.
6. Inserir imagem da biblioteca: bloqueado; biblioteca visual de assets da UX 3 ainda nao existe nesta base.
7. Importar imagem local: bloqueado; importacao local/IndexedDB nao existe nesta base.
8. Mover/redimensionar imagem: suportado para slots de imagem ja convertidos, depois que uma imagem existente estiver no slot.
9. Substituir imagem existente: suportado para assets existentes nos slots convertidos.
10. Ajustar crop: suportado via `object-fit`, `object-position` e foco X/Y dos slots convertidos.
11. Duplicar elemento: bloqueado; duplicacao real de elemento individual ainda nao existe. Duplicacao de pagina existe.
12. Apagar elemento: parcial; Delete/Backspace oculta o elemento selecionado e limpa a selecao.
13. Reorganizar paginas: suportado por drag and drop no navegador lateral.
14. Ocultar pagina: suportado via menu contextual.
15. Desfazer/refazer acoes: suportado para overrides e estrutura de paginas.
16. Recarregar editor: persistencia usa `localStorage`; validacao interativa manual necessaria.
17. Confirmar persistencia: esperado via `localStorage`; sem automacao de browser disponivel por ACL.
18. Abrir preview: suportado; selecao visual nao e enviada ao preview.
19. Exportar: suportado por JSON versionado.
20. Importar novamente: suportado para JSON do projeto.
21. Abrir apresentacao original: validado por HTTP em `/index.html` com `200 OK`.

## Bugs corrigidos nesta consolidacao

- Preview nao recebe mais `mattar:set-selected-element` com elemento ativo, evitando contornos de editor no modo Preview.
- Ocultar elemento selecionado limpa a selecao quando o elemento passa a ficar oculto.
- Drag direto nao inicia sobre texto que esta ativo para digitacao, salvo com `Alt` pressionado.
- Escape dentro de texto editavel confirma o texto atual, remove foco e sai da selecao visual no iframe.

## Verificacoes

### Selecao

- Selecao e validada contra a pagina ativa por `pageId`.
- Troca de pagina limpa selecao que nao pertence a nova pagina.
- Preview nao recebe contorno de selecao.
- Elemento oculto por Delete/Backspace ou acao de camada deixa de permanecer selecionado.

### Texto

- Textos editaveis diretos: titulo, lead e corpos convertidos.
- Enter segue comportamento nativo de `contenteditable`.
- Escape confirma e sai da edicao no iframe.
- Inspector e canvas usam a mesma camada de overrides.

### Imagens

- Slots de imagem convertidos aceitam asset existente e crop.
- Importacao local e biblioteca visual permanecem pendentes.

### Paginas

- Drag and drop altera `structure` sem alterar `sourceId`/`instanceId`.
- Transicoes continuam ligadas ao slide fonte por `TRANSITION_MAP`.
- Paginas ocultas sao filtradas no player enviado ao preview.

### Historico

- Historico agora guarda snapshots de `overrides`, `structure` e `activePage`.
- Drag de elemento usa input ao vivo e commit unico ao soltar.
- Drag de pagina cria uma entrada por drop.

## Passos de uso

1. Abrir `http://127.0.0.1:4176/editor/index.html`.
2. Selecionar a pagina desejada no navegador lateral.
3. Clicar em um texto editavel no canvas para editar diretamente.
4. Usar o inspector para tipografia, caixa e camada.
5. Arrastar um elemento selecionado para mover; usar o canto inferior direito para redimensionar.
6. Arrastar paginas na lateral para reordenar.
7. Usar Preview para verificar o resultado final.
8. Exportar JSON para transportar o draft.

## Capturas

Capturas automaticas nao foram produzidas porque a conexao ao navegador interno segue bloqueada por ACL do ambiente. Procedimento manual: capturar o editor antes/depois pelo navegador em `http://127.0.0.1:4176/editor/index.html` e o preview apos clicar em `Preview`.
