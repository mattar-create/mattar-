const STORAGE_KEY = "mattar-budget-document";
const DATA_PATH = "assets/data/budget-document.json";
const DEFAULT_BUDGET_DATA = {
  meta: {
    documentTitle: "Estimativa OrÃ§amentÃ¡ria - Gastroperformance",
    headerLabel: "Estimativa OrÃ§amentÃ¡ria",
    headerDate: "22/09",
    client: "BoticÃ¡rio",
    projectType: "Gastroperformance",
    guests: "80 paxs",
  },
  cover: {
    titlePrefix: "Estimativa OrÃ§amentÃ¡ria para",
    titleHighlight: "Gastroperformance",
    titleSuffix: "para 80 paxs",
    details: [
      { label: "CLIENTE", value: "BoticÃ¡rio" },
      { label: "DATA", value: "16 ou 22/09" },
      { label: "QUANTIDADE DE PAX", value: "80 total" },
      { label: "DIÃRIAS", value: "1 para ensaio e apresentaÃ§Ã£o" },
      { label: "DURAÃ‡ÃƒO", value: "atÃ© 2 horas aproximadamente." },
      { label: "HORÃRIO", value: "A definir" },
      { label: "LOCAL", value: "Gymnasium" },
      {
        label: "SERVIÃ‡O PRESTADO",
        value:
          "Evento exclusivo para convidados atravÃ©s de espetÃ¡culo e jantar empratado em 5 tempos: couvert, entrada, primeiro prato, segundo prato e sobremesa.",
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
    title: "ComposiÃ§Ã£o do OrÃ§amento",
    items: [
      {
        heading: "Conceito criativo do projeto:",
        body:
          "Ampla pesquisa, desenvolvimento criativo e artÃ­stico, argumentaÃ§Ã£o e defesa para a proposta criativa para o projeto da gastroperformance.",
      },
      {
        heading: "A&B:",
        body:
          "Desenvolvimento do cardÃ¡pio, receitas e testes de comidas; serviÃ§o de buffet com bebidas (sem bebidas alcoÃ³licas), garÃ§ons e equipe de cozinha.",
      },
      {
        heading: "Audiovisual:",
        body:
          "ExecuÃ§Ã£o do projeto audiovisual, fotÃ³grafo/vÃ­deo para registro do evento; execuÃ§Ã£o artÃ­stica dentro do conceito criado para o projeto; execuÃ§Ã£o das peÃ§as estruturais, trilha sonora, locuÃ§Ãµes, mÃºsicos e atores.",
      },
      {
        heading: "OperaÃ§Ã£o e ProduÃ§Ã£o:",
        body:
          "Desenvolvimento de receitas/cardÃ¡pio, direÃ§Ã£o artÃ­stica, aluguel de equipamentos de cozinha, aluguel de pratos, talheres, taÃ§as e utensÃ­lios, moldes, silk, esculturas, mesas e cadeiras, equipes, cardÃ¡pio fÃ­sico, convites, gestÃ£o comercial, atendimento, produÃ§Ã£o executiva e reserva tÃ©cnica.",
      },
    ],
  },
  stages: {
    title: "Etapas do Projeto",
    items: [
      {
        heading: "Etapa 1: Conceito Criativo",
        body:
          "ContrataÃ§Ã£o para o desenvolvimento do conceito criativo: R$ 80k (descontado do valor total do projeto)\nPrazo estimado: 15 dias para apresentaÃ§Ã£o e 15 dias para refinos/ajustes para a aprovaÃ§Ã£o final.",
      },
      {
        heading: "Etapa 2: AprovaÃ§Ã£o do Projeto",
        body:
          "FormalizaÃ§Ã£o para o aceite e contrataÃ§Ã£o, definiÃ§Ã£o de forma de pagamento e assinatura de contrato para inÃ­cio das etapas seguintes.\nPrazo estimado: 15 dias.",
      },
      {
        heading: "Etapa 3: Desenvolvimento",
        body:
          "InÃ­cio do desenvolvimento dos projetos de audiovisual, de gastronomia e toda a produÃ§Ã£o do evento.\nPrazo estimado: 45/60 dias.",
      },
      {
        heading: "Etapa 4: RealizaÃ§Ã£o da Gastroperformance",
        body: "Data: 16 ou 22/09.",
      },
    ],
    payment:
      "Forma de pagamento: CriaÃ§Ã£o Ã  vista e projeto atÃ© 30 dias antes do evento.\nEstimativa de orÃ§amento vÃ¡lida por 10 dias.",
  },
  contact: {
    name: "Sergio Saad",
    site: "gastroperformance.com",
    email: "Sergio@saadcd.com",
    phone: "cel. 11 99966-2704",
  },
  banking: {
    title: "Dados BancÃ¡rios",
    details: [
      { label: "BANCO", value: "Banco Exemplo S.A." },
      { label: "AGÃŠNCIA", value: "0001" },
      { label: "CONTA CORRENTE", value: "12345-6" },
      { label: "PIX", value: "financeiro@mattar.com" },
      { label: "FAVORECIDO", value: "Mattar Projetos ArtÃ­sticos Ltda." },
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
let state = null;
let selectedTopic = { section: "composition", index: 0 };

function clone(value) {
  return JSON.parse(JSON.stringify(value));
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
    if (location.protocol === "file:") return clone(DEFAULT_BUDGET_DATA);
    const response = await fetch(DATA_PATH, { cache: "no-store" });
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
  document.title = `${state?.meta.documentTitle || "Estimativa OrÃ§amentÃ¡ria"} - ${client}`;
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
      ? "composiÃ§Ã£o"
      : sectionName === "commissioning"
        ? "parÃ¡grafo"
        : "etapa";
  return `<div class="page-controls" data-section="${sectionName}"><span>Editar ${label}</span><button class="inline-action" type="button" data-action="add-topic" data-section="${sectionName}">+ adicionar</button><button class="inline-action" type="button" data-action="remove-topic" data-section="${sectionName}">- remover selecionado</button></div>`;
}

function render() {
  setPdfTitle();
  documentRoot.innerHTML = `
    <div class="page-shell"><section class="pdf-page cover-page"><div class="page-artboard">${renderHeader()}<img class="pdf-logo" src="assets/brand/mattar-mark-ref.png" alt="" aria-hidden="true" /><div class="cover-copy"><h1 class="cover-title">${editable(
      "cover.titlePrefix",
      state.cover.titlePrefix,
    )}<br />${editable("cover.titleHighlight", state.cover.titleHighlight, "span", "cover-title__red")} ${editable(
      "cover.titleSuffix",
      state.cover.titleSuffix,
    )}</h1><div class="detail-list">${renderDetails()}</div><div class="detail-actions"><button class="inline-action" type="button" data-action="add-detail">+ campo</button><button class="inline-action" type="button" data-action="remove-detail">- campo</button></div></div></div></section></div>
    <div class="page-shell"><section class="pdf-page commissioning-page"><div class="page-artboard">${renderHeader()}<img class="pdf-logo" src="assets/brand/mattar-mark-ref.png" alt="" aria-hidden="true" />${editable(
      "commissioning.title",
      state.commissioning.title,
      "h1",
      "page-title",
    )}${renderTopicControls("commissioning")}<div class="commissioning-copy">${renderCommissioningParagraphs()}</div></div></section></div>
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

function saveLocal() {
  syncFromDom();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  setStatus("Documento salvo neste navegador.");
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
  localStorage.removeItem(STORAGE_KEY);
  history.replaceState(null, "", location.pathname);
  state = clone(await loadDefaultData());
  selectedTopic = { section: "composition", index: 0 };
  render();
  setStatus("Modelo restaurado.");
}

function addTopic(section, index = selectedTopic.section === section ? selectedTopic.index : 0) {
  syncFromDom();
  const insertAt = Math.max(0, Number(index)) + 1;

  if (section === "commissioning") {
    state.commissioning.paragraphs.splice(insertAt, 0, "Novo parÃ¡grafo.");
    selectedTopic = { section, index: insertAt };
    render();
    return;
  }

  state[section].items.splice(insertAt, 0, { heading: "Novo tÃ³pico", body: "Descreva este item." });
  selectedTopic = { section, index: insertAt };
  render();
}

function removeTopic(section, index = selectedTopic.section === section ? selectedTopic.index : 0) {
  syncFromDom();
  const removeAt = Math.max(0, Number(index));

  if (section === "commissioning") {
    if (state.commissioning.paragraphs.length <= 1) {
      setStatus("Mantenha ao menos um parÃ¡grafo.");
      return;
    }
    state.commissioning.paragraphs.splice(removeAt, 1);
    selectedTopic = {
      section,
      index: Math.max(0, Math.min(removeAt, state.commissioning.paragraphs.length - 1)),
    };
    render();
    return;
  }

  if (state[section].items.length <= 1) {
    setStatus("Mantenha ao menos um tÃ³pico.");
    return;
  }

  state[section].items.splice(removeAt, 1);
  selectedTopic = {
    section,
    index: Math.max(0, Math.min(removeAt, state[section].items.length - 1)),
  };
  render();
}

function addDetail() {
  syncFromDom();
  state.cover.details.push({ label: "NOVO CAMPO", value: "InformaÃ§Ã£o" });
  render();
}

function removeDetail() {
  syncFromDom();
  if (state.cover.details.length <= 1) {
    setStatus("Mantenha ao menos um campo.");
    return;
  }
  state.cover.details.pop();
  render();
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
  if (event.target.matches("[contenteditable]")) syncFromDom();
});

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

init().catch((error) => {
  documentRoot.innerHTML = `<section class="pdf-page"><p>${escapeHtml(error.message)}</p></section>`;
});


