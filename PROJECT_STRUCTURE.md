# Lab Mattar Repository Flow

This repository contains the Lab Mattar web system and the local tools used to maintain project content and budget/proposal documents.

## Active App

Use this folder as the source of truth for current work:

```txt
interface-mattar-prototipo/
```

The older files at the repository root are legacy prototype material. Keep current development inside `interface-mattar-prototipo/` unless the team decides to archive or remove the legacy root prototype.

## Tools

```txt
interface-mattar-prototipo/index.html
```

Public visual identity interface. It contains the editorial scenes, M motion/intro interaction, proposal entry points, and project deck overlay.

```txt
interface-mattar-prototipo/editor.html
```

Project creation and editing tool. It reads and writes `assets/data/projects.json` through the local server.

```txt
interface-mattar-prototipo/budget.html
```

Letterhead/budget/proposal document tool. It reads templates and proposal documents from `assets/data/` and saves through the local server.

```txt
interface-mattar-prototipo/local_editor_server.py
```

Local server used by both editor and budget tools. Run this before editing or saving data.

## Data

```txt
assets/data/projects.json
```

Project/deck data used by the public interface and editor.

```txt
assets/data/budget-document.json
assets/data/budget-models.json
assets/data/boticario-gastroperformance.json
assets/data/propostas/
```

Budget/proposal document templates, library data, and saved proposal documents.

## Assets

```txt
assets/editorial/
```

Current editorial scene images and M intro sequence.

```txt
assets/project-media/
```

Project deck media.

```txt
assets/fonts/
```

Runtime font files used by the interface, editor, and budget tool.

```txt
assets/Lab Mattar/
```

Historical brand/reference library. Do not use as the first place for new runtime assets unless the file is intentionally kept as a reference library item.

## External References

PDF layouts in `C:\Users\vitor\Desktop\Lab Mattar` are visual references for the final pages. Copy only selected runtime assets into this repository before referencing them from HTML, CSS, JS, or JSON.

Font source reference:

```txt
C:\Users\vitor\Documents\Codex\2026-06-10\files-mentioned-by-the-user-labmattar\outputs\interface-mattar-prototipo\assets\Lab Mattar\Recursos da Marca\03_Tipografia\univers-lt\
```

## Local Run

From `interface-mattar-prototipo/`:

```txt
python local_editor_server.py
```

Open:

```txt
http://127.0.0.1:4174/index.html
http://127.0.0.1:4174/editor.html
http://127.0.0.1:4174/budget.html
```

## Working Rules

- Keep `main` functional.
- Commit before large layout or asset reorganizations.
- Do not reference files directly from Desktop, Downloads, or Documents/Codex in runtime code.
- Keep experiments outside runtime paths or in a branch until selected.
- Preserve `backup_before_editorial_refactor/` as a recovery snapshot.
- Validate JS, JSON, and local HTTP routes before pushing.
