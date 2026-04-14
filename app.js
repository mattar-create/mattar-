(function () {
  const page = window.LAB_MATTAR_PAGE;
  const app = document.getElementById("app");

  const state = { activeStageIndex: 0 };
  const refs = { stack: null, stages: [], navLinks: [], currentLabel: null, teardownStack: null };

  function createEl(tag, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
  }

  function createText(tag, className, text) {
    const el = createEl(tag, className);
    el.textContent = text;
    return el;
  }

  function buildClassName(...parts) {
    return parts.filter(Boolean).join(" ");
  }

  function wrapMediaNode(node, href) {
    if (!href) return node;
    const link = createEl("a", "stage__media-link");
    link.href = href;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    link.appendChild(node);
    return link;
  }

  function getStages() {
    return page.sections.filter((section) => section.type === "stage");
  }

  function getStageById(id) {
    return getStages().find((section) => section.id === id) || null;
  }

  function getActiveNavId(stage) {
    if (!stage) return null;
    let activeNavId = page.nav[0]?.id || null;
    page.nav.forEach((item) => {
      const target = getStageById(item.id);
      if (!target) return;
      if (parseInt(target.number, 10) <= parseInt(stage.number, 10)) {
        activeNavId = item.id;
      }
    });
    return activeNavId;
  }

  function renderTopbar() {
    const header = createEl("header", "topbar");
    const inner = createEl("div", "topbar__inner");

    const brand = createEl("div", "topbar__brand");
    const eyebrow = createEl("div", "topbar__eyebrow");
    eyebrow.appendChild(createEl("span", "mark"));
    refs.currentLabel = createText("span", "topbar__current", page.nav[0]?.label || "");
    eyebrow.appendChild(refs.currentLabel);
    brand.appendChild(eyebrow);

    const nav = createEl("nav", "topbar__nav");
    refs.navLinks = [];
    page.nav.forEach((item) => {
      const link = createText("a", "nav-link", item.label);
      link.href = `#${item.id}`;
      link.dataset.navId = item.id;
      nav.appendChild(link);
      refs.navLinks.push(link);
    });

    inner.appendChild(brand);
    inner.appendChild(nav);
    header.appendChild(inner);
    return header;
  }

  function renderImage(media, className) {
    const image = document.createElement("img");
    image.className = buildClassName(className || "stage__image", media.className);
    image.src = media.src;
    image.alt = media.alt || "";
    image.loading = "lazy";
    return image;
  }

  function renderPlaceholder(box, fallbackTitle) {
    const ratio = (box && box.ratio) || "16:9";
    const width = (box && box.width) || "wide";
    const placeholder = createEl(
      "div",
      `placeholder-box placeholder-box--${ratio.replace(":", "-")} placeholder-box--${width}`
    );

    const inner = createEl("div", "placeholder-box__inner");
    inner.appendChild(createText("span", "placeholder-box__title", (box && box.title) || fallbackTitle || "PLACEHOLDER"));
    placeholder.appendChild(inner);
    return placeholder;
  }

  function renderParagraphs(paragraphs, className) {
    const wrap = createEl("div", className || "stage__prose");
    (paragraphs || []).forEach((paragraph) => wrap.appendChild(createText("p", "stage__paragraph", paragraph)));
    return wrap;
  }

  function renderCopy(section, className) {
    const copy = createEl("div", className || "stage__copy");
    if (section.headline) copy.appendChild(createText("h2", "stage__headline", section.headline));
    if (section.subheadline) copy.appendChild(createText("p", "stage__subheadline", section.subheadline));
    if (section.paragraphs && section.paragraphs.length) {
      const proseClass = buildClassName(
        "stage__prose",
        section.copyColumns ? `stage__prose--cols-${section.copyColumns}` : "",
        section.proseClass || ""
      );
      copy.appendChild(renderParagraphs(section.paragraphs, proseClass));
    }
    if (section.note) copy.appendChild(createText("p", "stage__note", section.note));
    return copy;
  }

  function renderSingleMedia(media, variant) {
    const figure = createEl(
      "figure",
      buildClassName(`stage__media-figure stage__media-figure--${variant || "default"}`, media.figureClass)
    );
    if (media.src) {
      figure.appendChild(wrapMediaNode(renderImage(media, `stage__image stage__image--${variant || "default"}`), media.href));
    } else {
      figure.appendChild(renderPlaceholder(media.box, media.title || "MEDIA"));
    }
    if (media.caption) figure.appendChild(createText("figcaption", "stage__caption", media.caption));
    return figure;
  }

  function renderGallery(gallery, className) {
    const columns = gallery.columns || Math.min((gallery.items || []).length || 1, 3);
    const wrap = createEl("div", `${className || "stage__gallery"} stage__gallery--${columns}`);
    (gallery.items || []).forEach((item) => {
      const tile = createEl("figure", buildClassName("stage__gallery-item", item.figureClass));
      if (item.src) {
        tile.appendChild(
          wrapMediaNode(
            renderImage(item, buildClassName("stage__gallery-image", item.variant ? `stage__gallery-image--${item.variant}` : "")),
            item.href
          )
        );
      } else {
        tile.appendChild(renderPlaceholder(item.box, item.title || "MEDIA"));
      }
      if (item.caption) tile.appendChild(createText("figcaption", "stage__gallery-caption", item.caption));
      wrap.appendChild(tile);
    });
    return wrap;
  }

  function renderTitleImageRight(section) {
    const card = createEl("div", buildClassName("stage__card", section.theme === "dark" ? "stage__card--dark" : "", section.cardClass));
    const body = createEl("div", buildClassName("stage__layout stage__layout--title-image-right", section.layoutClass));
    body.appendChild(renderCopy(section, "stage__copy stage__copy--hero"));
    body.appendChild(renderSingleMedia(section.media, "portrait"));
    card.appendChild(body);
    return card;
  }

  function renderTextPage(section) {
    const card = createEl("div", buildClassName("stage__card", section.theme === "dark" ? "stage__card--dark" : "", section.cardClass));
    const body = createEl("div", buildClassName("stage__layout stage__layout--text-page", section.layoutClass));
    body.appendChild(renderCopy(section));
    card.appendChild(body);
    return card;
  }

  function renderSplit(section) {
    const card = createEl("div", buildClassName("stage__card", section.theme === "dark" ? "stage__card--dark" : "", section.cardClass));
    const body = createEl(
      "div",
      buildClassName("stage__layout stage__layout--split", section.mediaPosition === "right" ? "is-reverse" : "", section.layoutClass)
    );
    const media = renderSingleMedia(section.media, section.media?.variant || "editorial");
    const copy = renderCopy(section);

    if (section.mediaPosition === "right") {
      body.appendChild(copy);
      body.appendChild(media);
    } else {
      body.appendChild(media);
      body.appendChild(copy);
    }

    card.appendChild(body);
    return card;
  }

  function renderGalleryText(section) {
    const card = createEl("div", buildClassName("stage__card", section.theme === "dark" ? "stage__card--dark" : "", section.cardClass));
    const body = createEl("div", buildClassName("stage__layout stage__layout--gallery-text", section.layoutClass));
    body.appendChild(renderGallery(section.gallery));
    const copy = renderCopy(section);
    if (section.galleryLabel) copy.prepend(createText("p", "stage__subheadline stage__subheadline--label", section.galleryLabel));
    body.appendChild(copy);
    card.appendChild(body);
    return card;
  }

  function renderGalleryOnly(section) {
    const card = createEl("div", buildClassName("stage__card", section.theme === "dark" ? "stage__card--dark" : "", section.cardClass));
    const body = createEl("div", buildClassName("stage__layout stage__layout--gallery-only", section.layoutClass));
    if (section.subheadline) body.appendChild(createText("p", "stage__subheadline", section.subheadline));
    if (section.headline) body.appendChild(createText("h2", "stage__headline stage__headline--section", section.headline));
    body.appendChild(renderGallery(section.gallery));
    if (section.paragraphs?.length) body.appendChild(renderParagraphs(section.paragraphs, "stage__prose stage__prose--wide"));
    card.appendChild(body);
    return card;
  }

  function renderBoard(section) {
    const card = createEl("div", buildClassName("stage__card", section.theme === "dark" ? "stage__card--dark" : "", section.cardClass));
    const body = createEl("div", buildClassName("stage__layout stage__layout--board", section.layoutClass));
    const hero = createEl("div", "stage__board-hero");
    hero.appendChild(renderSingleMedia(section.media, "board"));
    body.appendChild(hero);

    if (section.gallery) {
      const side = createEl("div", "stage__board-side");
      if (section.headline) side.appendChild(createText("h2", "stage__headline stage__headline--section", section.headline));
      side.appendChild(renderGallery(section.gallery, "stage__gallery stage__gallery--board"));
      body.appendChild(side);
    }

    if (section.paragraphs?.length) {
      const prose = renderParagraphs(section.paragraphs, "stage__prose stage__prose--wide");
      card.appendChild(body);
      card.appendChild(prose);
      return card;
    }

    card.appendChild(body);
    return card;
  }

  function renderImageOnly(section) {
    const isBleed = section.media?.variant === "cover";
    const card = createEl(
      "div",
      buildClassName("stage__card stage__card--image-only", isBleed ? "stage__card--bleed" : "", section.theme === "dark" ? "stage__card--dark" : "", section.cardClass)
    );
    const figure = renderSingleMedia(section.media, section.media?.variant || "full");
    figure.classList.add("stage__media-figure--image-only");
    card.appendChild(figure);
    if (section.headline || section.subheadline) {
      card.appendChild(renderCopy(section, "stage__copy stage__copy--chapter"));
    }
    return card;
  }

  function renderDivider(section) {
    const card = createEl("div", "stage__card stage__card--divider");
    const body = createEl("div", "stage__layout stage__layout--divider");
    if (section.media) body.appendChild(renderSingleMedia(section.media, "divider"));
    if (section.headline) body.appendChild(createText("h2", "stage__divider-title", section.headline));
    if (section.subheadline) body.appendChild(createText("p", "stage__divider-subtitle", section.subheadline));
    card.appendChild(body);
    return card;
  }

  function renderStage(section) {
    const wrap = createEl("article", "stage");
    wrap.dataset.stageId = section.id;

    let card;
    switch (section.layout) {
      case "title-image-right":
        card = renderTitleImageRight(section);
        break;
      case "text-page":
        card = renderTextPage(section);
        break;
      case "split":
        card = renderSplit(section);
        break;
      case "gallery-text":
        card = renderGalleryText(section);
        break;
      case "gallery-only":
        card = renderGalleryOnly(section);
        break;
      case "board":
        card = renderBoard(section);
        break;
      case "divider":
        card = renderDivider(section);
        break;
      case "image-only":
      default:
        card = renderImageOnly(section);
        break;
    }

    wrap.appendChild(card);
    return wrap;
  }

  function renderStageStack(sections) {
    const wrap = createEl("section", "section section--stack");
    const stack = createEl("div", "stage-stack");
    const viewport = createEl("div", "stage-stack__viewport");
    const layers = createEl("div", "stage-stack__layers");
    const markers = createEl("div", "stage-stack__markers");

    refs.stack = stack;
    refs.stages = [];
    stack.style.setProperty("--stage-count", String(sections.length));

    sections.forEach((section) => {
      const marker = createEl("div", "stage-stack__marker");
      marker.id = section.id;
      markers.appendChild(marker);
      const stage = renderStage(section);
      layers.appendChild(stage);
      refs.stages.push(stage);
    });

    viewport.appendChild(layers);
    stack.appendChild(viewport);
    stack.appendChild(markers);
    wrap.appendChild(stack);
    return wrap;
  }

  function setActiveStage(index) {
    const clamped = Math.max(0, Math.min(refs.stages.length - 1, index));
    state.activeStageIndex = clamped;
    const stages = getStages();
    const activeStage = stages[clamped];
    const activeNavId = getActiveNavId(activeStage);

    refs.stages.forEach((stage, stageIndex) => {
      stage.classList.toggle("is-active", stageIndex === clamped);
    });

    refs.navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.navId === activeNavId);
    });

    if (refs.currentLabel) {
      refs.currentLabel.textContent = activeStage?.kicker || activeStage?.title || page.title;
    }
  }

  function setupStageStack() {
    if (!refs.stack || !refs.stages.length) return;

    let ticking = false;

    function update() {
      const rect = refs.stack.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = refs.stages.length;
      const usableHeight = Math.max(1, rect.height - viewport);
      const progress = Math.max(0, Math.min(0.9999, ((viewport * 0.18) - rect.top) / usableHeight));
      const nextIndex = Math.min(total - 1, Math.floor(progress * total));
      setActiveStage(nextIndex);
      ticking = false;
    }

    function requestUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    refs.teardownStack = function () {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }

  function renderPage() {
    document.title = `${page.title} - Slides`;

    if (refs.teardownStack) refs.teardownStack();
    refs.stack = null;
    refs.stages = [];
    refs.navLinks = [];
    app.innerHTML = "";

    const frame = createEl("main", "page");
    frame.appendChild(renderTopbar());

    const content = createEl("div", "page__content");
    content.appendChild(renderStageStack(getStages()));
    frame.appendChild(content);
    app.appendChild(frame);

    setupStageStack();
  }

  renderPage();
})();
