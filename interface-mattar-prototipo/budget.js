const STORAGE_KEY = "mattar-budget-document";
const DATA_PATH = "assets/data/budget-document.json";
const API_BASE = location.protocol === "file:" ? "http://127.0.0.1:4174" : "";
const LIBRARY_PATH = "assets/data/budget-models.json";
const canWriteLocalFiles = ["localhost", "127.0.0.1"].includes(location.hostname);
const autosaveDelayMs = 900;
const DEFAULT_BUDGET_DATA = {
  meta: {
    documentTitle: "Estimativa Orçamentária - Gastroperformance",
    headerLabel: "Estimativa Orçamentária",
    headerDate: "22/09",
    client: "Boticário",
    projectType: "Gastroperformance",
    guests: "80 paxs",
  },
  cover: {
    titlePrefix: "Estimativa Orçamentária para",
    titleHighlight: "Gastroperformance",
    titleSuffix: "para 80 paxs",
    details: [
      { label: "CLIENTE", value: "Boticário" },
      { label: "DATA", value: "16 ou 22/09" },
      { label: "QUANTIDADE DE PAX", value: "80 total" },
      { label: "DIÁRIAS", value: "1 para ensaio e apresentação" },
      { label: "DURAÇÃO", value: "até 2 horas aproximadamente." },
      { label: "HORÁRIO", value: "A definir" },
      { label: "LOCAL", value: "Gymnasium" },
      {
        label: "SERVIÇO PRESTADO",
        value:
          "Evento exclusivo para convidados através de espetáculo e jantar empratado em 5 tempos: couvert, entrada, primeiro prato, segundo prato e sobremesa.",
      },
    ],
  },
  commissioning: {
    title: "Comissionamento",
    paragraphs: [
      "Uma Gastroperformance é um projeto artístico.\nPor essa razão, os termos de sua contratação diferem dos projetos corporativos. A obra de Simone Mattar costuma ser comissionada por empresas e instituições que compartilham os valores que alicerçam sua poética: o compromisso com o desenvolvimento humano, o fortalecimento dos laços sociais, do pertencimento cultural e a promoção de ações no campo da saúde e da educação, com ênfase nas questões alimentares.",
      "O processo de concepção da gastroperformance comissionada se baseia em uma pesquisa profunda, de caráter histórico e artístico, que se desdobra em uma narrativa multissensorial na qual convergem os valores da artista e os da marca. Todo processo de comunicação das ações pactuadas pode ser discutida ao longo do processo de negociação e produção do projeto.",
      "Com a proposta orçamentaria aprovada, a artista realizará a pesquisa e apresentará sua proposta para aprovação e eventuais ajustes, garantindo que o processo criativo, marcado por uma grande liberdade, atenda às expectativas e necessidades da empresa que comissionará o projeto. Uma vez o projeto aprovado, tem início a produção do evento.",
    ],
  },
  composition: {
    title: "Composição do Orçamento",
    items: [
      {
        heading: "Conceito criativo do projeto:",
        body:
          "Ampla pesquisa, desenvolvimento criativo e artístico, argumentação e defesa para a proposta criativa para o projeto da gastroperformance.",
      },
      {
        heading: "A&B:",
        body:
          "Desenvolvimento do cardápio, receitas e testes de comidas; serviço de buffet com bebidas (sem bebidas alcoólicas), garçons e equipe de cozinha.",
      },
      {
        heading: "Audiovisual:",
        body:
          "Execução do projeto audiovisual, fotógrafo/vídeo para registro do evento; execução artística dentro do conceito criado para o projeto; execução das peças estruturais, trilha sonora, locuções, músicos e atores.",
      },
      {
        heading: "Operação e Produção:",
        body:
          "Desenvolvimento de receitas/cardápio, direção artística, aluguel de equipamentos de cozinha, aluguel de pratos, talheres, taças e utensílios, moldes, silk, esculturas, mesas e cadeiras, equipes, cardápio físico, convites, gestão comercial, atendimento, produção executiva e reserva técnica.",
      },
    ],
  },
  stages: {
    title: "Etapas do Projeto",
    items: [
      {
        heading: "Etapa 1: Conceito Criativo",
        body:
          "Contratação para o desenvolvimento do conceito criativo: R$ 80k (descontado do valor total do projeto)\nPrazo estimado: 15 dias para apresentação e 15 dias para refinos/ajustes para a aprovação final.",
      },
      {
        heading: "Etapa 2: Aprovação do Projeto",
        body:
          "Formalização para o aceite e contratação, definição de forma de pagamento e assinatura de contrato para início das etapas seguintes.\nPrazo estimado: 15 dias.",
      },
      {
        heading: "Etapa 3: Desenvolvimento",
        body:
          "Início do desenvolvimento dos projetos de audiovisual, de gastronomia e toda a produção do evento.\nPrazo estimado: 45/60 dias.",
      },
      {
        heading: "Etapa 4: Realização da Gastroperformance",
        body: "Data: 16 ou 22/09.",
      },
    ],
    payment:
      "Forma de pagamento: Criação à vista e projeto até 30 dias antes do evento.\nEstimativa de orçamento válida por 10 dias.",
  },
  contact: {
    name: "Sergio Saad",
    site: "gastroperformance.com",
    email: "Sergio@saadcd.com",
    phone: "cel. 11 99966-2704",
  },
  banking: {
    title: "Dados Bancários",
    details: [
      { label: "BANCO", value: "Banco Exemplo S.A." },
      { label: "AGÃŠNCIA", value: "0001" },
      { label: "CONTA CORRENTE", value: "12345-6" },
      { label: "PIX", value: "financeiro@mattar.com" },
      { label: "FAVORECIDO", value: "Mattar Projetos Artísticos Ltda." },
      { label: "CNPJ", value: "12.345.678/0001-90" }
    ]
  },
  approval: {
    title: "Aceite Formal da Proposta",
    intro:
      "A aprovação desta proposta formaliza o aceite do escopo, dos valores, dos prazos e das condições aqui apresentadas.",
    fields: [
      { label: "NOME", value: "Nome do responsável" },
      { label: "EMPRESA", value: "Razão social" },
      { label: "CARGO", value: "Cargo" },
      { label: "DATA", value: "00/00/0000" },
      { label: "ASSINATURA", value: "" }
    ]
  },
};

