(function () {
  const data = window.MATTAR_CONTENT || {};
  const sections = data.sections || [];
  const projects = data.projects || [];
  const presentation = document.querySelector("#presentation");
  const currentSectionElement = document.querySelector("[data-current-section]");
  const chromeMark = document.querySelector(".chrome-mark");
  const progressLine = document.querySelector(".progress-line");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let wheelLocked = false;
  let projectAutoplayTimer = 0;
  let categoryAutoplayTimer = 0;
  let pendingAutoplayProject = "";
  const navigableIndexes = sections.map((section, index) => section.type === "project" ? -1 : index).filter((index) => index >= 0);

  function esc(value = "") {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }
  function projectById(id) { return projects.find((project) => project.id === id); }
  function img(src, alt, cls = "") { return src ? `<img class="${esc(cls)}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">` : ""; }
  function tool(src, title, cls = "") {
    const join = src.includes("?") ? "&" : "?";
    return `<div class="tool-frame ${esc(cls)}"><iframe src="${esc(src + join + "embed=1")}" title="${esc(title)}" loading="lazy"></iframe></div>`;
  }
  function richText(value = "") {
    const highlights = [
      "Instituto de Gastroperformance", "Gastroperformance", "Simone Mattar", "criadora do termo gastroperformance", "nunca é apenas nutrir-se", "processos de pesquisa",
      "experiências imersivas", "campo transdisciplinar", "plataforma permanente", "linguagem expressiva",
      "narrativas sensoriais", "pensamento crítico", "experiências coletivas", "uma única narrativa",
      "matéria de criação", "matéria artística", "relação cotidiana", "diferentes escalas",
      "planta aberta", "ato de comer", "áreas abertas", "gastroperformances", "masterclasses",
      "publicações", "exposições", "arquitetura", "gastronomia", "território", "convivência",
      "linguagem artística", "conversas", "eventos", "comida", "prato", "mesa", "corpo",
      "design", "cursos", "Desde 2013", "90 m²", "113 m²"
    ];
    const escaped = esc(value);
    const pattern = highlights
      .map((term) => esc(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .sort((a, b) => b.length - a.length)
      .join("|");
    const boundary = new RegExp(`(^|[^\\p{L}\\p{N}])(${pattern})(?=$|[^\\p{L}\\p{N}])`, "giu");
    return escaped.replace(boundary, (match, prefix, term) => `${prefix}<strong>${term}</strong>`);
  }
  function copy(items, cls = "body-copy") {
    return `<div class="${cls}">${(Array.isArray(items) ? items : [items]).filter(Boolean).map((item) => `<p>${richText(item)}</p>`).join("")}</div>`;
  }  function shell(section, inner, extra = "") {
    const index = sections.indexOf(section);
    return `<section id="${esc(section.id)}" class="story-section ${esc(extra)}" data-index="${index}" data-section="${esc(section.section || section.title || "")}" data-pdf-page="${esc(section.pdfPage || "")}" aria-hidden="true"><div class="page-index">${String(section.pdfPage || "").padStart(2, "0")}</div>${inner}</section>`;
  }
  function instituteImage(section, offset = 0) {
    const indexes = section.images || [0];
    return data.instituteImages?.[indexes[offset % indexes.length]] || data.referenceImages?.[offset] || data.instituteImages?.[0];
  }
  function fixedMGroup(section) {
    if (section.type === "institute" || section.type === "location" || section.type === "space-overview") return data.mInstituteImages || [];
    const key = section.visualGroup || (section.section === "Gastroperformance" ? "food" : section.section === "Programação" ? "tables" : "spaces");
    return data.refImageGroups?.[key] || data.refImageGroups?.spaces || [];
  }
  function sharedMVisual(section, alt = section.title) {
    const images = fixedMGroup(section).slice(0, 6).map((src) => encodeURIComponent(src.startsWith("/") ? src : `/${src}`)).join("|");
    const join = data.tools.cursorTilt.includes("?") ? "&" : "?";
    const src = `${data.tools.cursorTilt}${join}embed=1&fixedm=1&images=${images}`;
    return `<div class="fixed-institute-m" aria-hidden="true"><iframe data-global-cursor-target src="${esc(src)}" title="M Mattar interativo fixo" loading="lazy"></iframe></div>`;
  }

  const renderers = {
    opening(section) {
      return shell(section, `${tool(data.tools.cursorTilt, "M interativo por cursor", "tool-opening")}<div class="opening-copy reveal"><h1>${esc(section.title)}</h1><p>${esc(section.subtitle || "Por Simone Mattar")}</p></div><button class="scroll-cue" type="button" data-scroll-next aria-label="Avançar"></button>`, "section-opening");
    },
    "red-rubber"(section) {
      return shell(section, `${tool(data.tools.rubberText, "Texto elástico no vetor M", "tool-rubber")}<div class="impact-copy reveal"><h2>${esc(section.title)}</h2><p>${esc(section.subtitle)}</p></div>`, "section-red section-rubber");
    },
    "text-carousel"(section) {
      const imgs = data.carousels?.[section.carousel] || [];
      const carouselImages = Array.from({ length: 18 }, (_, i) => imgs[i % Math.max(imgs.length, 1)]).filter(Boolean);
      const cards = carouselImages.map((src, i) => `<img class="reference-vertical-carousel__card" src="${esc(src)}" alt="${esc(section.title)} ${(i % Math.max(imgs.length, 1)) + 1}" loading="lazy" decoding="async" style="--i:${i}">`).join("");
      return shell(section, `<article class="pdf-text-block reveal"><div class="body-copy line-reveal">${(section.body || []).map((item) => `<p>${richText(item)}</p>`).join("")}</div></article><div class="reference-vertical-carousel" aria-label="Sequência visual ${esc(section.title)}"><div class="reference-vertical-carousel__scene"><div class="reference-vertical-carousel__ring" style="--n:${carouselImages.length}">${cards}</div></div></div>`, `section-pdf-split section-text-carousel section-text-carousel-${esc(section.carousel || "default")}`);
    },
    world(section) {
    const chips = (data.worldProjects || []).map((item, index) => {
      const label = item.place || item.city || ('Ponto ' + String(index + 1));
      const thumb = item.image || item.thumbnail || (Array.isArray(item.images) ? item.images[0] : '');
      const number = String(index + 1).padStart(2, '0');
      const media = thumb ? '<img class="world-chip__image" src="' + esc(thumb) + '" alt="" loading="lazy" decoding="async">' : '<span class="world-chip__number">' + number + '</span>';
      return '<button type="button" class="world-chip" data-world-select="' + index + '"><span>' + number + '</span>' + media + '<strong>' + esc(label) + '</strong></button>';
    }).join('');
    return shell(section, '<div class="world-stage world-stage-clean" data-world-stage data-world-active="-1"><div class="world-chip-strip" data-world-chip-strip>' + chips + '</div><div class="world-map-cards" data-world-map-cards></div><div class="world-caption reveal is-active" data-world-caption><p>Mapa mundi</p><strong>' + esc(section.title || 'Destaques internacionais') + '</strong><span>Projetos, cidades e trajet?rias selecionadas.</span></div><div class="tool-frame tool-world"><iframe src="' + esc(data.tools.world + '?embed=1&theme=red') + '" title="Globo interativo de projetos internacionais" loading="eager"></iframe></div></div>', "section-world section-world-clean");
  },  category(section) {
      const list = projects.filter((project) => project.category === section.category).slice(0, 4);
      const first = list[0];
      return shell(section, `<div class="category-dynamic" data-category-gallery data-category-title="${esc(section.title)}" data-category-body="${esc(section.body)}" data-active-project="">${list.map((project) => `<div class="category-project-sequence" data-category-project="${esc(project.id)}">${(project.images || []).map((src, i) => `<figure class="category-bg ${i === 0 ? "is-active" : ""}" data-category-bg-index="${i}">${img(src, `${project.title} ${i + 1}`)}</figure>`).join("")}</div>`).join("")}<article class="category-live-copy reveal" data-category-copy><p class="kicker">Destaques</p><div class="dynamic-heading"><span>${String(section.pdfPage || "").padStart(2, "0")}</span><h2>${esc(section.title)}</h2></div><p>${esc(section.body)}</p></article><div class="category-project-menu" aria-label="Projetos de ${esc(section.title)}">${list.map((project, i) => `<button type="button" class="category-project-card cat-${i}" data-select-category-project="${esc(project.id)}"><span>${esc(project.year)}</span>${img(project.images?.[0], project.title)}<strong>${esc(project.title)}</strong></button>`).join("")}</div><button class="category-back" type="button" data-category-back>Voltar ao portfólio</button><button class="category-play-toggle" type="button" data-category-toggle aria-label="Pausar sequência">Pausar</button></div>`, "section-category-dynamic");
    },
    project(section) {
      const project = projectById(section.project);
      if (!project) return shell(section, "<h2>Projeto pendente</h2>", "section-project-dynamic");
      const index = projects.indexOf(project) + 1;
      return shell(section, `<div class="dynamic-project" data-project-gallery>${(project.images || []).map((src, i) => `<figure class="dynamic-bg ${i === 0 ? "is-active" : ""}" data-bg-index="${i}">${img(src, `${project.title} ${i + 1}`)}</figure>`).join("")}<article class="dynamic-project-copy reveal"><p class="kicker">${esc(project.category)}</p><div class="dynamic-heading"><span>${esc(project.year)}</span><h2>${esc(project.title)}</h2></div><p>${esc(project.description)}</p>${project.pending ? `<small class="pending-note">${esc(project.pending)}</small>` : ""}<div class="project-actions"><button type="button" class="project-back" data-project-back="${esc(project.category)}">Voltar ao portfólio</button><nav class="project-nav" aria-label="Sequência de projetos"><span>${String(index).padStart(2, "0")}</span><progress value="${index}" max="${projects.length}"></progress><span>${String(projects.length).padStart(2, "0")}</span></nav></div></article><div class="dynamic-thumbs" aria-label="Imagens de ${esc(project.title)}">${(project.images || []).map((src, i) => `<button type="button" class="${i === 0 ? "is-active" : ""}" data-thumb-index="${i}" aria-label="Imagem ${i + 1}">${img(src, `${project.title} miniatura ${i + 1}`)}</button>`).join("")}</div><div class="gallery-controls"><button type="button" data-gallery-prev aria-label="Imagem anterior">?</button><button type="button" data-gallery-next aria-label="Próxima imagem">?</button></div></div>`, "section-project-dynamic");
    },
    portal(section) {
      const body = section.body || [];
      return shell(section, `<div class="portal-reference" aria-label="Lab Mattar"><img class="portal-wordmark" src="assets/vectors/mattar.svg" alt="Lab Mattar"><img class="portal-module" src="assets/vectors/módulo.svg" alt="" aria-hidden="true"><nav class="portal-reference-nav reveal" aria-label="Navegação Lab Mattar"><button type="button" data-portal-target="portfolio">${esc(body[0] || "portfólio")}</button><button type="button" data-portal-target="institute">${esc(body[1] || "conhecer o instituto")}</button></nav></div>`, "section-portal section-portal-reference");
    },
    institute(section) { return shell(section, `<article class="institute-copy fixed-m-copy reveal">${copy(section.body)}</article>${sharedMVisual(section)}`, "section-institute section-fixed-m"); },
    location(section) { return shell(section, `<article class="location-copy fixed-m-copy reveal"><p>${richText(section.body)}</p><ul>${(section.facts || []).map((fact) => `<li>${esc(fact)}</li>`).join("")}</ul></article>${sharedMVisual(Object.assign({}, section, { visualGroup: "spaces" }))}`, "section-location section-fixed-m"); },
    "space-overview"(section) { return shell(section, `<article class="space-hero fixed-m-copy reveal"><p>${richText(section.body)}</p></article>${sharedMVisual(section)}`, "section-space-overview section-fixed-m"); },
    architecture(section) { return shell(section, `<article class="architecture-copy reveal"><p class="kicker">${esc(section.eyebrow || section.title)}</p><h2>${esc(section.title)}</h2>${section.subtitle ? `<h3>${esc(section.subtitle)}</h3>` : ""}${section.metric ? `<strong class="metric">${esc(section.metric)}</strong>` : ""}${copy(section.body)}</article><div class="architecture-media">${(section.images || []).map((_, i) => img(instituteImage(section, i), `${section.section} ${i + 1}`)).join("")}</div>`, section.type === "architecture-alt" ? "section-architecture section-architecture-alt" : "section-architecture"); },
    "architecture-alt"(section) { return renderers.architecture(section); },
    "red-title"(section) { return shell(section, `<h2 class="solo-title reveal">${esc(section.title)}</h2>`, "section-red section-title"); },
    closing(section) {
      const body = section.body || [];
      const actions = body.slice(4).map((item) => `<span class="closing-action">${esc(item)}</span>`).join("");
      return shell(section, `<article class="closing-copy reveal"><h2>${esc(section.title)}</h2><strong>${esc(body[0] || "Lab Mattar")}</strong><p class="closing-statement">${richText(body[1] || "")}</p><div class="closing-meta"><p>${esc(body[2] || "")}</p><p>${esc(body[3] || "")}</p></div><div class="closing-actions" aria-label="Ações finais">${actions}</div></article>`, "section-closing");
    }
  };

  function vectorPhaseFor(section) {
    if (!section) return "opening";
    if (section.type === "opening") return "opening";
    if (section.type === "red-rubber") return "red";
    if (section.type === "text-carousel") return "carousel";
    if (section.type === "world") return "world";
    return "quiet";
  }

  function updateVectorNarrative(previousIndex, nextIndex) {
    const previous = sections[previousIndex];
    const next = sections[nextIndex];
    const phase = vectorPhaseFor(next);
    const from = vectorPhaseFor(previous);
    document.body.dataset.vectorPhase = phase;
    document.body.dataset.vectorFrom = from;
    document.body.dataset.vectorDirection = nextIndex >= previousIndex ? "forward" : "back";
    document.body.classList.remove("vector-transitioning");
    window.clearTimeout(updateVectorNarrative.timer);
    if (!updateVectorNarrative.hasRun || previousIndex === nextIndex || from === phase) {
      updateVectorNarrative.hasRun = true;
      return;
    }
    void document.body.offsetWidth;
    document.body.classList.add("vector-transitioning");
    updateVectorNarrative.hasRun = true;
    const transitionMs = reduceMotion ? 120 : (from === "red" && phase === "carousel" ? 1020 : 1720);
    updateVectorNarrative.timer = window.setTimeout(() => document.body.classList.remove("vector-transitioning"), transitionMs);
  }

  function updateChrome(index, previousIndex = activeIndex) {
    activeIndex = index;
    const section = sections[index];
    updateVectorNarrative(previousIndex, index);
    document.body.classList.toggle("has-fixed-m", index > 0);
    document.body.classList.toggle("is-red-page", document.querySelector(`[data-index="${index}"]`)?.classList.contains("section-red"));
    if (currentSectionElement) currentSectionElement.textContent = section?.section || section?.title || "Mattar";
    document.documentElement.style.setProperty("--progress", `${(index + 1) / sections.length}`);
  }

  function stopCategoryAutoplay() {
    window.clearInterval(categoryAutoplayTimer);
    categoryAutoplayTimer = 0;
    document.querySelectorAll("[data-category-gallery]").forEach((gallery) => {
      gallery.classList.remove("is-playing", "has-project", "has-preview");
      gallery.dataset.paused = "true";
      gallery.dataset.activeProject = "";
      gallery.dataset.currentIndex = "0";
      gallery.querySelectorAll("[data-category-project]").forEach((sequence) => sequence.classList.remove("is-active"));
      gallery.querySelectorAll("[data-select-category-project]").forEach((button) => button.classList.remove("is-active"));
      const copy = gallery.querySelector("[data-category-copy]");
      if (copy) copy.innerHTML = categoryIntroMarkup(gallery);
      const toggle = gallery.querySelector("[data-category-toggle]");
      if (toggle) toggle.textContent = "Reproduzir";
    });
  }

  function stopProjectAutoplay() {
    window.clearInterval(projectAutoplayTimer);
    projectAutoplayTimer = 0;
    document.querySelectorAll("[data-project-gallery]").forEach((gallery) => gallery.classList.remove("is-playing"));
  }

  function setCategoryFrame(gallery, next) {
    const active = gallery.querySelector(".category-project-sequence.is-active");
    if (!active) return 0;
    const frames = Array.from(active.querySelectorAll("[data-category-bg-index]"));
    if (!frames.length) return 0;
    const current = (next + frames.length) % frames.length;
    gallery.dataset.currentIndex = String(current);
    frames.forEach((frame, index) => frame.classList.toggle("is-active", index === current));
    return current;
  }

  function startCategoryAutoplay(gallery) {
    window.clearInterval(categoryAutoplayTimer);
    gallery.dataset.paused = "false";
    gallery.classList.add("is-playing");
    const toggle = gallery.querySelector("[data-category-toggle]");
    if (toggle) toggle.textContent = "Pausar";
    categoryAutoplayTimer = window.setInterval(() => {
      if (gallery.dataset.paused === "true") return;
      setCategoryFrame(gallery, Number(gallery.dataset.currentIndex || 0) + 1);
    }, 2600);
  }

  function resetCategoryGallery(gallery) {
    gallery.classList.remove("has-project", "is-playing", "has-preview");
    gallery.dataset.paused = "true";
    gallery.dataset.activeProject = "";
    gallery.dataset.currentIndex = "0";
    gallery.querySelectorAll("[data-category-project]").forEach((sequence) => sequence.classList.remove("is-active"));
    gallery.querySelectorAll("[data-select-category-project]").forEach((button) => button.classList.remove("is-active"));
    const copy = gallery.querySelector("[data-category-copy]");
    if (copy) copy.innerHTML = categoryIntroMarkup(gallery);
    const toggle = gallery.querySelector("[data-category-toggle]");
    if (toggle) toggle.textContent = "Reproduzir";
  }
  function categoryIntroMarkup(gallery) {
    return `<p class="kicker">Destaques</p><div class="dynamic-heading"><span>${esc(gallery.closest(".story-section")?.dataset.pdfPage || "")}</span><h2>${esc(gallery.dataset.categoryTitle || "")}</h2></div><p>${esc(gallery.dataset.categoryBody || "")}</p>`;
  }

  function projectPreviewMarkup(project) {
    return `<p class="kicker">${esc(project.category)}</p><div class="dynamic-heading"><span>${esc(project.year)}</span><h2>${esc(project.title)}</h2></div><p>${esc(project.description)}</p>`;
  }

  function previewCategoryProject(gallery, projectId) {
    if (gallery.classList.contains("has-project")) return;
    const project = projectById(projectId);
    if (!project) return;
    gallery.dataset.previewProject = projectId;
    gallery.classList.add("has-preview");
    gallery.querySelectorAll("[data-category-project]").forEach((sequence) => {
      const active = sequence.dataset.categoryProject === projectId;
      sequence.classList.toggle("is-preview", active);
      sequence.querySelectorAll("[data-category-bg-index]").forEach((frame, index) => frame.classList.toggle("is-active", active && index === 0));
    });
    gallery.querySelectorAll("[data-select-category-project]").forEach((button) => button.classList.toggle("is-preview", button.dataset.selectCategoryProject === projectId));
    const copy = gallery.querySelector("[data-category-copy]");
    if (copy) copy.innerHTML = projectPreviewMarkup(project);
  }

  function clearCategoryPreview(gallery) {
    if (gallery.classList.contains("has-project")) return;
    gallery.dataset.previewProject = "";
    gallery.querySelectorAll("[data-category-project]").forEach((sequence) => {
      sequence.classList.remove("is-preview", "is-active");
      sequence.querySelectorAll("[data-category-bg-index]").forEach((frame) => frame.classList.remove("is-active"));
    });
    gallery.querySelectorAll("[data-select-category-project]").forEach((button) => button.classList.remove("is-preview", "is-active"));
    const copy = gallery.querySelector("[data-category-copy]");
    if (copy) copy.innerHTML = categoryIntroMarkup(gallery);
  }

  function selectCategoryProject(gallery, projectId, autoPlay = true) {
    const project = projectById(projectId);
    if (!project) return;
    gallery.dataset.activeProject = projectId;
    gallery.dataset.currentIndex = "0";
    gallery.classList.remove("has-preview");
    gallery.classList.add("has-project");
    gallery.querySelectorAll("[data-category-project]").forEach((sequence) => {
      const active = sequence.dataset.categoryProject === projectId;
      sequence.classList.toggle("is-active", active);
      sequence.querySelectorAll("[data-category-bg-index]").forEach((frame, index) => frame.classList.toggle("is-active", active && index === 0));
    });
    gallery.querySelectorAll("[data-select-category-project]").forEach((button) => button.classList.toggle("is-active", button.dataset.selectCategoryProject === projectId));
    const copy = gallery.querySelector("[data-category-copy]");
    if (copy) {
      copy.classList.add("is-changing");
      window.setTimeout(() => {
        copy.innerHTML = projectPreviewMarkup(project);
        copy.classList.remove("is-changing");
      }, 120);
    }
    if (autoPlay) startCategoryAutoplay(gallery);
  }

  function setGalleryIndex(gallery, next) {
    const backgrounds = Array.from(gallery.querySelectorAll("[data-bg-index]"));
    const thumbs = Array.from(gallery.querySelectorAll("[data-thumb-index]"));
    if (!backgrounds.length) return 0;
    const current = (next + backgrounds.length) % backgrounds.length;
    gallery.dataset.currentIndex = String(current);
    backgrounds.forEach((item, index) => item.classList.toggle("is-active", index === current));
    thumbs.forEach((item, index) => item.classList.toggle("is-active", index === current));
    return current;
  }

  function activeProjectGallery(projectId) {
    const section = sections.find((item) => item.type === "project" && item.project === projectId);
    if (!section) return null;
    return document.querySelector(`[data-index="${sections.indexOf(section)}"] [data-project-gallery]`);
  }

  function startProjectAutoplay(projectId) {
    stopProjectAutoplay();
    const gallery = activeProjectGallery(projectId);
    if (!gallery) return;
    gallery.classList.add("is-playing");
    setGalleryIndex(gallery, 0);
    projectAutoplayTimer = window.setInterval(() => {
      const current = Number(gallery.dataset.currentIndex || 0);
      setGalleryIndex(gallery, current + 1);
    }, 2600);
  }

  function goTo(index) {
    const next = Math.min(Math.max(index, 0), sections.length - 1);
    if (next === activeIndex && document.querySelector(".story-section.is-active")) return;
    const currentSection = document.querySelector(".story-section.is-active");
    const nextSection = document.querySelector(`[data-index="${next}"]`);
    stopProjectAutoplay();
    stopCategoryAutoplay();
    currentSection?.classList.remove("is-active", "is-visible");
    currentSection?.setAttribute("aria-hidden", "true");
    nextSection?.classList.add("is-active", "is-visible");
    nextSection?.setAttribute("aria-hidden", "false");
    updateChrome(next, activeIndex);
    const nextData = sections[next];
    if (nextData?.type === "world" && nextSection?.querySelector("[data-world-stage]")) {
      window.setTimeout(() => {
        const active = Number(nextSection.querySelector("[data-world-stage]")?.dataset.worldActive || -1);
        if (active < 0) showWorldPoint(0);
      }, 220);
    }
    if (nextData?.type === "project" && pendingAutoplayProject === nextData.project) {
      pendingAutoplayProject = "";
      window.setTimeout(() => startProjectAutoplay(nextData.project), 120);
    }
  }

  function bindProjectGalleries() {
    document.querySelectorAll("[data-project-gallery]").forEach((gallery) => {
      const backgrounds = Array.from(gallery.querySelectorAll("[data-bg-index]"));
      const thumbs = Array.from(gallery.querySelectorAll("[data-thumb-index]"));
      let current = Number(gallery.dataset.currentIndex || 0);
      function show(next) { current = setGalleryIndex(gallery, next); }
      thumbs.forEach((button) => button.addEventListener("click", () => show(Number(button.dataset.thumbIndex || 0))));
      gallery.querySelector("[data-gallery-prev]")?.addEventListener("click", () => show(Number(gallery.dataset.currentIndex || 0) - 1));
      gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => show(Number(gallery.dataset.currentIndex || 0) + 1));
    });
  }


  function runCategoryExpansion(gallery, button, projectId) {
    const image = button.querySelector("img");
    if (!image) {
      selectCategoryProject(gallery, projectId);
      return;
    }
    const rect = button.getBoundingClientRect();
    const overlay = document.createElement("div");
    overlay.className = "category-expand-overlay";
    overlay.style.setProperty("--start-left", `${rect.left}px`);
    overlay.style.setProperty("--start-top", `${rect.top}px`);
    overlay.style.setProperty("--start-width", `${rect.width}px`);
    overlay.style.setProperty("--start-height", `${rect.height}px`);
    overlay.innerHTML = `<img src="${esc(image.getAttribute("src") || "")}" alt="">`;
    gallery.append(overlay);
    requestAnimationFrame(() => overlay.classList.add("is-expanding"));
    window.setTimeout(() => selectCategoryProject(gallery, projectId), 180);
    window.setTimeout(() => overlay.remove(), 620);
  }
  function bindCategoryMenus() {
    document.querySelectorAll("[data-category-gallery]").forEach((gallery) => {
      gallery.querySelectorAll("[data-select-category-project]").forEach((button) => {
        button.addEventListener("pointerenter", () => previewCategoryProject(gallery, button.dataset.selectCategoryProject || ""));
        button.addEventListener("focus", () => previewCategoryProject(gallery, button.dataset.selectCategoryProject || ""));
        button.addEventListener("click", () => {
          const projectId = button.dataset.selectCategoryProject || "";
          if (gallery.dataset.activeProject === projectId) return;
          runCategoryExpansion(gallery, button, projectId);
        });
      });
      gallery.querySelector(".category-project-menu")?.addEventListener("pointerleave", () => clearCategoryPreview(gallery));
      gallery.querySelector(".category-project-menu")?.addEventListener("focusout", (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) clearCategoryPreview(gallery);
      });
      gallery.querySelector("[data-category-back]")?.addEventListener("click", () => resetCategoryGallery(gallery));
      gallery.querySelector("[data-category-toggle]")?.addEventListener("click", () => {
        const paused = gallery.dataset.paused === "true";
        if (paused) startCategoryAutoplay(gallery);
        else {
          gallery.dataset.paused = "true";
          gallery.classList.remove("is-playing");
          const toggle = gallery.querySelector("[data-category-toggle]");
          if (toggle) toggle.textContent = "Reproduzir";
        }
      });
    });
  }

  function renderWorldCard(item, index = -1) {
    const caption = document.querySelector('[data-world-caption]');
    const mapCards = document.querySelector('[data-world-map-cards]');
    if (!caption || !item) return;
    const title = item.project || item.title || 'Projeto internacional';
    const city = [item.city || item.place, item.country].filter(Boolean).join(' - ');
    const description = item.description || item.text || 'Projeto internacional da gastroperformance.';
    const image = item.image || item.thumbnail || (Array.isArray(item.images) ? item.images[0] : '');
    caption.classList.toggle('is-active', Boolean(item));
    caption.classList.remove('has-image', 'is-positioned');
    caption.innerHTML = '<div class="world-caption__copy"><p>' + esc(city || 'Destaque ativo') + '</p><strong>' + esc(title) + '</strong><span>' + esc(description) + '</span></div>';
    if (mapCards) {
      const showPoint = item.locked && Number.isFinite(item.screenX) && Number.isFinite(item.screenY) && item.visible !== false && image;
      mapCards.innerHTML = showPoint ? '<button type="button" class="world-map-card is-active" style="--world-card-x:' + Math.max(24, Math.min(window.innerWidth - 24, item.screenX)) + 'px; --world-card-y:' + Math.max(24, Math.min(window.innerHeight - 24, item.screenY)) + 'px"><span class="world-map-card__thumb"><img class="world-map-card__image" src="' + esc(image) + '" alt="' + esc(title) + '" loading="lazy" decoding="async"></span><span class="world-map-card__meta"><span class="world-map-card__place">' + esc(city || 'Cidade ativa') + '</span><strong>' + esc(title) + '</strong></span></button>' : '';
    }
    document.querySelectorAll('[data-world-stage]').forEach((stage) => stage.dataset.worldActive = String(index));
  }
  function showWorldPoint(index) {
    const points = data.worldProjects || [];
    if (!points.length) return;
    const current = (index + points.length) % points.length;
    renderWorldCard(points[current], current);
  }

  function bindWorld() {
    window.addEventListener('message', (event) => {
      if (event.data?.type !== 'mattar-world-point') return;
      const payload = event.data.payload || {};
      const points = data.worldProjects || [];
      const index = points.findIndex((item) => item.project === payload.project || item.city === payload.city || item.place === payload.place);
      renderWorldCard(payload, index);
    });
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-world-select]');
      if (!button) return;
      const index = Number(button.dataset.worldSelect);
      if (!Number.isFinite(index)) return;
      const points = data.worldProjects || [];
      const item = points[index];
      if (item) renderWorldCard(Object.assign({ locked: false }, item), index);
    });
  }

  function goRelative(delta) {
    const currentPosition = navigableIndexes.indexOf(activeIndex);
    const fallbackPosition = navigableIndexes.findIndex((index) => index > activeIndex);
    const position = currentPosition >= 0 ? currentPosition : Math.max(0, fallbackPosition);
    const nextPosition = Math.min(Math.max(position + delta, 0), navigableIndexes.length - 1);
    goTo(navigableIndexes[nextPosition]);
  }
  function openReferenceImage(src, alt = "") {
    let overlay = document.querySelector(".reference-image-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "reference-image-overlay";
      overlay.innerHTML = `<button class="reference-image-overlay__close" type="button" aria-label="Fechar imagem">�</button><img class="reference-image-overlay__image" alt="">`;
      document.body.append(overlay);
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay || event.target.closest(".reference-image-overlay__close")) {
          overlay.classList.remove("is-open");
          overlay.setAttribute("aria-hidden", "true");
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          overlay.classList.remove("is-open");
          overlay.setAttribute("aria-hidden", "true");
        }
      });
    }
    const image = overlay.querySelector(".reference-image-overlay__image");
    image.src = src;
    image.alt = alt;
    overlay.setAttribute("aria-hidden", "false");
    overlay.classList.add("is-open");
  }
  function bindReferenceCarousels() {
    document.querySelectorAll(".reference-vertical-carousel").forEach((carousel) => {
      if (carousel.dataset.referenceBound === "true") return;
      carousel.dataset.referenceBound = "true";
      const ring = carousel.querySelector(".reference-vertical-carousel__ring");
      const cards = Array.from(carousel.querySelectorAll(".reference-vertical-carousel__card"));
      if (!ring || !cards.length) return;

      carousel.classList.add("is-reference-controlled");
      const reverse = false;
      const state = { rotation: 0, target: 0, dragging: false, lastY: 0, moved: 0, pressedCard: null, tiltX: 0, tiltY: 0, targetTiltX: 0, targetTiltY: 0, lastTime: performance.now() };
      const speed = ((reverse ? 1 : -1) / (reverse ? 46 : 42)) * 0.6;

      function apply() {
        ring.style.setProperty("--reference-rotation", `${state.rotation}turn`);
        ring.style.setProperty("--tilt-x", `${state.tiltY || 0}deg`);
        ring.style.setProperty("--tilt-y", `${state.tiltX || 0}deg`);
      }

      function frame(now) {
        const delta = Math.min(0.05, (now - state.lastTime) / 1000 || 0);
        state.lastTime = now;
        state.tiltX += (state.targetTiltX - state.tiltX) * Math.min(1, delta * 7);
        state.tiltY += (state.targetTiltY - state.tiltY) * Math.min(1, delta * 7);
        apply();
        if (!state.dragging) {
          const diff = state.target - state.rotation;
          if (Math.abs(diff) > 0.0005) state.rotation += diff * Math.min(1, delta * 4);
          else state.rotation += speed * delta;
          state.target = state.rotation;
          apply();
        }
        requestAnimationFrame(frame);
      }

      carousel.addEventListener("pointerdown", (event) => {
        state.dragging = true;
        state.lastY = event.clientY;
        state.moved = 0;
        carousel.classList.add("is-dragging");
        carousel.setPointerCapture?.(event.pointerId);
        event.preventDefault();
      });

      carousel.addEventListener("pointermove", (event) => {
        if (!state.dragging) return;
        const deltaY = event.clientY - state.lastY;
        state.lastY = event.clientY;
        state.moved += Math.abs(deltaY);
        state.rotation -= deltaY * 0.00045;
        state.target = state.rotation;
        apply();
        event.preventDefault();
      });

      function openCard(card) {
        if (!card) return;
        const index = cards.indexOf(card);
        const n = cards.length || 1;
        if (index >= 0) state.target = -index / n;
        openReferenceImage(card.currentSrc || card.src, card.alt || "");
      }

      function endDrag(event) {
        if (!state.dragging) return;
        const card = document.elementFromPoint(event.clientX, event.clientY)?.closest?.(".reference-vertical-carousel__card") || state.pressedCard;
        state.dragging = false;
        state.pressedCard = null;
        carousel.classList.remove("is-dragging");
        carousel.releasePointerCapture?.(event.pointerId);
        if (state.moved <= 14) openCard(card);
      }

      carousel.addEventListener("pointerup", endDrag);
      carousel.addEventListener("pointercancel", endDrag);
      carousel.closest(".story-section")?.addEventListener("pointermove", (event) => {
        const px = (event.clientX / window.innerWidth - 0.5) || 0;
        const py = (event.clientY / window.innerHeight - 0.5) || 0;
        state.targetTiltX = px * 8;
        state.targetTiltY = py * -6;
      });
      carousel.closest(".story-section")?.addEventListener("pointerleave", () => { state.targetTiltX = 0; state.targetTiltY = 0; });

      cards.forEach((card) => {
        card.addEventListener("click", (event) => {
          if (state.moved <= 14) openCard(card);
          event.preventDefault();
        });
      });

      apply();
      requestAnimationFrame(frame);
    });
  }
  function bindProgressDrag() {
    if (!progressLine || !sections.length) return;
    let dragging = false;
    let pendingIndex = activeIndex;
    let dragFrame = 0;
    function indexFromPointer(event) {
      const rect = progressLine.getBoundingClientRect();
      const ratio = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
      return Math.round(ratio * (sections.length - 1));
    }
    function commitDrag() {
      dragFrame = 0;
      if (pendingIndex !== activeIndex) goTo(pendingIndex);
    }
    function scheduleGoTo(event) {
      pendingIndex = indexFromPointer(event);
      if (!dragFrame) dragFrame = window.requestAnimationFrame(commitDrag);
    }
    progressLine.addEventListener("pointerdown", (event) => {
      dragging = true;
      progressLine.setPointerCapture?.(event.pointerId);
      document.body.classList.add("is-progress-dragging");
      event.preventDefault();
      scheduleGoTo(event);
    });
    progressLine.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      event.preventDefault();
      scheduleGoTo(event);
    });
    function stopDrag(event) {
      if (!dragging) return;
      dragging = false;
      progressLine.releasePointerCapture?.(event.pointerId);
      document.body.classList.remove("is-progress-dragging");
    }
    progressLine.addEventListener("pointerup", stopDrag);
    progressLine.addEventListener("pointercancel", stopDrag);
  }

  function bindGlobalCursorTilt() {
    let frame = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastMoveAt = performance.now();
    function send() {
      frame = 0;
      const payload = {
        type: "mattar:global-cursor",
        x: window.innerWidth ? lastX / window.innerWidth : 0.5,
        y: window.innerHeight ? lastY / window.innerHeight : 0.5
      };
      document.querySelectorAll("[data-global-cursor-target]").forEach((iframe) => {
        iframe.contentWindow?.postMessage(payload, "*");
      });
    }
    function autoplay(now) {
      const active = document.querySelector('.story-section.is-active');
      const fixedMode = Boolean(active?.classList.contains('section-fixed-m'));
      if (fixedMode && now - lastMoveAt > 300) {
        const phase = now * 0.00035;
        const width = Math.max(window.innerWidth, 1);
        const height = Math.max(window.innerHeight, 1);
        lastX = width * (0.54 + Math.sin(phase) * 0.06 + Math.cos(phase * 0.43) * 0.02);
        lastY = height * (0.46 + Math.cos(phase * 0.78) * 0.05);
        send();
      }
      frame = window.requestAnimationFrame(autoplay);
    }
    window.addEventListener("pointermove", (event) => {
      lastX = event.clientX;
      lastY = event.clientY;
      lastMoveAt = performance.now();
      if (!frame) frame = window.requestAnimationFrame(send);
    }, { passive: true });
    frame = window.requestAnimationFrame(autoplay);
  }
  function bindNavigation() {
    document.querySelector("[data-scroll-next]")?.addEventListener("click", () => goRelative(1));
    document.querySelectorAll("[data-world-continue]").forEach((button) => button.addEventListener("click", () => goRelative(1)));
    document.querySelectorAll("[data-project-back]").forEach((button) => button.addEventListener("click", () => {
      const category = button.dataset.projectBack || "";
      const index = sections.findIndex((item) => item.type === "category" && item.category === category);
      if (index >= 0) goTo(index);
    }));
    document.querySelectorAll("[data-portal-target]").forEach((button) => button.addEventListener("click", () => {
      const target = button.dataset.portalTarget || "";
      const index = target === "portfolio"
        ? sections.findIndex((item) => item.type === "category")
        : sections.findIndex((item) => item.type === "institute");
      if (index >= 0) goTo(index);
    }));
    bindProgressDrag();
    window.addEventListener("message", (event) => { if (!["mattar-next", "mattar-prev"].includes(event.data?.type) || wheelLocked) return; wheelLocked = true; goRelative(event.data.type === "mattar-next" ? 1 : -1); window.setTimeout(() => { wheelLocked = false; }, reduceMotion ? 180 : 760); });
    chromeMark?.addEventListener("click", () => goTo(0));
    document.addEventListener("keydown", (event) => {
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName) || event.target?.isContentEditable;
      if (typing) return;
      if (["ArrowDown", "PageDown", " ", "ArrowRight"].includes(event.key)) { event.preventDefault(); goRelative(1); }
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(event.key)) { event.preventDefault(); goRelative(-1); }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(sections.length - 1);
    });
    window.addEventListener("wheel", (event) => {
      if (wheelLocked || Math.abs(event.deltaY) < 18) return;
      wheelLocked = true;
      goRelative(event.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => { wheelLocked = false; }, reduceMotion ? 180 : 760);
    }, { passive: true });
  }

  function initialIndexFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("project") || "";
    if (projectId) {
      const project = projectById(projectId);
      const categoryIndex = project ? sections.findIndex((item) => item.type === "category" && item.category === project.category) : -1;
      if (categoryIndex >= 0) return categoryIndex;
    }
    const requested = Number(params.get("slide") || params.get("page") || 1);
    return Number.isFinite(requested) ? Math.min(Math.max(requested - 1, 0), sections.length - 1) : 0;
  }

  function applyInitialProjectFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("project") || "";
    if (!projectId) return;
    const gallery = document.querySelector(".story-section.is-active [data-category-gallery]");
    if (gallery) selectCategoryProject(gallery, projectId, false);
  }

  function render() {
    presentation.innerHTML = sections.map((section) => (renderers[section.type] || renderers.institute)(section)).join("");
    bindProjectGalleries();
    bindCategoryMenus();
    bindWorld();
    bindReferenceCarousels();
    window.VerticalImageCarousel?.init(document);
    bindGlobalCursorTilt();
    bindNavigation();
    goTo(initialIndexFromUrl());
    applyInitialProjectFromUrl();
  }

  render();
  window.MattarPresentation = { goTo, next: () => goRelative(1), prev: () => goRelative(-1) };
})();




















