const DATA_PATH = "assets/data/projects.json";
const DRAFT_KEY = "mattar-project-editor-draft";
const PREVIEW_KEY = "mattar-projects-preview";
const API_BASE = location.protocol === "file:" ? "http://127.0.0.1:4174" : "";
const canWriteRepositoryFiles = location.protocol === "file:" || ["localhost", "127.0.0.1"].includes(location.hostname);
const PROJECT_MEDIA_ASSETS = [
  "assets/project-media/concha-1.png",
  "assets/project-media/concha-2.png",
  "assets/project-media/concha-cover.png",
  "assets/project-media/concreto-1.png",
  "assets/project-media/concreto-2.png",
  "assets/project-media/concreto-3.png",
  "assets/project-media/concreto-capa.png",
  "assets/project-media/dadiva-1.png",
  "assets/project-media/dadiva-2.png",
  "assets/project-media/dadiva-capa.png",
  "assets/project-media/fome-01.png",
  "assets/project-media/fome-02.png",
  "assets/project-media/fome-03.png",
  "assets/project-media/fome-04.png",
  "assets/project-media/fome-capa.png",
  "assets/project-media/gelu-02.png",
  "assets/project-media/gelu-03.png",
  "assets/project-media/gelu-04.png",
  "assets/project-media/gelu-05.png",
  "assets/project-media/geluminas-cover.png",
  "assets/project-media/soviet-1.png",
  "assets/project-media/soviet-capa.png",
  "assets/project-media/soviet-link.png",
];
const MEDIA_PATH_ALIASES = {
  "assets/project-media/dadiva-01.png": "assets/project-media/dadiva-1.png",
  "assets/project-media/dadiva-02.png": "assets/project-media/dadiva-2.png",
  "assets/project-media/dadiva-03.png": "assets/project-media/dadiva-2.png",
  "assets/project-media/dadiva-04.png": "assets/project-media/dadiva-2.png",
  "assets/project-media/dadiva-05.png": "assets/project-media/dadiva-2.png",
  "assets/project-media/concha-01.png": "assets/project-media/concha-1.png",
  "assets/project-media/concha-02.png": "assets/project-media/concha-2.png",
  "assets/project-media/concreto-01.png": "assets/project-media/concreto-1.png",
  "assets/project-media/concreto-02.png": "assets/project-media/concreto-2.png",
  "assets/project-media/concreto-03.png": "assets/project-media/concreto-3.png",
  "assets/project-media/soviet-01.png": "assets/project-media/soviet-1.png",
};

const state = {
  projects: [],
  selectedIndex: 0,
  pendingFiles: new Map(),
  autosaveTimer: null,
  isSaving: false,
};

const elements = {
  list: document.querySelector("#project-list"),
  form: document.querySelector("#project-form"),
  galleryEditor: document.querySelector("#gallery-editor"),
  mediaAssets: document.querySelector("#media-assets"),
  preview: document.querySelector("#preview-page"),
  previewFrame: document.querySelector("#preview-frame"),
  status: document.querySelector("#editor-status"),
};

const templateProject = {
  id: "dadiva",
  title: "DÁDIVA",
  year: "2022",
  description:
    "A gastroperformance Dádiva, apresentada no pavilhão da Bienal durante o evento Geração Senac, propôs uma experiência sensorial inspirada na teoria da reciprocidade de Marcel Mauss. Os participantes percorriam um túnel de labaredas após receberem um fósforo comestível de chocolate e, no ato final, eram convidados a refletir sobre uma vontade interna, depositando simbolicamente sua chama em um pote de ouro. A ação terminava com a escolha entre um biscoito de água ou de fogo, representando permanência ou início.",
  cover: "assets/project-media/dadiva-capa.png",
  gallery: [
    { type: "image", src: "assets/project-media/dadiva-1.png" },
    { type: "image", src: "assets/project-media/dadiva-2.png" },
  ],
  layout: {
    coverCol: 7.35,
    coverRow: 2.1,
    coverWidth: 3,
    coverHeight: 8.9,
    coverPosition: "center center",
    textCol: 0.94,
    textRow: 6.48,
    textWidth: 5.85,
    textScale: 1,
  },
};

