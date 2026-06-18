const STORAGE_KEY = "mattar-budget-document";
const DATA_PATH = "assets/data/budget-document.json";
const DEFAULT_BUDGET_DATA = {
  "meta": {
    "documentTitle": "Estimativa Orçamentária - Gastroperformance",
    "client": "Boticário",
    "projectType": "Gastroperformance",
    "guests": "80 paxs"
  },
  "cover": {
    "titlePrefix": "Estimativa Orçamentária para",
    "titleHighlight": "Gastroperformance",
    "titleSuffix": "para 80 paxs",
    "details": [
      {
        "label": "CLIENTE",
        "value": "Boticário"
      },
      {
        "label": "DATA",
        "value": "16 ou dia 22/09 (a definir)"
      },
      {
        "label": "QUANTIDADE DE PAX",
        "value": "80 total"
      },
      {
        "label": "DIÁRIAS",
        "value": "1 para ensaio e Apresentação"
      },
      {
        "label": "DURAÇÃO",
        "value": "até 2 horas aproximadamente."
      },
      {
        "label": "HORÁRIO",
        "value": "A definir"
      },
      {
        "label": "LOCAL",
        "value": "Gymnasium"
      },
      {
        "label": "SERVIÇO PRESTADO",
        "value": "Evento exclusivo para convidados através de espetáculo e jantar empratado em 5 tempos: couvert, entrada, primeiro prato, segundo prato e sobremesa."
      }
    ]
  },
  "composition": {
    "title": "Composição do Orçamento",
    "items": [
      {
        "heading": "Conceito criativo do projeto:",
        "body": "Ampla pesquisa, desenvolvimento criativo e artístico, argumentação e defesa para a proposta criativa para o projeto da gastroperformance."
      },
      {
        "heading": "A&B:",
        "body": "Desenvolvimento do cardápio, receitas e testes de comidas; Serviço de buffet com bebidas (sem bebidas alcoólicas), garçons e equipe de cozinha."
      },
      {
        "heading": "Audiovisual:",
        "body": "Execução do projeto audiovisual, fotógrafo/vídeo para registro do evento; Execução Artística dentro do conceito criado para o projeto; Execução das peças estruturais, trilha sonora, locuções, músicos e atores."
      },
      {
        "heading": "Operação e Produção:",
        "body": "Desenvolvimento de receitas/cardápio, direção artística, aluguel equipamentos de cozinha, aluguel pratos, talheres, taças e utensílios, moldes, silk, esculturas, mesas e cadeiras, equipes, cardápio físico, convites, gestão comercial, atendimento, produção executiva e reserva técnica"
      }
    ]
  },
  "stages": {
    "title": "Etapas do Projeto",
    "items": [
      {
        "heading": "Etapa 1: Conceito Criativo",
        "body": "Contratação para o desenvolvimento do conceito criativo: R$ 80k (descontado do valor total do projeto)\nPrazo estimado: 15 dias para apresentação e 15 dias para refinos/ajustes para a aprovação final."
      },
      {
        "heading": "Etapa 2: Aprovação do Projeto",
        "body": "Formalização para o aceite e contratação, definição de forma de pagamento e assinatura de contrato para início das etapas seguintes.\nPrazo estimado: 15 dias."
      },
      {
        "heading": "Etapa 3: Desenvolvimento",
        "body": "Início do desenvolvimento dos projetos de audiovisual, de gastronomia e toda a produção do evento.\nPrazo estimado: 45/60 dias."
      },
      {
        "heading": "Etapa 4: Realização da Gastroperformance",
        "body": "Data: 16 ou 22/09."
      }
    ],
    "payment": "Forma de pagamento: Criação à vista e Projeto até 30 dias antes do evento.\nEstimativa de orçamento válida por 10 dias."
  },
  "contact": {
    "name": "Sergio Saad",
    "site": "gastroperformance.com",
    "email": "Sergio@saadcd.com",
    "phone": "cel. 11 99966-2704"
  }
};
const documentRoot = document.querySelector(".budget-document");
const statusEl = document.querySelector(".budget-status");
let state = null;
let selectedTopic = { section: "composition", index: 0 };

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function setStatus(message) { statusEl.textContent = message; window.clearTimeout(setStatus.timer); setStatus.timer = window.setTimeout(() => { statusEl.textContent = ""; }, 2800); }
function escapeHtml(value = "") { return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function richText(value = "") { return escapeHtml(value).replace(/\n/g, "<br>"); }
function plainTextFromEditable(el) { return el.innerText.replace(/\u00a0/g, " ").trim(); }
function dataToHash(data) { return btoa(unescape(encodeURIComponent(JSON.stringify(data)))); }
function dataFromHash() { if (!location.hash.startsWith("#doc=")) return null; try { return JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(5))))); } catch { return null; } }

