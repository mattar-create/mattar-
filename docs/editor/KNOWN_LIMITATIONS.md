# Known Limitations

## Escopo editavel atual

- O editor nao possui a UX 3 completa: nao ha biblioteca visual recolhivel de assets, drag de asset da biblioteca, nem importacao local persistente de arquivos.
- A insercao/substituicao de imagem funciona apenas por manifesto interno de assets existentes e nos slots de imagem ja convertidos.
- Duplicacao de elemento individual ainda nao existe; duplicacao de pagina existe.
- Delete/Backspace oculta o elemento selecionado; nao remove fisicamente do schema nem cria lixeira.
- Selecao multipla, grupos complexos, rotacao livre, constraints responsivos avancados, timeline e colaboracao nao existem.

## Texto

- Edicao direta cobre os elementos textuais convertidos; nem todos os textos da apresentacao sao livres.
- Controles tipograficos usam presets fechados do sistema visual, nao valores livres.
- Resize de texto altera largura da caixa; nao escala tipografia.

## Imagens

- Imagens locais importadas do computador ainda nao sao suportadas.
- Assets nao sao copiados para backend; tudo continua local ao navegador/projeto.
- Imagens estruturais especificas permanecem bloqueadas para preservar o template.

## Paginas

- Ordem de paginas persiste no draft local e no JSON exportado, mas nao altera `data/slides.js`.
- Miniaturas continuam sendo representacoes, nao screenshots reais.

## Persistencia

- O editor salva em `localStorage`; nao ha login, backend, publicacao online ou sincronizacao entre maquinas.
- O arquivo exportado referencia assets locais existentes. Se o projeto for movido sem os assets, imagens podem nao renderizar.

## Validacao visual

- Capturas automaticas nao foram produzidas porque a conexao ao navegador interno falhou por ACL do ambiente.
- A validacao visual segue por procedimento manual documentado em `USER_FLOW.md`.

## Build

- Esta pasta nao contem `package.json`; a validacao estavel disponivel e `node --check` mais servidor estatico local.