const documentRoot = document.querySelector(".budget-document");
const statusEl = document.querySelector(".budget-status");
const libraryListEl = document.querySelector("#budget-document-list");
const budgetToolsEl = document.querySelector(".budget-tools");
let state = null;
let selectedTopic = { section: "composition", index: 0 };
let autosaveTimer = null;
let isSaving = false;
let saveQueued = false;
let documentLibrary = [];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeDocumentPath(value = DATA_PATH) {
  const path = String(value || DATA_PATH).trim().replace(/\\/g, "/").replace(/^\/+/, "");

  if (!path.startsWith("assets/data/") || !path.endsWith(".json")) {
    return DATA_PATH;
  }

  return path;
}

const documentDataPath = normalizeDocumentPath(new URLSearchParams(location.search).get("file"));
const storageKey = `${STORAGE_KEY}:${documentDataPath}`;

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "novo-orcamento";
}

function setStatus(message) {
  statusEl.textContent = message;
  window.clearTimeout(setStatus.timer);
  setStatus.timer = window.setTimeout(() => {
    statusEl.textContent = "";
  }, 2800);
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function richText(value = "") {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function plainTextFromEditable(el) {
  return el.innerText.replace(/\u00a0/g, " ").trim();
}

function dataToHash(data) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

function dataFromHash() {
  if (!location.hash.startsWith("#doc=")) return null;
  try {
    return JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(5)))));
  } catch {
    return null;
  }
}

