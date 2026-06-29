const DEFAULT_OWNER = "mattar-create";
const DEFAULT_REPO = "mattar-";
const DEFAULT_BRANCH = "main";
const DEFAULT_ROOT = "interface-mattar-prototipo";

function sendJson(response, statusCode, data) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Access-Control-Allow-Origin", process.env.BUDGET_ALLOWED_ORIGIN || "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.end(JSON.stringify(data));
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "novo-orcamento";
}

function normalizeDocumentPath(value = "assets/data/budget-document.json") {
  const path = String(value || "").trim().replace(/\\/g, "/").replace(/^\/+/, "");
  if (!path.startsWith("assets/data/") || !path.endsWith(".json")) {
    return "assets/data/budget-document.json";
  }
  return path;
}

function repoConfig() {
  return {
    owner: process.env.GITHUB_OWNER || DEFAULT_OWNER,
    repo: process.env.GITHUB_REPO || DEFAULT_REPO,
    branch: process.env.GITHUB_BRANCH || DEFAULT_BRANCH,
    root: process.env.BUDGET_GITHUB_ROOT || DEFAULT_ROOT,
    token: process.env.GITHUB_TOKEN || process.env.BUDGET_GITHUB_TOKEN,
  };
}

function contentPath(path) {
  const config = repoConfig();
  return `${config.root}/${normalizeDocumentPath(path)}`;
}

function apiPath(path) {
  return encodeURIComponent(path).replace(/%2F/g, "/");
}

async function githubRequest(path, options = {}) {
  const config = repoConfig();
  if (!config.token) {
    const error = new Error("GITHUB_TOKEN não configurado no ambiente.");
    error.statusCode = 500;
    throw error;
  }

  const response = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const error = new Error(payload.message || `GitHub respondeu ${response.status}`);
    error.statusCode = response.status;
    throw error;
  }

  return response.json();
}

async function githubGetContent(path) {
  const config = repoConfig();
  return githubRequest(`/contents/${apiPath(path)}?ref=${encodeURIComponent(config.branch)}`);
}

async function githubPutContent(path, document, message, sha = null) {
  const config = repoConfig();
  const body = {
    branch: config.branch,
    message,
    content: Buffer.from(`${JSON.stringify(document, null, 2)}\n`, "utf8").toString("base64"),
  };

  if (sha) body.sha = sha;

  return githubRequest(`/contents/${apiPath(path)}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

function documentLabelData(path, document) {
  return {
    path,
    client:
      document?.meta?.client ||
      document?.cover?.details?.find((item) => item.label?.toLowerCase().includes("cliente"))?.value ||
      "Documento",
    projectType: document?.meta?.projectType || document?.cover?.titleHighlight || "Orçamento",
  };
}

async function listDocuments() {
  const config = repoConfig();
  const folder = `${config.root}/assets/data`;
  const files = await githubGetContent(folder);
  const jsonFiles = Array.isArray(files) ? files.filter((file) => file.type === "file" && file.name.endsWith(".json")) : [];

  const documents = await Promise.all(
    jsonFiles.map(async (file) => {
      const path = `assets/data/${file.name}`;
      try {
        const fileData = await githubGetContent(`${config.root}/${path}`);
        const json = JSON.parse(Buffer.from(fileData.content || "", "base64").toString("utf8"));
        return documentLabelData(path, json);
      } catch {
        return { path, client: file.name.replace(".json", ""), projectType: "" };
      }
    }),
  );

  return documents.sort((a, b) => `${a.client} ${a.projectType}`.localeCompare(`${b.client} ${b.projectType}`, "pt-BR"));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

module.exports = async function handler(request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  try {
    if (request.method === "GET") {
      sendJson(response, 200, { documents: await listDocuments() });
      return;
    }

    if (request.method !== "POST") {
      sendJson(response, 405, { message: "Método não permitido." });
      return;
    }

    const body = await readBody(request);
    const action = body.action || "save";
    const document = body.document;

    if (!document || typeof document !== "object") {
      sendJson(response, 400, { message: "Documento inválido." });
      return;
    }

    if (action === "create") {
      const path = `assets/data/${slugify(body.name)}.json`;
      await githubPutContent(contentPath(path), document, `Cria modelo ${path.replace("assets/data/", "")}`);
      sendJson(response, 200, { path });
      return;
    }

    const path = normalizeDocumentPath(body.path);
    const current = await githubGetContent(contentPath(path));
    await githubPutContent(contentPath(path), document, `Atualiza ${path.replace("assets/data/", "")}`, current.sha);
    sendJson(response, 200, { path });
  } catch (error) {
    sendJson(response, error.statusCode || 500, { message: error.message || "Erro interno." });
  }
};
