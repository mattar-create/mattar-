# Editor Rules

## Protocolo para implementacao incremental

Esta apresentacao deve continuar funcionando como apresentacao antes, durante e depois de cada etapa do editor visual.

## Regras de preservacao

- Nao alterar a pasta original `../Interface`; todo trabalho acontece em `Interface - ferramentas`.
- Nao duplicar toda a base para criar versoes. Usar checkpoints leves, logs e commits/branches quando houver repositorio Git.
- Antes de qualquer mudanca estrutural, registrar baseline em `docs/editor/BASELINE_STATUS.md` e atualizar `docs/editor/IMPLEMENTATION_LOG.md`.
- Se houver Git, registrar commit atual e criar branch/checkpoint equivalente a `editor/00-baseline`.
- Se nao houver Git, registrar explicitamente a ausencia de commit e criar checkpoint por hashes dos arquivos centrais.

## Regras de implementacao

- Implementar o editor de forma incremental, partindo de casos reais documentados em `docs/editor/SELECTED_CASES.md`.
- Nao criar schema universal antes de validar controles em paginas concretas.
- Nao criar store global do editor antes de existir necessidade comprovada por pelo menos um caso funcional.
- Nao criar rota de editor antes de preservar e validar a rota/mode atual da apresentacao.
- Nao refatorar componentes de pagina como preparacao abstrata.
- Nao corrigir problemas preexistentes que nao bloqueiam a analise ou a etapa atual.
- Nao instalar dependencias sem necessidade clara e sem registrar o motivo.

## Contrato visual

- A apresentacao funcional atual deve permanecer acessivel por `index.html`.
- Textos continuam vindo de `data/slides.js` ate que uma etapa posterior defina outro fluxo.
- A navegacao por teclado, roda do mouse e toque deve permanecer intacta.
- Transicoes GSAP e carrossel vertical devem continuar funcionando quando suas bibliotecas locais estiverem presentes.

## Criterio para novas etapas

Cada etapa deve declarar:

- paginas afetadas;
- arquivos tocados;
- controles adicionados;
- propriedades fixas mantidas;
- metodo de comparacao visual;
- erros preexistentes que nao foram corrigidos.
