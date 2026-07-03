# Interface Mattar Prototype

This is the active Lab Mattar web app.

It contains three connected tools:

- `index.html`: public visual identity interface, editorial scenes, M intro motion, and project deck overlay.
- `editor.html`: project creation/editing tool for developed projects.
- `budget.html`: letterhead, budget, and proposal document tool.

## Local Run

Run the local server from this folder:

```txt
python local_editor_server.py
```

Then open:

```txt
http://127.0.0.1:4174/index.html
http://127.0.0.1:4174/editor.html
http://127.0.0.1:4174/budget.html
```

## Public Interface

The public interface is driven by:

```txt
index.html
styles.css
script.js
assets/data/projects.json
assets/editorial/
assets/project-media/
```

Direct scene links while the current scroll engine is active:

```txt
index.html?skipEntry=1&unit=0
index.html?skipEntry=1&unit=1
index.html?skipEntry=1&unit=2
index.html?skipEntry=1&unit=3
index.html?skipEntry=1&unit=4
```

## Project Editor

The editor reads and writes:

```txt
assets/data/projects.json
```

Use it for project title, cover, gallery, deck content, and media references.

## Budget Tool

The budget tool reads and writes:

```txt
assets/data/budget-document.json
assets/data/budget-models.json
assets/data/boticario-gastroperformance.json
assets/data/propostas/
```

It depends on `local_editor_server.py` for saving, creating, listing, and deleting budget/proposal documents.

## Asset Rules

- Use repository-relative asset paths only.
- Do not reference files directly from Desktop, Downloads, or Documents/Codex.
- Current editorial scene assets belong in `assets/editorial/`.
- Project deck media belongs in `assets/project-media/`.
- Runtime fonts belong in `assets/fonts/`.
- Historical brand references can stay in `assets/Lab Mattar/`.
- `backup_before_editorial_refactor/` is a recovery snapshot and should not be edited directly.

## Validation Checklist

- `script.js`, `editor.js`, and `budget.js` pass syntax checks.
- JSON files in `assets/data/` parse correctly.
- `index.html`, `editor.html`, and `budget.html` return HTTP 200 through the local server.
- The M intro interaction opens and advances frames.
- Project deck buttons open the deck overlay.
- `budget.html` loads with no 404 resources and the API responds at `/api/budget-documents`.