async function loadDefaultData() {
  try {
    if (location.protocol === "file:") return clone(DEFAULT_BUDGET_DATA);
    const response = await fetch(DATA_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error("Não foi possível carregar o modelo.");
    return response.json();
  } catch (error) {
    console.warn("Usando modelo embutido do orçamento.", error);
    return clone(DEFAULT_BUDGET_DATA);
  }
}

function setPath(path, value) {
  const parts = path.split(".");
  let target = state;
  for (let i = 0; i < parts.length - 1; i += 1) target = target[/^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i]];
  const last = parts[parts.length - 1];
  target[/^\d+$/.test(last) ? Number(last) : last] = value;
}

function syncFromDom() {
  document.querySelectorAll("[data-path]").forEach((el) => setPath(el.dataset.path, plainTextFromEditable(el)));
  state.meta.client = state.cover.details.find((item) => item.label.toLowerCase().includes("cliente"))?.value || state.meta.client;
  setPdfTitle();
}

function setPdfTitle() {
  const client = state?.cover.details.find((item) => item.label.toLowerCase().includes("cliente"))?.value || state?.meta.client || "Cliente";
  document.title = `${state?.meta.documentTitle || "Estimativa Orçamentária"} - ${client}`;
}

function editable(path, value, tag = "span", className = "") {
  return `<${tag} class="${className}" contenteditable="true" spellcheck="true" data-path="${path}">${richText(value)}</${tag}>`;
}

function renderDetails() {
  return state.cover.details.map((item, index) => `<div class="detail-row"><strong contenteditable="true" data-path="cover.details.${index}.label">${escapeHtml(item.label)}</strong>: <span contenteditable="true" data-path="cover.details.${index}.value">${richText(item.value)}</span></div>`).join("");
}

function renderTopics(sectionName) {
  return state[sectionName].items.map((item, index) => `<article class="topic ${selectedTopic.section === sectionName && selectedTopic.index === index ? "is-selected" : ""}" data-section="${sectionName}" data-index="${index}"><h2 contenteditable="true" data-path="${sectionName}.items.${index}.heading">${escapeHtml(item.heading)}</h2><p contenteditable="true" data-path="${sectionName}.items.${index}.body">${richText(item.body)}</p></article>`).join("");
}

function renderTopicControls(sectionName) {
  const label = sectionName === "composition" ? "composição" : "etapa";
  return `<div class="page-controls" data-section="${sectionName}"><span>Editar ${label}</span><button class="inline-action" type="button" data-action="add-topic" data-section="${sectionName}">+ adicionar</button><button class="inline-action" type="button" data-action="remove-topic" data-section="${sectionName}">- remover selecionado</button></div>`;
}

function render() {
  setPdfTitle();
  documentRoot.innerHTML = `
    <div class="page-shell"><section class="pdf-page cover-page"><div class="page-artboard"><img class="pdf-logo" src="assets/brand/mattar-mark-ref.png" alt="" aria-hidden="true" /><div class="cover-copy"><h1 class="cover-title">${editable("cover.titlePrefix", state.cover.titlePrefix)}<br />${editable("cover.titleHighlight", state.cover.titleHighlight, "span", "cover-title__red")} ${editable("cover.titleSuffix", state.cover.titleSuffix)}</h1><div class="detail-list">${renderDetails()}</div><div class="detail-actions"><button class="inline-action" type="button" data-action="add-detail">+ campo</button><button class="inline-action" type="button" data-action="remove-detail">- campo</button></div></div></div></section></div>
    <div class="page-shell"><section class="pdf-page composition-page"><div class="page-artboard"><img class="pdf-logo" src="assets/brand/mattar-mark-ref.png" alt="" aria-hidden="true" />${editable("composition.title", state.composition.title, "h1", "page-title")}${renderTopicControls("composition")}<div class="composition-list">${renderTopics("composition")}</div></div></section></div>
    <div class="page-shell"><section class="pdf-page stages-page"><div class="page-artboard">${editable("stages.title", state.stages.title, "h1", "page-title")}${renderTopicControls("stages")}<div class="stage-list">${renderTopics("stages")}</div>${editable("stages.payment", state.stages.payment, "p", "payment-note")}<div class="contact-block">${editable("contact.name", state.contact.name, "strong")}${editable("contact.site", state.contact.site, "span")}<br />${editable("contact.email", state.contact.email, "span")}<br />${editable("contact.phone", state.contact.phone, "span")}</div><img class="contact-logo" src="assets/brand/mattar-footer-ref.png" alt="Mattar" /></div></section></div>`;
  updatePageScale();
}