async function loadDefaultData() {
  try {
    const response = await fetch(`${API_BASE}/${documentDataPath}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Nao foi possivel carregar o modelo.");
    return response.json();
  } catch (error) {
    console.warn("Usando modelo embutido do orcamento.", error);
    return clone(DEFAULT_BUDGET_DATA);
  }
}

function setPath(path, value) {
  const parts = path.split(".");
  let target = state;
  for (let i = 0; i < parts.length - 1; i += 1) {
    target = target[/^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i]];
  }
  const last = parts[parts.length - 1];
  target[/^\d+$/.test(last) ? Number(last) : last] = value;
}

function syncFromDom() {
  document.querySelectorAll("[data-path]").forEach((el) => setPath(el.dataset.path, plainTextFromEditable(el)));
  state.meta.client =
    state.cover.details.find((item) => item.label.toLowerCase().includes("cliente"))?.value || state.meta.client;
  setPdfTitle();
}

function setPdfTitle() {
  const client =
    state?.cover.details.find((item) => item.label.toLowerCase().includes("cliente"))?.value ||
    state?.meta.client ||
    "Cliente";
  document.title = `${state?.meta.documentTitle || "Estimativa Orçamentária"} - ${client}`;
}

function editable(path, value, tag = "span", className = "") {
  return `<${tag} class="${className}" contenteditable="true" spellcheck="true" data-path="${path}">${richText(value)}</${tag}>`;
}

function renderHeader() {
  return `<div class="page-header"><p class="page-header__label" contenteditable="true" spellcheck="true" data-path="meta.headerLabel">${escapeHtml(
    state.meta.headerLabel || "",
  )}</p><p class="page-header__date" contenteditable="true" spellcheck="true" data-path="meta.headerDate">${escapeHtml(
    state.meta.headerDate || "",
  )}</p></div>`;
}

function renderDetails() {
  return state.cover.details
    .map(
      (item, index) =>
        `<div class="detail-row"><strong contenteditable="true" data-path="cover.details.${index}.label">${escapeHtml(
          item.label,
        )}</strong>: <span contenteditable="true" data-path="cover.details.${index}.value">${richText(item.value)}</span></div>`,
    )
    .join("");
}

function renderBankingDetails() {
  return state.banking.details
    .map(
      (item, index) =>
        `<div class="banking-row"><strong contenteditable="true" data-path="banking.details.${index}.label">${escapeHtml(
          item.label,
        )}</strong>: <span contenteditable="true" data-path="banking.details.${index}.value">${richText(item.value)}</span></div>`,
    )
    .join("");
}

function renderCommissioningParagraphs() {
  return state.commissioning.paragraphs
    .map(
      (paragraph, index) =>
        `<p class="${selectedTopic.section === "commissioning" && selectedTopic.index === index ? "is-selected" : ""}" data-section="commissioning" data-index="${index}" contenteditable="true" spellcheck="true" data-path="commissioning.paragraphs.${index}">${richText(
          paragraph,
        )}</p>`,
    )
    .join("");
}

function renderApprovalFields() {
  return state.approval.fields
    .map(
      (field, index) =>
        `<div class="signature-row"><p class="signature-row__label" contenteditable="true" spellcheck="true" data-path="approval.fields.${index}.label">${escapeHtml(
          field.label,
        )}</p><div class="signature-row__value" contenteditable="true" spellcheck="true" data-path="approval.fields.${index}.value">${richText(
          field.value,
        )}</div></div>`,
    )
    .join("");
}

function renderTopics(sectionName) {
  return state[sectionName].items
    .map(
      (item, index) =>
        `<article class="topic ${
          selectedTopic.section === sectionName && selectedTopic.index === index ? "is-selected" : ""
        }" data-section="${sectionName}" data-index="${index}"><h2 contenteditable="true" data-path="${sectionName}.items.${index}.heading">${escapeHtml(
          item.heading,
        )}</h2><p contenteditable="true" data-path="${sectionName}.items.${index}.body">${richText(item.body)}</p></article>`,
    )
    .join("");
}

function renderTopicControls(sectionName) {
  const label =
    sectionName === "composition"
      ? "composição"
      : sectionName === "commissioning"
        ? "parágrafo"
        : "etapa";
  return `<div class="page-controls" data-section="${sectionName}"><span>Editar ${label}</span><button class="inline-action" type="button" data-action="add-topic" data-section="${sectionName}">+ adicionar</button><button class="inline-action" type="button" data-action="remove-topic" data-section="${sectionName}">- remover selecionado</button></div>`;
}

function render() {
  setPdfTitle();
  documentRoot.innerHTML = `
    <div class="page-shell"><section class="pdf-page commissioning-page"><div class="page-artboard">${renderHeader()}<img class="pdf-logo" src="assets/brand/mattar-mark-ref.png" alt="" aria-hidden="true" />${editable(
      "commissioning.title",
      state.commissioning.title,
      "h1",
      "page-title",
    )}${renderTopicControls("commissioning")}<div class="commissioning-copy">${renderCommissioningParagraphs()}</div><div class="cover-copy"><h1 class="cover-title">${editable(
      "cover.titlePrefix",
      state.cover.titlePrefix,
    )}<br />${editable("cover.titleHighlight", state.cover.titleHighlight, "span", "cover-title__red")} ${editable(
      "cover.titleSuffix",
      state.cover.titleSuffix,
    )}</h1><div class="detail-list">${renderDetails()}</div><div class="detail-actions"><button class="inline-action" type="button" data-action="add-detail">+ campo</button><button class="inline-action" type="button" data-action="remove-detail">- campo</button></div></div></div></section></div>
    <div class="page-shell"><section class="pdf-page composition-page"><div class="page-artboard">${renderHeader()}<img class="pdf-logo" src="assets/brand/mattar-mark-ref.png" alt="" aria-hidden="true" />${editable(
      "composition.title",
      state.composition.title,
      "h1",
      "page-title",
    )}${renderTopicControls("composition")}<div class="composition-list">${renderTopics("composition")}</div></div></section></div>
    <div class="page-shell"><section class="pdf-page stages-page"><div class="page-artboard">${renderHeader()}${editable(
      "stages.title",
      state.stages.title,
      "h1",
      "page-title",
    )}${renderTopicControls("stages")}<div class="stage-list">${renderTopics("stages")}</div>${editable(
      "stages.payment",
      state.stages.payment,
      "p",
      "payment-note",
    )}<div class="contact-block">${editable("contact.name", state.contact.name, "strong")}${editable(
      "contact.site",
      state.contact.site,
      "span",
    )}<br />${editable("contact.email", state.contact.email, "span")}<br />${editable(
      "contact.phone",
      state.contact.phone,
      "span",
    )}</div><img class="contact-logo" src="assets/brand/mattar-footer-ref.png" alt="Mattar" /></div></section></div>
    <div class="page-shell"><section class="pdf-page closing-page"><div class="page-artboard">${renderHeader()}<img class="pdf-logo" src="assets/brand/mattar-mark-ref.png" alt="" aria-hidden="true" /><div class="closing-grid"><section class="banking-block"><h2 contenteditable="true" spellcheck="true" data-path="banking.title">${escapeHtml(
      state.banking.title,
    )}</h2><div class="banking-list">${renderBankingDetails()}</div></section><section class="acceptance-block"><h2 contenteditable="true" spellcheck="true" data-path="approval.title">${escapeHtml(
      state.approval.title,
    )}</h2><p class="acceptance-copy" contenteditable="true" spellcheck="true" data-path="approval.intro">${richText(
      state.approval.intro,
    )}</p><div class="signature-stack">${renderApprovalFields()}</div></section></div></div></section></div>`;
  updatePageScale();
}

function updatePageScale() {
  const shell = documentRoot.querySelector(".page-shell");
  const width = shell?.getBoundingClientRect().width || Math.min(720, window.innerWidth - 40);
  documentRoot.style.setProperty("--page-scale", String(Math.min(1, Math.max(0.2, width / 1080))));
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

function documentLabel(documentInfo) {
  const client = documentInfo.client || "Sem cliente";
  const type = documentInfo.projectType || "Orcamento";
  return `${client} - ${type}`;
}

function renderDocumentLibrary() {
  if (!libraryListEl) {
    return;
  }

  if (!documentLibrary.length) {
    libraryListEl.innerHTML = `<p class="budget-library__empty">Nenhum arquivo encontrado.</p>`;
    return;
  }

  libraryListEl.innerHTML = documentLibrary
    .map((documentInfo) => {
      const isActive = documentInfo.path === documentDataPath;
      return `<button type="button" class="budget-document-button${isActive ? " is-active" : ""}" data-document-path="${escapeHtml(
        documentInfo.path,
      )}"><strong>${escapeHtml(documentLabel(documentInfo))}</strong><span>${escapeHtml(documentInfo.path.replace("assets/data/", ""))}</span></button>`;
    })
    .join("");
}

