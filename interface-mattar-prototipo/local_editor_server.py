from __future__ import annotations

import base64
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "assets" / "data" / "projects.json"


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

            self.write_json({"message": "Endpoint não encontrado."}, status=404)
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


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", 4174), LocalEditorHandler)
    print("Editor local Mattar em http://127.0.0.1:4174/editor.html")
    server.serve_forever()


if __name__ == "__main__":
    main()