function updatePageScale() {
  const shell = documentRoot.querySelector(".page-shell");
  const width = shell?.getBoundingClientRect().width || Math.min(720, window.innerWidth - 40);
  documentRoot.style.setProperty("--page-scale", String(Math.min(1, Math.max(0.2, width / 1080))));
}

function saveLocal() { syncFromDom(); localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); setStatus("Documento salvo neste navegador."); }
function generateShareLink() { syncFromDom(); const hash = dataToHash(state); const url = `${location.origin}${location.pathname}#doc=${hash}`; navigator.clipboard?.writeText(url); history.replaceState(null, "", `#doc=${hash}`); setStatus("Link do documento copiado."); }
async function resetModel() { localStorage.removeItem(STORAGE_KEY); history.replaceState(null, "", location.pathname); state = clone(await loadDefaultData()); selectedTopic = { section: "composition", index: 0 }; render(); setStatus("Modelo restaurado."); }

function addTopic(section, index = selectedTopic.section === section ? selectedTopic.index : state[section].items.length - 1) {
  syncFromDom();
  const insertAt = Math.max(0, Number(index)) + 1;
  state[section].items.splice(insertAt, 0, { heading: "Novo tópico", body: "Descreva este item." });
  selectedTopic = { section, index: insertAt };
  render();
}

function removeTopic(section, index = selectedTopic.section === section ? selectedTopic.index : state[section].items.length - 1) {
  syncFromDom();
  if (state[section].items.length <= 1) return setStatus("Mantenha ao menos um tópico.");
  const removeAt = Math.max(0, Number(index));
  state[section].items.splice(removeAt, 1);
  selectedTopic = { section, index: Math.max(0, Math.min(removeAt, state[section].items.length - 1)) };
  render();
}

function addDetail() { syncFromDom(); state.cover.details.push({ label: "NOVO CAMPO", value: "Informação" }); render(); }
function removeDetail() { syncFromDom(); if (state.cover.details.length <= 1) return setStatus("Mantenha ao menos um campo."); state.cover.details.pop(); render(); }
function exportPdf() { syncFromDom(); setPdfTitle(); window.print(); }

function selectTopicFromEvent(event) {
  const topic = event.target.closest(".topic");
  if (!topic) return;
  selectedTopic = { section: topic.dataset.section, index: Number(topic.dataset.index) };
  document.querySelectorAll(".topic.is-selected").forEach((el) => el.classList.remove("is-selected"));
  topic.classList.add("is-selected");
}

document.addEventListener("input", (event) => { if (event.target.matches("[contenteditable]")) syncFromDom(); });
document.addEventListener("focusin", selectTopicFromEvent);
document.addEventListener("click", (event) => {
  selectTopicFromEvent(event);
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "save") saveLocal();
  if (action === "share") generateShareLink();
  if (action === "print") exportPdf();
  if (action === "reset") resetModel();
  if (action === "add-topic") addTopic(button.dataset.section, button.dataset.index);
  if (action === "remove-topic") removeTopic(button.dataset.section, button.dataset.index);
  if (action === "add-detail") addDetail();
  if (action === "remove-detail") removeDetail();
});
window.addEventListener("resize", updatePageScale);

async function init() {
  const defaultData = await loadDefaultData();
  const hashData = dataFromHash();
  const savedData = localStorage.getItem(STORAGE_KEY);
  state = hashData || (savedData ? JSON.parse(savedData) : clone(defaultData));
  render();
}
init().catch((error) => { documentRoot.innerHTML = `<section class="pdf-page"><p>${escapeHtml(error.message)}</p></section>`; });
