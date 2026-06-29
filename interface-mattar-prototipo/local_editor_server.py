from __future__ import annotations

import base64
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "assets" / "data" / "projects.json"
BUDGET_DATA_PATH = ROOT / "assets" / "data" / "budget-document.json"


def safe_path(relative_path: str) -> Path:
    candidate = (ROOT / unquote(relative_path).replace("\\", "/")).resolve()
    if ROOT not in candidate.parents and candidate != ROOT:
        raise ValueError("Caminho fora do projeto.")
    return candidate


class LocalEditorHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml; charset=utf-8",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.end_headers()

    def do_GET(self) -> None:
        try:
            parsed = urlparse(self.path)

            if parsed.path == "/api/budget-documents":
                self.write_json({"documents": self.list_budget_documents()})
                return

            super().do_GET()
        except Exception as error:
            self.write_json({"message": str(error)}, status=400)

    def do_POST(self) -> None:
        try:
            parsed = urlparse(self.path)
            payload = self.read_json()

            if parsed.path == "/api/write-file":
                self.write_file(payload)
                self.write_json({"ok": True})
                return

            if parsed.path == "/api/save-projects":
                self.save_projects(payload)
                self.write_json({"ok": True})
                return

            if parsed.path == "/api/save-budget-document":
                self.save_budget_document(payload)
                self.write_json({"ok": True})
                return


            if parsed.path == "/api/create-budget-document":
                document_path = self.create_budget_document(payload)
                self.write_json({"ok": True, "path": document_path})
                return
            self.write_json({"message": "Endpoint nÃ£o encontrado."}, status=404)
        except Exception as error:
            self.write_json({"message": str(error)}, status=400)

    def read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length)
        return json.loads(raw.decode("utf-8"))

    def write_json(self, payload: dict, status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def write_file(self, payload: dict) -> None:
        relative_path = payload.get("path")
        content_base64 = payload.get("contentBase64")

        if not relative_path or not content_base64:
            raise ValueError("Envie path e contentBase64.")

        target = safe_path(relative_path)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(base64.b64decode(content_base64))

    def save_projects(self, payload: dict) -> None:
        projects = payload.get("projects")
        if not isinstance(projects, list):
            raise ValueError("Payload precisa conter projects.")

        DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
        DATA_PATH.write_text(json.dumps({"projects": projects}, ensure_ascii=False, indent=2), encoding="utf-8")

    def save_budget_document(self, payload: dict) -> None:
        document = payload.get("document")
        relative_path = payload.get("path") or "assets/data/budget-document.json"

        if not isinstance(document, dict):
            raise ValueError("Payload precisa conter document.")

        target = safe_path(relative_path)
        data_root = (ROOT / "assets" / "data").resolve()

        if data_root not in target.parents and target != BUDGET_DATA_PATH:
            raise ValueError("Documentos de orcamento devem ficar em assets/data.")

        if target.suffix.lower() != ".json":
            raise ValueError("Documento de orcamento precisa ser JSON.")

        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(document, ensure_ascii=False, indent=2), encoding="utf-8")

    def list_budget_documents(self) -> list[dict]:
        data_root = (ROOT / "assets" / "data").resolve()
        documents = []

        for target in sorted(data_root.glob("*.json")):
            if target.name == "projects.json":
                continue

            try:
                data = json.loads(target.read_text(encoding="utf-8-sig"))
            except Exception:
                continue

            if not isinstance(data, dict) or "cover" not in data:
                continue

            details = data.get("cover", {}).get("details", [])
            client = next(
                (
                    item.get("value")
                    for item in details
                    if isinstance(item, dict) and "cliente" in item.get("label", "").lower()
                ),
                data.get("meta", {}).get("client", ""),
            )
            project_type = data.get("meta", {}).get("projectType") or data.get("cover", {}).get("titleHighlight", "")

            documents.append(
                {
                    "path": target.relative_to(ROOT).as_posix(),
                    "name": target.stem,
                    "title": data.get("meta", {}).get("documentTitle", "Estimativa Orçamentária"),
                    "client": client,
                    "projectType": project_type,
                    "updated": target.stat().st_mtime,
                }
            )

        return documents

    def create_budget_document(self, payload: dict) -> str:
        document = payload.get("document")
        requested_name = payload.get("name") or "novo-orcamento"

        if not isinstance(document, dict):
            raise ValueError("Payload precisa conter document.")

        safe_name = "".join(ch.lower() if ch.isalnum() else "-" for ch in requested_name)
        safe_name = "-".join(part for part in safe_name.split("-") if part) or "novo-orcamento"
        data_root = (ROOT / "assets" / "data").resolve()
        target = (data_root / f"{safe_name}.json").resolve()

        if target.exists():
            suffix = 2
            while True:
                candidate = target.with_name(f"{safe_name}-{suffix}.json")
                if not candidate.exists():
                    target = candidate
                    break
                suffix += 1

        if data_root not in target.parents:
            raise ValueError("Documento fora de assets/data.")

        target.write_text(json.dumps(document, ensure_ascii=False, indent=2), encoding="utf-8")
        return target.relative_to(ROOT).as_posix()


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", 4174), LocalEditorHandler)
    print("Editor local Mattar em http://127.0.0.1:4174/editor.html")
    server.serve_forever()


if __name__ == "__main__":
    main()
