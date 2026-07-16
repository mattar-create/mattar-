# Mattar Editor - User Guide

## Abrir

- Apresentacao original: `index.html`.
- Editor visual: `editor/index.html`.

A apresentacao original nao le draft local nem arquivo exportado por conta propria. Ela permanece como referencia limpa. O editor envia estrutura e overrides ao player dentro do iframe apenas durante o uso do editor/preview.

## Editar

1. Abra `editor/index.html`.
2. Use o navegador lateral para selecionar uma pagina.
3. Para paginas de conteudo convertidas, edite o titulo no inspector e confirme.
4. Nas paginas 02, 03, 06 e 12, use o painel de imagem para inserir asset existente, trocar asset, escolher `cover` ou `contain` e ajustar posicao X/Y.
5. Use `Preview` para navegar com o comportamento real da apresentacao.
6. Use `Voltar ao editor` para retornar aos paineis.

## Organizacao macro

No navegador lateral e possivel:

- mover paginas para cima/baixo;
- duplicar paginas;
- ocultar/reexibir paginas;
- renomear a identificacao interna da instancia.

O preview respeita a ordem do draft e ignora paginas ocultas.

## Motion e componente

- O painel de motion aparece nas paginas que usam a transicao real `slideshow-11`.
- O carrossel editavel permanece no componente real da pagina 21.

## Exportar projeto

1. Clique em `Exportar`.
2. O navegador baixa um arquivo `mattar-editor-project-YYYY-MM-DDTHH-MM-SS.json`.
3. Esse arquivo contem estrutura, paginas ocultas, overrides, motion, componente editavel e metadados minimos.

O arquivo nao inclui imagens, fontes ou bibliotecas. Ele referencia assets ja existentes no projeto.

## Importar projeto

1. Clique em `Importar`.
2. Selecione um `.json` exportado pelo editor.
3. O editor valida `kind`, `version`, estrutura e overrides.
4. Antes de substituir o draft atual, o editor cria backup local em `localStorage`.
5. O canvas e o preview passam a refletir o projeto importado.

Arquivos com versao incompatível, formato desconhecido ou dados invalidos sao rejeitados ou sanitizados sem quebrar a apresentacao.

## Restaurar original

Clique em `Restaurar original` para limpar o draft local e voltar a estrutura base. O editor pede confirmacao e cria backup local antes de substituir o estado.

## Persistencia

O draft de trabalho continua salvo em `localStorage` na chave `mattar-editor-draft:v3`. Backups de importacao/reset ficam em `mattar-editor-draft-backup:v1`.