function cloneProject(project) {
  return JSON.parse(JSON.stringify(project));
}

function field(name) {
  return elements.form.elements.namedItem(name);
}

function currentProject() {
  return state.projects[state.selectedIndex] || state.projects[0];
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "projeto";
}

function normalizeMediaPath(value = "") {
  const path = String(value).trim().replace(/\\/g, "/");

  if (!path) {
    return "";
  }

  if (/^(https?:|data:|blob:)/i.test(path)) {
    return path;
  }

  const normalized = path.startsWith("assets/") ? path : `assets/project-media/${path.replace(/^\/+/, "")}`;
  return MEDIA_PATH_ALIASES[normalized] || normalized;
}

function setStatus(message, isError = false) {
  elements.status.textContent = message;
  elements.status.style.color = isError ? "#ce211a" : "";
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function scheduleLocalAutosave() {
  window.clearTimeout(state.autosaveTimer);
  state.autosaveTimer = window.setTimeout(() => {
    saveLocalRepository({ silent: true }).catch((error) => setStatus(error.message, true));
  }, 900);
}

function inferMediaType(src = "") {
  const clean = src.split("?")[0].toLowerCase();

  if (/youtube\.com|youtu\.be|vimeo\.com/.test(src)) {
    return "externalVideo";
  }

  if (/\.(mp4|webm|mov|m4v|ogg)$/.test(clean)) {
    return "video";
  }

  return "image";
}

function normalizeMediaItem(item) {
  if (typeof item === "string") {
    const src = normalizeMediaPath(item);
    return {
      type: inferMediaType(src),
      src,
    };
  }

  const src = normalizeMediaPath(item.src || "");
  return {
    type: item.type || inferMediaType(src),
    src,
    title: item.title || "",
  };
}

function normalizeProject(project) {
  const merged = {
    ...cloneProject(templateProject),
    ...project,
    layout: {
      ...templateProject.layout,
      ...(project.layout || {}),
    },
  };

  merged.id = merged.id || slugify(merged.title || "projeto");
  merged.cover = normalizeMediaPath(merged.cover || "");
  merged.gallery = (merged.gallery?.length ? merged.gallery : merged.slides || []).map(normalizeMediaItem);
  return merged;
}

function renderMediaAssetOptions() {
  if (!elements.mediaAssets) {
    return;
  }

  elements.mediaAssets.innerHTML = PROJECT_MEDIA_ASSETS.map((path) => `<option value="${path}"></option>`).join("");
}

async function loadProjects() {
  const draft = localStorage.getItem(DRAFT_KEY);

  if (draft) {
    state.projects = JSON.parse(draft).projects || [];
  } else {
    const response = await fetch(`${API_BASE}/${DATA_PATH}?v=${Date.now()}`, { cache: "no-store" });
    const data = response.ok ? await response.json() : { projects: [templateProject] };
    state.projects = data.projects || [templateProject];
  }

  if (!state.projects.length) {
    state.projects = [cloneProject(templateProject)];
  }

  state.projects = state.projects.map(normalizeProject);
}

function renderProjectList() {
  elements.list.innerHTML = state.projects.map((project, index) => `
    <button type="button" class="project-button${index === state.selectedIndex ? " is-active" : ""}" data-select-project="${index}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${project.title || "Projeto"}</strong>
    </button>
  `).join("");
}

function fillForm() {
  const project = currentProject();

  field("title").value = project.title || "";
  field("year").value = project.year || "";
  field("description").value = project.description || "";
  field("textCol").value = project.layout.textCol;
  field("textRow").value = project.layout.textRow;
  field("textWidth").value = project.layout.textWidth;
  field("textScale").value = project.layout.textScale;
  field("coverCol").value = project.layout.coverCol;
  field("coverRow").value = project.layout.coverRow;
  field("coverWidth").value = project.layout.coverWidth;
  field("coverHeight").value = project.layout.coverHeight;
  field("coverPosition").value = project.layout.coverPosition;
  field("coverPath").value = project.cover || "";
  field("coverFile").value = "";
  field("galleryFiles").value = "";
  field("galleryPath").value = "";
  updateOutputs();
  updateTextMeter();
  renderGalleryEditor();
  renderPreview();
}

function updateOutputs() {
  ["textCol", "textRow", "textWidth", "textScale", "coverCol", "coverRow", "coverWidth", "coverHeight"].forEach((name) => {
    document.querySelector(`[data-output="${name}"]`).textContent = field(name).value;
  });
}

function updateTextMeter() {
  const meter = document.querySelector("#text-meter");
  const text = field("description").value.trim();
  const characters = text.length;
  const words = text ? text.split(/\s+/).length : 0;
  const status = characters > 620 ? "texto longo: ajuste largura/escala ou reduza um pouco" : "faixa confortável para o card";

  meter.textContent = `${characters} caracteres / ${words} palavras - ${status}`;
}

function mediaPreviewMarkup(item, index) {
  const media = normalizeMediaItem(item);
  const previewSrc = item.previewSrc || media.src;

  if (media.type === "video") {
    return `<video src="${previewSrc}" muted playsinline preload="metadata"></video>`;
  }

  if (media.type === "externalVideo") {
    return `<span class="gallery-row__external">vídeo<br />link</span>`;
  }

  return `<img src="${previewSrc}" alt="" />`;
}

function renderGalleryEditor() {
  const project = currentProject();

  elements.galleryEditor.innerHTML = (project.gallery || []).map((item, index) => {
    const media = normalizeMediaItem(item);

    return `
      <div class="gallery-row">
        ${mediaPreviewMarkup(item, index)}
        <input class="gallery-row__path" value="${escapeHtml(media.src)}" data-gallery-src="${index}" aria-label="Caminho da mídia ${index + 1}" />
        <button type="button" data-remove-gallery="${index}">remover</button>
      </div>
    `;
  }).join("");
}

function renderPreview() {
  const project = currentProject();
  const title = project.year ? `${project.title} (${project.year})` : project.title;
  const cover = project.previewCover || project.cover;
  const style = [
    `--cover-col:${project.layout.coverCol}`,
    `--cover-row:${project.layout.coverRow}`,
    `--cover-width:${project.layout.coverWidth}`,
    `--cover-height:${project.layout.coverHeight}`,
    `--cover-position:${project.layout.coverPosition}`,
  ].join(";");
  const textStyle = [
    `--text-col:${project.layout.textCol}`,
    `--text-row:${project.layout.textRow}`,
    `--text-width:${project.layout.textWidth}`,
    `--text-scale:${project.layout.textScale}`,
  ].join(";");

  elements.preview.innerHTML = `
    <section class="preview-copy" style="${textStyle}">
      <h2>${title}</h2>
      <p>${project.description || ""}</p>
    </section>
    <figure class="preview-cover" style="${style}">
      <img src="${cover}" alt="${project.title || ""}" />
    </figure>
  `;

  const image = elements.preview.querySelector(".preview-cover img");
  image.addEventListener("load", () => {
    const ratio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 0.678;
    image.closest(".preview-cover").style.setProperty("--media-ratio", ratio.toFixed(4));
  }, { once: true });
}

function updateProjectFromForm() {
  const project = currentProject();

  project.title = field("title").value;
  project.year = field("year").value;
  project.description = field("description").value;
  project.id = slugify(project.title || project.id);
  project.cover = normalizeMediaPath(field("coverPath").value);
  delete project.previewCover;
  project.layout.textCol = Number(field("textCol").value);
  project.layout.textRow = Number(field("textRow").value);
  project.layout.textWidth = Number(field("textWidth").value);
  project.layout.textScale = Number(field("textScale").value);
  project.layout.coverCol = Number(field("coverCol").value);
  project.layout.coverRow = Number(field("coverRow").value);
  project.layout.coverWidth = Number(field("coverWidth").value);
  project.layout.coverHeight = Number(field("coverHeight").value);
  project.layout.coverPosition = field("coverPosition").value;
  updateOutputs();
  updateTextMeter();
  renderProjectList();
  renderPreview();
  publishPreviewData();
  scheduleLocalAutosave();
}

function addProject() {
  const next = cloneProject(templateProject);
  next.title = "Novo projeto";
  next.year = "";
  next.description = "Texto do projeto.";
  next.id = `novo-projeto-${Date.now().toString(36)}`;
  state.projects.push(normalizeProject(next));
  state.selectedIndex = state.projects.length - 1;
  renderAll();
  publishPreviewData();
  scheduleLocalAutosave();
}

function duplicateProject() {
  const source = cloneProject(currentProject() || templateProject);
  source.title = `${source.title} cópia`;
  source.id = `${slugify(source.title)}-${Date.now().toString(36)}`;
  state.projects.push(normalizeProject(source));
  state.selectedIndex = state.projects.length - 1;
  renderAll();
  publishPreviewData();
  scheduleLocalAutosave();
}

function deleteProject() {
  if (state.projects.length <= 1) {
    setStatus("Mantenha ao menos um projeto.", true);
    return;
  }

  state.projects.splice(state.selectedIndex, 1);
  state.selectedIndex = Math.max(0, state.selectedIndex - 1);
  renderAll();
  publishPreviewData();
  scheduleLocalAutosave();
}

function fileExtension(file) {
  return file.name.split(".").pop()?.toLowerCase() || "bin";
}

function projectMediaPath(project, filename) {
  return `assets/projects/${project.id}/${filename}`;
}

function handleCoverFile(file) {
  if (!file) {
    return;
  }

  if (!canWriteRepositoryFiles) {
    field("coverFile").value = "";
    setStatus("No online, use o campo Caminho/URL da capa para imagens já publicadas.", true);
    return;
  }

  const project = currentProject();
  const path = projectMediaPath(project, `cover.${fileExtension(file)}`);

  project.cover = path;
  project.previewCover = URL.createObjectURL(file);
  state.pendingFiles.set(path, file);
  renderPreview();
  publishPreviewData();
  scheduleLocalAutosave();
}

function handleGalleryFiles(files) {
  if (!canWriteRepositoryFiles) {
    field("galleryFiles").value = "";
    setStatus("No online, adicione imagens pelo caminho/URL já publicado.", true);
    return;
  }

  const project = currentProject();
  const startIndex = project.gallery.length;

  Array.from(files).forEach((file, offset) => {
    const type = file.type.startsWith("video/") ? "video" : "image";
    const path = projectMediaPath(project, `gallery-${String(startIndex + offset + 1).padStart(2, "0")}.${fileExtension(file)}`);
    const item = {
      type,
      src: path,
      previewSrc: URL.createObjectURL(file),
    };

    project.gallery.push(item);
    state.pendingFiles.set(path, file);
  });

  renderGalleryEditor();
  publishPreviewData();
  scheduleLocalAutosave();
}

function addGalleryPath() {
  const value = normalizeMediaPath(field("galleryPath").value);

  if (!value) {
    return;
  }

  currentProject().gallery.push({
    type: inferMediaType(value),
    src: value,
  });
  field("galleryPath").value = "";
  renderGalleryEditor();
  publishPreviewData();
  scheduleLocalAutosave();
}

function cleanProject(project) {
  const copy = cloneProject(project);
  delete copy.previewCover;
  copy.gallery = (copy.gallery || []).map((item) => {
    const media = normalizeMediaItem(item);
    delete media.previewSrc;
    return media;
  });
  return copy;
}

function cleanData() {
  return {
    projects: state.projects.map(cleanProject),
  };
}

function publishPreviewData() {
  localStorage.setItem(PREVIEW_KEY, JSON.stringify(cleanData()));
}

function saveDraft() {
  const data = cleanData();
  localStorage.setItem(DRAFT_KEY, JSON.stringify(data, null, 2));
  localStorage.setItem(PREVIEW_KEY, JSON.stringify(data));
  setStatus("Rascunho salvo neste navegador.");
}

function exportJson() {
  const blob = new Blob([JSON.stringify(cleanData(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "projects.json";
  link.click();
  URL.revokeObjectURL(link.href);
  setStatus("Arquivo projects.json exportado.");
}

async function toBase64FromFile(file) {
  const buffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
}

async function apiPost(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Erro ${response.status}`);
  }

  return response.json();
}

async function saveLocalRepository(options = {}) {
  if (!canWriteRepositoryFiles) {
    saveDraft();
    setStatus("Online: salvo neste navegador. Para publicar para todos, exporte o JSON e faça deploy.");
    return;
  }

  if (state.isSaving) {
    return;
  }

  state.isSaving = true;
  if (!options.silent) {
    setStatus("Salvando no repositório local...");
  }

  try {
    for (const [path, file] of state.pendingFiles.entries()) {
      await apiPost("/api/write-file", {
        path,
        contentBase64: await toBase64FromFile(file),
      });
    }

    await apiPost("/api/save-projects", cleanData());
    state.pendingFiles.clear();
    localStorage.removeItem(DRAFT_KEY);
    publishPreviewData();
    setStatus(options.silent ? "Salvo automaticamente no repositório local." : "Salvo no repositório local.");
  } finally {
    state.isSaving = false;
  }
}

function renderAll() {
  renderProjectList();
  fillForm();
}

elements.form.addEventListener("input", (event) => {
  if (event.target.type === "file") {
    return;
  }

  if (event.target.matches("[data-gallery-src]")) {
    const index = Number(event.target.dataset.gallerySrc);
    const item = currentProject().gallery[index];
    if (item) {
      item.src = normalizeMediaPath(event.target.value);
      item.type = inferMediaType(item.src);
      delete item.previewSrc;
      renderPreview();
      publishPreviewData();
      scheduleLocalAutosave();
    }
    return;
  }

  updateProjectFromForm();
});

field("coverFile").addEventListener("change", (event) => handleCoverFile(event.target.files[0]));
field("galleryFiles").addEventListener("change", (event) => handleGalleryFiles(event.target.files));

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  const selectProject = event.target.closest("[data-select-project]")?.dataset.selectProject;
  const removeGallery = event.target.closest("[data-remove-gallery]")?.dataset.removeGallery;

  if (selectProject !== undefined) {
    state.selectedIndex = Number(selectProject);
    renderAll();
    return;
  }

  if (removeGallery !== undefined) {
    currentProject().gallery.splice(Number(removeGallery), 1);
    renderGalleryEditor();
    publishPreviewData();
    scheduleLocalAutosave();
    return;
  }

  if (action === "add") addProject();
  if (action === "duplicate") duplicateProject();
  if (action === "delete") deleteProject();
  if (action === "add-gallery-path") addGalleryPath();
  if (action === "save-draft") saveDraft();
  if (action === "save-local") saveLocalRepository().catch((error) => setStatus(error.message, true));
  if (action === "export") exportJson();
  if (action === "toggle-grid") elements.previewFrame.classList.toggle("is-grid-visible");
});

async function init() {
  renderMediaAssetOptions();
  await loadProjects();
  renderAll();
  publishPreviewData();
  setStatus("Editor pronto. Para salvar no disco, use o servidor local do projeto.");
}

init().catch((error) => {
  state.projects = [normalizeProject(templateProject)];
  renderAll();
  setStatus(error.message, true);
});
