(function () {
  const STORAGE_KEY = "mattar-editor-draft:v3";
  const BACKUP_STORAGE_KEY = "mattar-editor-draft-backup:v1";
  const PROJECT_KIND = "mattar-editor-project";
  const PROJECT_FORMAT_VERSION = 1;
  const slides = Array.isArray(window.MATTAR_SLIDES) ? window.MATTAR_SLIDES : [];
  const frame = document.querySelector("[data-presentation-frame]");
  const pageList = document.querySelector("[data-page-list]");
  const pageCount = document.querySelector("[data-page-count]");
  const propertyList = document.querySelector("[data-property-list]");
  const emptyState = document.querySelector("[data-empty-state]");
  const currentIndexElement = document.querySelector("[data-current-index]");
  const currentTitleElement = document.querySelector("[data-current-title]");
  const currentTypeElement = document.querySelector("[data-current-type]");
  const pageJump = document.querySelector("[data-page-jump]");
  const frameShell = document.querySelector("[data-frame-shell]");
  const canvasViewport = document.querySelector("[data-canvas-viewport]");
  const zoomSelect = document.querySelector("[data-zoom-select]");
  const importFileInput = document.querySelector("[data-import-file]");
  const TEXT_STYLE_OPTIONS = {
    font: ["", "Univers LT, Arial, sans-serif", "Arial, Helvetica, sans-serif", "Georgia, serif"],
    weight: ["", "300", "400", "700"],
    size: ["", "18px", "24px", "32px", "44px", "64px", "82px", "110px"],
    lineHeight: ["", "0.95", "1.05", "1.15", "1.3", "1.5"],
    tracking: ["", "0", "0.02em", "0.04em", "0.08em"],
    align: ["", "left", "center", "right"],
    color: ["", "#222222", "#ce211a", "#f6f3ef", "#902018"],
    width: ["", "24rem", "34rem", "48rem", "62rem"],
  };
  let statusMessage = "";
  let isPreview = false;
  let state = loadDraft() || defaultState();

  function defaultStructure() { return slides.map((slide) => ({ sourceId: slide.id, instanceId: `${slide.id}:base`, hidden: false, label: "" })); }
  function defaultState() { return { activePage: 0, activePageId: "01-abertura:base", selection: null, overrides: {}, structure: defaultStructure(), past: [], future: [] }; }
  function activeItem() { return state.structure[state.activePage] || state.structure[0]; }
  function activeSlide() { return slides.find((slide) => slide.id === activeItem()?.sourceId) || slides[0]; }
  function activeInstanceId(slide = activeSlide()) { return activeItem()?.instanceId || `${slide?.id}:base`; }
  function textElementId(slide, text) { return `${slide.id}:${text.id}`; }
  function assetElementId(slide = activeSlide()) { return slide?.asset ? `asset:${slide.id}:${activeInstanceId(slide)}` : ""; }
  function selectedId() { return state.selection?.elementId || ""; }
  function clampPage(index) { const parsed = Number.parseInt(index, 10); return Math.min(Math.max(Number.isFinite(parsed) ? parsed : 0, 0), Math.max(state.structure.length - 1, 0)); }
  function escapeHtml(value = "") { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }

  function defaultAssetSettings(slide) {
    const type = slide?.asset?.type || "page";
    if (type === "vertical-image-carousel") return { autoplay: true, speed: 32, scale: 82, highlightWords: (slide.highlightWords || []).join(", ") };
    if (type === "rubber-m-vector-text-v3") return { text: "Gastroperformance", tension: 0.72, scale: 1 };
    if (type === "mattar-3d-world-flows") return { rotate: true, speed: 0.45, pointsVisible: true };
    if (type === "dynamic-image-webpage") return { transition: "slide", density: 1, activeProject: 0 };
    if (type === "cursor-tilt-mattar") return { intensity: 0.82, scale: 1 };
    if (slide?.animation === "compress") return { compression: 0.64, duration: 0.8 };
    return { background: slide?.background || "#f6f3ef" };
  }
  function assetSettings(slide = activeSlide()) { const id = assetElementId(slide); return state.overrides[id] && typeof state.overrides[id] === "object" ? state.overrides[id] : defaultAssetSettings(slide); }
  function textOriginal(elementId) { const [pageId, textId] = elementId.split(":"); const slide = slides.find((item) => item.id === pageId); return slide?.texts?.find((text) => text.id === textId)?.text || ""; }
  function textInfo(elementId = selectedId()) { const [pageId, textId] = String(elementId).split(":"); const slide = slides.find((item) => item.id === pageId); const text = slide?.texts?.find((item) => item.id === textId); if (!slide || !text) return null; const override = state.overrides[elementId]; return { slide, text, elementId, value: typeof override === "string" ? override : override?.text ?? text.text, style: override?.style || {} }; }
  function isTextElement(id) { return Boolean(textInfo(id)); }
  function isAssetElement(id) { return String(id).startsWith("asset:"); }

  function snapshot() { return { activePage: state.activePage, activePageId: state.activePageId, selection: state.selection, overrides: state.overrides, structure: state.structure }; }
  function commit(patch) { state = { ...state, ...patch, past: [...state.past, snapshot()], future: [] }; persist(); render(); syncFrame(); }
  function dispatch(action) {
    if (action.type === "select-page") { state = { ...state, activePage: clampPage(action.index), activePageId: state.structure[clampPage(action.index)]?.instanceId || "", selection: null }; persist(); render(); syncFrame({ animate: false }); return; }
    if (action.type === "select-element") { state = { ...state, selection: action.selection || null }; persist(); render(); postToFrame({ type: "mattar:set-selected-element", elementId: selectedId() }); return; }
    if (action.type === "set-text") { const previous = state.overrides; const original = textOriginal(action.elementId); const next = { ...state.overrides }; const current = next[action.elementId]; const style = current && typeof current === "object" ? current.style || {} : {}; if (action.value === original && !Object.keys(style).length) delete next[action.elementId]; else next[action.elementId] = Object.keys(style).length ? { text: action.value, style } : action.value; commit({ overrides: next }); return; }
    if (action.type === "set-text-style") { const info = textInfo(action.elementId); if (!info) return; const nextStyle = action.reset ? {} : { ...info.style, ...action.style }; Object.keys(nextStyle).forEach((key) => { if (!nextStyle[key]) delete nextStyle[key]; }); const next = { ...state.overrides }; if (info.value === info.text.text && !Object.keys(nextStyle).length) delete next[action.elementId]; else next[action.elementId] = { text: info.value, style: nextStyle }; commit({ overrides: next }); return; }
    if (action.type === "set-asset") { const next = { ...state.overrides, [action.elementId]: action.settings }; commit({ overrides: next }); return; }
    if (action.type === "reset-element") { const next = { ...state.overrides }; delete next[action.elementId]; commit({ overrides: next, selection: null }); return; }
    if (action.type === "reset-page") { const slide = activeSlide(); const next = { ...state.overrides }; (slide.texts || []).forEach((text) => delete next[textElementId(slide, text)]); delete next[assetElementId(slide)]; commit({ overrides: next, selection: null }); return; }
    if (action.type === "toggle-hidden") { if (state.structure.filter((item) => !item.hidden).length <= 1 && !state.structure[action.index].hidden) return; const structure = state.structure.map((item, index) => index === action.index ? { ...item, hidden: !item.hidden } : item); commit({ structure }); return; }
    if (action.type === "undo" && state.past.length) { const past = state.past.slice(); const previous = past.pop(); state = { ...state, ...previous, past, future: [snapshot(), ...state.future] }; persist(); render(); syncFrame(); return; }
    if (action.type === "redo" && state.future.length) { const future = state.future.slice(); const next = future.shift(); state = { ...state, ...next, past: [...state.past, snapshot()], future }; persist(); render(); syncFrame(); }
  }

  function draftPayload() { return { version: 3, activePage: state.activePage, activePageId: activeItem()?.instanceId || "", selection: state.selection, overrides: state.overrides, structure: state.structure }; }
  function persist() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(draftPayload())); } catch { statusMessage = "Nao foi possivel salvar localmente."; } }
  function loadDraft() { try { const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); if (!parsed || !Array.isArray(parsed.structure)) return null; const valid = parsed.structure.filter((item) => item && slides.some((slide) => slide.id === item.sourceId)); if (valid.length !== slides.length) return null; return { ...defaultState(), ...parsed, structure: valid, activePage: Math.min(Math.max(Number(parsed.activePage) || 0, 0), valid.length - 1), past: [], future: [] }; } catch { return null; } }
  function projectDocument() { return { kind: PROJECT_KIND, version: PROJECT_FORMAT_VERSION, app: "Lab Mattar Editor", createdAt: new Date().toISOString(), metadata: { title: "Nova Apresentação Mattar", slideCount: slides.length, activePage: state.activePage, activePageId: activeItem()?.instanceId || "", exportedFrom: "editor/index.html" }, project: draftPayload() }; }
  function postToFrame(message) { frame?.contentWindow?.postMessage(message, "*"); }
  function syncFrame(options = {}) { postToFrame({ type: "mattar:set-project", project: projectDocument() }); postToFrame({ type: "mattar:select-slide", index: state.activePage, animate: Boolean(options.animate) }); }

  function renderPageList() {
    if (!pageList) return;
    pageList.innerHTML = state.structure.map((item, index) => { const slide = slides.find((entry) => entry.id === item.sourceId); return `<button class="page-item${index === state.activePage ? " is-active" : ""}" type="button" data-page-index="${index}"><span class="page-index">${String(index + 1).padStart(2, "0")}</span><span><strong class="page-name">${escapeHtml(slide?.title || item.sourceId)}</strong><span class="page-meta">${escapeHtml(slide?.pageType || "")}${item.hidden ? " · oculta" : ""}</span></span></button>`; }).join("");
    if (pageCount) pageCount.textContent = String(state.structure.length);
    if (pageJump) pageJump.innerHTML = state.structure.map((item, index) => { const slide = slides.find((entry) => entry.id === item.sourceId); return `<option value="${index}" ${index === state.activePage ? "selected" : ""}>${String(index + 1).padStart(2, "0")} ${escapeHtml(slide?.title || "")}</option>`; }).join("");
  }
  function propertyRow(label, value) { return `<div class="property-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value ?? "")}</dd></div>`; }
  function selectOptions(options, selected, labels = {}) { return options.map((value) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(labels[value] || value || "Padrao")}</option>`).join(""); }
  function textButtons(slide) { return (slide.texts || []).map((text) => `<button type="button" data-select-element="${escapeHtml(textElementId(slide, text))}">${escapeHtml(text.role)} · ${escapeHtml(text.id)}</button>`).join(""); }

  function pageInspector(slide) {
    const asset = slide.asset;
    return `<div class="inspector-stack"><section class="inspector-card"><p class="inspector-eyebrow">Pagina</p><h2>${escapeHtml(slide.title)}</h2><dl class="property-list property-list--compact">${propertyRow("Secao", slide.section)}${propertyRow("Fundo", slide.background || "Ivory")}${propertyRow("Transicao", slide.transitionToNext || "")}${propertyRow("Visibilidade", activeItem()?.hidden ? "Oculta" : "Visivel")}</dl><p class="inspector-eyebrow">Textos editaveis</p><div class="page-element-actions">${textButtons(slide)}</div><p class="inspector-eyebrow">Asset</p><div class="page-element-actions">${asset ? `<button type="button" data-select-element="${escapeHtml(assetElementId(slide))}">${escapeHtml(asset.type)}</button>` : "<button disabled>Sem asset configuravel</button>"}</div><div class="edit-actions inspector-actions"><button type="button" data-toggle-hidden="${state.activePage}">${activeItem()?.hidden ? "Reexibir" : "Ocultar"}</button><button type="button" data-reset-page>Reset da pagina</button></div><div class="edit-status">${escapeHtml(statusMessage)}</div></section><details class="inspector-section"><summary>Informacoes tecnicas</summary><div class="inspector-section-body">${propertyRow("Page ID", slide.id)}${propertyRow("Instance ID", activeInstanceId(slide))}${propertyRow("Source ID", activeItem()?.sourceId || "")}</div></details></div>`;
  }

  function textInspector(info) {
    const style = info.style;
    return `<div class="inspector-stack"><section class="inspector-card"><p class="inspector-eyebrow">Texto selecionado</p><h2>${escapeHtml(info.text.role)}</h2><label class="edit-field"><span>Conteudo</span><textarea data-text-content data-element-id="${escapeHtml(info.elementId)}">${escapeHtml(info.value)}</textarea></label><label class="edit-field"><span>Tipo</span><input value="${escapeHtml(info.text.role)}" readonly></label><div class="edit-actions inspector-actions"><button type="button" data-reset-element="${escapeHtml(info.elementId)}">Reset</button><button type="button" data-reset-text-style>Reset propriedades</button></div></section><details class="inspector-section" open><summary>Tipografia</summary><div class="inspector-section-body"><label class="edit-field"><span>Fonte</span><select data-text-style="font">${selectOptions(TEXT_STYLE_OPTIONS.font, style.font || "", { "Univers LT, Arial, sans-serif": "Univers LT" })}</select></label><label class="edit-field"><span>Peso</span><select data-text-style="weight">${selectOptions(TEXT_STYLE_OPTIONS.weight, style.weight || "")}</select></label><label class="edit-field"><span>Tamanho</span><select data-text-style="size">${selectOptions(TEXT_STYLE_OPTIONS.size, style.size || "")}</select></label><label class="edit-field"><span>Entrelinha</span><select data-text-style="lineHeight">${selectOptions(TEXT_STYLE_OPTIONS.lineHeight, style.lineHeight || "")}</select></label><label class="edit-field"><span>Tracking</span><select data-text-style="tracking">${selectOptions(TEXT_STYLE_OPTIONS.tracking, style.tracking || "")}</select></label><label class="edit-field"><span>Alinhamento</span><select data-text-style="align">${selectOptions(TEXT_STYLE_OPTIONS.align, style.align || "")}</select></label><label class="edit-field"><span>Cor</span><select data-text-style="color">${selectOptions(TEXT_STYLE_OPTIONS.color, style.color || "")}</select></label><label class="edit-field"><span>Largura</span><select data-text-style="width">${selectOptions(TEXT_STYLE_OPTIONS.width, style.width || "")}</select></label></div></details><details class="inspector-section"><summary>Informacoes tecnicas</summary><div class="inspector-section-body">${propertyRow("Element ID", info.elementId)}${propertyRow("Page ID", info.slide.id)}</div></details></div>`;
  }

  function assetInspector(slide) {
    const id = assetElementId(slide);
    const settings = assetSettings(slide);
    const controls = Object.entries(settings).map(([key, value]) => {
      if (typeof value === "boolean") return `<label class="edit-field"><span>${escapeHtml(key)}</span><input type="checkbox" data-asset-setting="${escapeHtml(key)}" ${value ? "checked" : ""}></label>`;
      if (typeof value === "number") return `<label class="edit-field"><span>${escapeHtml(key)} ${value}</span><input type="range" min="0" max="2" step="0.01" value="${value}" data-asset-setting="${escapeHtml(key)}"></label>`;
      return `<label class="edit-field"><span>${escapeHtml(key)}</span><input type="text" value="${escapeHtml(value)}" data-asset-setting="${escapeHtml(key)}"></label>`;
    }).join("");
    return `<div class="inspector-stack"><section class="inspector-card"><p class="inspector-eyebrow">Asset selecionado</p><h2>${escapeHtml(slide.asset?.type || "Asset")}</h2><dl class="property-list property-list--compact">${propertyRow("Tipo", slide.asset?.type || "")}${propertyRow("Estado", "Carregado em iframe")}${propertyRow("Modo", isPreview ? "Interacao" : "Edicao")}</dl>${controls}<div class="edit-actions inspector-actions"><button type="button" data-asset-restart>Reiniciar</button><button type="button" data-asset-pause>Pausar</button><button type="button" data-asset-play>Reproduzir</button><button type="button" data-reset-element="${escapeHtml(id)}">Reset</button></div></section><details class="inspector-section"><summary>Informacoes tecnicas</summary><div class="inspector-section-body">${propertyRow("Element ID", id)}${propertyRow("Caminho", slide.asset?.src || "")}${propertyRow("Dataset", slide.asset?.dataset || "")}</div></details></div>`;
  }

  function renderInspector() {
    const slide = activeSlide();
    if (!propertyList || !emptyState || !slide) return;
    emptyState.hidden = true;
    const id = selectedId();
    if (isTextElement(id)) propertyList.innerHTML = textInspector(textInfo(id));
    else if (isAssetElement(id)) propertyList.innerHTML = assetInspector(slide);
    else propertyList.innerHTML = pageInspector(slide);
    if (currentIndexElement) currentIndexElement.textContent = String(state.activePage + 1).padStart(2, "0");
    if (currentTitleElement) currentTitleElement.textContent = slide.title;
    if (currentTypeElement) currentTypeElement.textContent = slide.pageType;
    document.querySelectorAll("[data-undo]").forEach((button) => button.disabled = !state.past.length);
    document.querySelectorAll("[data-redo]").forEach((button) => button.disabled = !state.future.length);
  }

  function render() { renderPageList(); renderInspector(); fitFrame(); }
  function fitFrame() { if (!frameShell || !canvasViewport || isPreview) return; const rect = canvasViewport.getBoundingClientRect(); const scale = Math.min((rect.width - 48) / 1440, (rect.height - 48) / 900, 1); frameShell.style.setProperty("--frame-scale", String(Math.max(scale, .12))); }
  function setPreview(value) { isPreview = Boolean(value); document.body.classList.toggle("is-preview", isPreview); syncFrame(); setTimeout(() => isPreview ? frame?.focus() : fitFrame(), 80); }
  function exportProject() { const blob = new Blob([JSON.stringify(projectDocument(), null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "mattar-apresentacao-final.json"; link.click(); URL.revokeObjectURL(url); statusMessage = "Projeto exportado."; render(); }
  function importProject(file) { if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const parsed = JSON.parse(reader.result); if (parsed.kind !== PROJECT_KIND || parsed.version !== PROJECT_FORMAT_VERSION) throw new Error("Formato invalido."); localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify({ createdAt: new Date().toISOString(), draft: draftPayload() })); state = { ...defaultState(), ...parsed.project, past: [], future: [] }; persist(); statusMessage = "Projeto importado."; render(); syncFrame(); } catch (error) { statusMessage = error.message || "Falha ao importar."; render(); } }; reader.readAsText(file); }

  pageList?.addEventListener("click", (event) => { const item = event.target.closest("[data-page-index]"); if (item) dispatch({ type: "select-page", index: item.dataset.pageIndex }); });
  pageJump?.addEventListener("change", () => dispatch({ type: "select-page", index: pageJump.value }));
  zoomSelect?.addEventListener("change", () => { if (zoomSelect.value === "fit") fitFrame(); else frameShell?.style.setProperty("--frame-scale", zoomSelect.value); });
  propertyList?.addEventListener("click", (event) => { const select = event.target.closest("[data-select-element]"); if (select) return dispatch({ type: "select-element", selection: { elementId: select.dataset.selectElement, elementType: isAssetElement(select.dataset.selectElement) ? "asset" : "text" } }); const reset = event.target.closest("[data-reset-element]"); if (reset) return dispatch({ type: "reset-element", elementId: reset.dataset.resetElement }); if (event.target.closest("[data-reset-page]")) return dispatch({ type: "reset-page" }); if (event.target.closest("[data-reset-text-style]")) return dispatch({ type: "set-text-style", elementId: selectedId(), reset: true }); const hidden = event.target.closest("[data-toggle-hidden]"); if (hidden) return dispatch({ type: "toggle-hidden", index: hidden.dataset.toggleHidden }); if (event.target.closest("[data-asset-restart]")) postToFrame({ type: "mattar:asset-command", command: "restart", elementId: selectedId() }); if (event.target.closest("[data-asset-pause]")) postToFrame({ type: "mattar:asset-command", command: "pause", elementId: selectedId() }); if (event.target.closest("[data-asset-play]")) postToFrame({ type: "mattar:asset-command", command: "play", elementId: selectedId() }); });
  propertyList?.addEventListener("input", (event) => { if (event.target.matches("[data-text-content]")) dispatch({ type: "set-text", elementId: event.target.dataset.elementId, value: event.target.value }); const assetInput = event.target.closest("[data-asset-setting]"); if (assetInput) { let value = assetInput.type === "checkbox" ? assetInput.checked : assetInput.value; if (assetInput.type === "range") value = Number(assetInput.value); dispatch({ type: "set-asset", elementId: assetElementId(activeSlide()), settings: { ...assetSettings(), [assetInput.dataset.assetSetting]: value } }); } });
  propertyList?.addEventListener("change", (event) => { if (event.target.matches("[data-text-style]")) dispatch({ type: "set-text-style", elementId: selectedId(), style: { [event.target.dataset.textStyle]: event.target.value } }); });
  document.querySelector("[data-preview-toggle]")?.addEventListener("click", () => setPreview(true));
  document.querySelector("[data-preview-return]")?.addEventListener("click", () => setPreview(false));
  document.querySelector("[data-export-project]")?.addEventListener("click", exportProject);
  document.querySelector("[data-import-project]")?.addEventListener("click", () => importFileInput?.click());
  importFileInput?.addEventListener("change", (event) => importProject(event.target.files?.[0]));
  document.querySelector("[data-reset-project]")?.addEventListener("click", () => { state = defaultState(); persist(); render(); syncFrame(); });
  document.querySelectorAll("[data-undo]").forEach((button) => button.addEventListener("click", () => dispatch({ type: "undo" })));
  document.querySelectorAll("[data-redo]").forEach((button) => button.addEventListener("click", () => dispatch({ type: "redo" })));
  window.addEventListener("resize", fitFrame);
  window.addEventListener("message", (event) => { const data = event.data || {}; if (data.type === "mattar:element-selected") dispatch({ type: "select-element", selection: { elementId: data.elementId, elementType: data.elementType } }); if (data.type === "mattar:text-input") { const next = { ...state.overrides }; const current = next[data.elementId]; const style = current && typeof current === "object" ? current.style || {} : {}; next[data.elementId] = Object.keys(style).length ? { text: data.value || "", style } : data.value || ""; state = { ...state, overrides: next }; persist(); renderInspector(); } if (data.type === "mattar:text-commit") dispatch({ type: "set-text", elementId: data.elementId, value: data.value || "" }); if (data.type === "mattar:slide-change" && Number.isFinite(Number(data.index)) && data.index !== state.activePage) { state = { ...state, activePage: Number(data.index), activePageId: state.structure[Number(data.index)]?.instanceId || "", selection: null }; persist(); render(); } });
  frame?.addEventListener("load", () => { syncFrame({ animate: false }); });
  render();
  syncFrame({ animate: false });
})();