async function loadDocumentLibrary() {
  if (!libraryListEl) {
    return;
  }

  try {
    if (canWriteLocalFiles) {
      const response = await fetch(`${API_BASE}/api/budget-documents?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Não foi possível carregar a biblioteca local.");
      const data = await response.json();
      documentLibrary = data.documents || [];
    } else {
      const response = await fetch(`${API_BASE}/${LIBRARY_PATH}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Não foi possível carregar o índice de modelos.");
      const data = await response.json();
      documentLibrary = data.documents || [];
    }
  } catch (error) {
    documentLibrary = [
      {
        path: documentDataPath,
        client: state?.meta?.client || "Documento atual",
        projectType: state?.meta?.projectType || "",
      },
    ];
  }

  renderDocumentLibrary();
}

function navigateToDocument(path) {
  const url = new URL(location.href);
  url.hash = "";
  url.searchParams.set("file", path);
  location.href = url.toString();
}

async function openDocument(path) {
  if (path === documentDataPath) {
    return;
  }

  await saveBudgetDocument({ silent: true }).catch(() => {});

  navigateToDocument(path);
}

function saveBrowserDraft(message = "Documento salvo neste navegador.") {
  syncFromDom();
  localStorage.setItem(storageKey, JSON.stringify(state));
  setStatus(message);
}

async function saveBudgetDocument(options = {}) {
  syncFromDom();

  if (!canWriteLocalFiles) {
    saveBrowserDraft(options.silent ? "Salvo automaticamente neste navegador." : "Documento salvo neste navegador.");
    return;
  }

  if (isSaving) {
    saveQueued = true;
    return;
  }

  isSaving = true;
  if (!options.silent) {
    setStatus("Salvando arquivo...");
  }

  try {
    await apiPost("/api/save-budget-document", {
      path: documentDataPath,
      document: state,
    });
    localStorage.removeItem(storageKey);
    setStatus(options.silent ? "Salvo automaticamente no arquivo." : "Arquivo salvo.");
  } catch (error) {
    localStorage.setItem(storageKey, JSON.stringify(state));
    setStatus(`Salvo no navegador. ${error.message}`);
    throw error;
  } finally {
    isSaving = false;
    if (saveQueued) {
      saveQueued = false;
      scheduleAutosave();
    }
  }
}

function scheduleAutosave() {
  window.clearTimeout(autosaveTimer);
  autosaveTimer = window.setTimeout(() => {
    saveBudgetDocument({ silent: true }).catch(() => {});
  }, autosaveDelayMs);
}

function generateShareLink() {
  syncFromDom();
  const hash = dataToHash(state);
  const url = `${location.origin}${location.pathname}#doc=${hash}`;
  navigator.clipboard?.writeText(url);
  history.replaceState(null, "", `#doc=${hash}`);
  setStatus("Link do documento copiado.");
}

async function resetModel() {
  localStorage.removeItem(storageKey);
  history.replaceState(null, "", location.pathname);
  state = clone(await loadDefaultData());
  selectedTopic = { section: "composition", index: 0 };
  render();
  scheduleAutosave();
  setStatus("Modelo restaurado.");
}

function addTopic(section, index = selectedTopic.section === section ? selectedTopic.index : 0) {
  syncFromDom();
  const insertAt = Math.max(0, Number(index)) + 1;

  if (section === "commissioning") {
    state.commissioning.paragraphs.splice(insertAt, 0, "Novo parágrafo.");
    selectedTopic = { section, index: insertAt };
    render();
    scheduleAutosave();
    return;
  }

  state[section].items.splice(insertAt, 0, { heading: "Novo tópico", body: "Descreva este item." });
  selectedTopic = { section, index: insertAt };
  render();
  scheduleAutosave();
}

function removeTopic(section, index = selectedTopic.section === section ? selectedTopic.index : 0) {
  syncFromDom();
  const removeAt = Math.max(0, Number(index));

  if (section === "commissioning") {
    if (state.commissioning.paragraphs.length <= 1) {
      setStatus("Mantenha ao menos um parágrafo.");
      return;
    }
    state.commissioning.paragraphs.splice(removeAt, 1);
    selectedTopic = {
      section,
      index: Math.max(0, Math.min(removeAt, state.commissioning.paragraphs.length - 1)),
    };
    render();
    scheduleAutosave();
    return;
  }

  if (state[section].items.length <= 1) {
    setStatus("Mantenha ao menos um tópico.");
    return;
  }

  state[section].items.splice(removeAt, 1);
  selectedTopic = {
    section,
    index: Math.max(0, Math.min(removeAt, state[section].items.length - 1)),
  };
  render();
  scheduleAutosave();
}

function addDetail() {
  syncFromDom();
  state.cover.details.push({ label: "NOVO CAMPO", value: "Informação" });
  render();
  scheduleAutosave();
}

function removeDetail() {
  syncFromDom();
  if (state.cover.details.length <= 1) {
    setStatus("Mantenha ao menos um campo.");
    return;
  }
  state.cover.details.pop();
  render();
  scheduleAutosave();
}

function exportPdf() {
  syncFromDom();
  setPdfTitle();
  window.print();
}

function selectTopicFromEvent(event) {
  const topic = event.target.closest(".topic");
  const paragraph = event.target.closest('.commissioning-copy p[data-section="commissioning"]');

  document.querySelectorAll(".topic.is-selected").forEach((el) => el.classList.remove("is-selected"));
  document.querySelectorAll('.commissioning-copy p.is-selected').forEach((el) => el.classList.remove("is-selected"));

  if (topic) {
    selectedTopic = { section: topic.dataset.section, index: Number(topic.dataset.index) };
    topic.classList.add("is-selected");
    return;
  }

  if (paragraph) {
    selectedTopic = { section: "commissioning", index: Number(paragraph.dataset.index) };
    paragraph.classList.add("is-selected");
  }
}

document.addEventListener("input", (event) => {
  if (event.target.matches("[contenteditable]")) {
    syncFromDom();
    scheduleAutosave();
  }
});

document.addEventListener("focusin", selectTopicFromEvent);

document.addEventListener("click", (event) => {
  selectTopicFromEvent(event);
  const documentButton = event.target.closest("[data-document-path]");
  if (documentButton) {
    openDocument(documentButton.dataset.documentPath).catch((error) => setStatus(error.message));
    return;
  }

  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "save") saveBudgetDocument().catch(() => {});
  if (action === "share") generateShareLink();
  if (action === "print") exportPdf();
  if (action === "reset") resetModel();
  if (action === "refresh-library") loadDocumentLibrary();
  if (action === "save-model") saveBudgetDocument().catch(() => {});
  if (action === "add-topic") addTopic(button.dataset.section, button.dataset.index);
  if (action === "remove-topic") removeTopic(button.dataset.section, button.dataset.index);
  if (action === "add-detail") addDetail();
  if (action === "remove-detail") removeDetail();
});

window.addEventListener("resize", updatePageScale);

async function init() {
  const defaultData = await loadDefaultData();
  const hashData = dataFromHash();
  const savedData = localStorage.getItem(storageKey);
  state = hashData || (savedData ? JSON.parse(savedData) : clone(defaultData));
  render();
  loadDocumentLibrary();
  setStatus(canWriteLocalFiles ? "Documento pronto. Alterações salvam no arquivo." : "Documento pronto. Alterações salvam neste navegador.");
}

init().catch((error) => {
  documentRoot.innerHTML = `<section class="pdf-page"><p>${escapeHtml(error.message)}</p></section>`;
});

