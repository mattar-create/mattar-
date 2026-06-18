const root = document.documentElement;
const track = document.querySelector(".topline__track");
const accent = document.querySelector(".topline__accent");
const shapeLayer = document.querySelector(".shape-layer");
const redShape = document.querySelector("#red-shape");
const sections = Array.from(document.querySelectorAll(".read-section"));
const deckOverlay = document.querySelector(".deck-overlay");
const entryScreen = document.querySelector(".entry-screen");
const gallery = document.querySelector(".gallery");
let deckPages = [];
let deckImages = [];
let mediaPages = [];

const PROJECTS = [
  {
    id: "concha",
    order: "01/07",
    year: "2021",
    title: "Concha y Toro",
    intro: "assets/pages/concha-info.png",
    slides: ["assets/pages/CONCHA Y TORO.png"],
    description:
      "Criada para celebrar o vinho Don Melchor 2021, a experiência gastronômica foi inspirada na paisagem da Cordilheira dos Andes. A mesa se constrói como território sensorial, aproximando alimento, imagem e presença.",
  },
  {
    id: "concreto",
    order: "02/07",
    year: "2017",
    title: "Concreto",
    intro: "assets/pages/concreto-info.png",
    slides: [
      "assets/pages/concreto-images-1.png",
      "assets/pages/concreto-images-2.png",
      "assets/pages/concreto-images-3.png",
    ],
    description:
      "Instalação criada para o estande brasileiro na Anuga Food Fair, inspirada na arte concreta brasileira. A obra organiza pequenos módulos comestíveis como campo gráfico, espacial e performático.",
  },
  {
    id: "dadiva",
    order: "03/07",
    year: "2022",
    title: "Dádiva",
    intro: "assets/pages/dadiva-info.png",
    slides: [
      "assets/pages/dadiva-images-1.png",
    ],
    description:
      "Apresentada no pavilhão da Bienal durante o evento Geração Senac, propôs uma experiência sensorial inspirada na teoria da reciprocidade de Marcel Mauss.",
  },
  {
    id: "fome-come",
    order: "04/07",
    year: "2012",
    title: "Fome Come",
    intro: "assets/pages/fome-come-info.png",
    slides: [
      "assets/pages/fome-come-images-1.png",
    ],
    description:
      "Coquetel performático apresentado na 30ª Bienal de São Paulo, relacionando alimento e desigualdade socioeconômica global por meio de uma instalação suspensa e participativa.",
  },
  {
    id: "geluminia",
    order: "05/07",
    year: "2017",
    title: "Gelúminas",
    intro: "assets/pages/geluminia-info.png",
    slides: [
      "assets/pages/geluminia-images-1.png",
      "assets/pages/geluminia-images-2.png",
      "assets/pages/geluminia-images-3.png",
      "assets/pages/geluminia-images-4.png",
    ],
    description:
      "Poesia luminofágica construída por luz, gelatina e cor. A obra transforma matéria alimentar em dispositivo sensorial, entre escultura, arquitetura efêmera e participação.",
  },
  {
    id: "mulher-vida-liberdade",
    order: "06/07",
    year: "2025",
    title: "Mulher, Vida, Liberdade",
    intro: "assets/pages/mulher-vida-liberdade-info.png",
    slides: ["assets/pages/mulher-vida-liberdade-images-1.png"],
    description:
      "Gastroperformance apresentada no Taste Brasil 2025, inspirada nos protestos no Irã. Canto, imagem, palavra e alimento atravessam a experiência como gesto de memória e presença.",
  },
  {
    id: "soviet",
    order: "07/07",
    year: "2012",
    title: "Soviet Roulette",
    intro: "assets/pages/soviet-info.png",
    slides: [
      "assets/pages/soviet-images-1.png",
      "assets/pages/soviet-images-2.png",
    ],
    description:
      "A contaminação invisível dos alimentos na região de Chernobil é reencenada por maçãs pretas oferecidas ao público, instaurando uma tensão entre escolha, risco e percepção.",
  },
];

let ACTIVE_PROJECTS = [
  {
    id: "concha",
    order: "01/07",
    year: "2021",
    title: "Concha y Toro",
    cover: "assets/covers/concha-cover.png",
    slides: ["assets/project-media/concha-01.png"],
    description:
      "Criada para celebrar o vinho Don Melchor 2021, a experi&ecirc;ncia gastron&ocirc;mica foi inspirada na paisagem da Cordilheira dos Andes, onde crescem as vinhas da Concha y Toro. Ao longo da mesa, uma escultura comprida e sinuosa evocava o territ&oacute;rio chileno, com relevos cobertos por suspiros de lavanda, como picos nevados. No final do jantar, os convidados retiravam os suspiros da pr&oacute;pria escultura para finalizar uma pavlova arom&aacute;tica, transformando a sobremesa em um gesto interativo e po&eacute;tico.",
  },
  {
    id: "concreto",
    order: "02/07",
    year: "2017",
    title: "Concreto Ef&ecirc;mero",
    cover: "assets/covers/concreto-cover.png",
    slides: [
      "assets/project-media/concreto-01.png",
      "assets/project-media/concreto-02.png",
      "assets/project-media/concreto-03.png",
    ],
    description:
      "Concreto Ef&ecirc;mero foi uma instala&ccedil;&atilde;o criada para o estande brasileiro na Anuga Food Fair, em 2017, para a ApexBrasil. Inspirada na arte concreta brasileira e nas obras de Franz Weissmann, a obra era formada por pequenos cubos de chocolate dispostos sobre um grande cubo escult&oacute;rico. Ao longo dos quatro dias de feira, uma cozinha montada no local produziu 500 kg de chocolate e serviu cerca de 2 mil cubos por dia ao p&uacute;blico.",
  },
  {
    id: "dadiva",
    order: "03/07",
    year: "2022",
    title: "D&Aacute;DIVA",
    cover: "assets/covers/dadiva-cover.png",
    slides: [
      "assets/project-media/dadiva-01.png",
      "assets/project-media/dadiva-02.png",
      "assets/project-media/dadiva-03.png",
      "assets/project-media/dadiva-04.png",
      "assets/project-media/dadiva-05.png",
    ],
    description:
      "A gastroperformance D&aacute;diva, apresentada no pavilh&atilde;o da Bienal durante o evento Gera&ccedil;&atilde;o Senac, prop&ocirc;s uma experi&ecirc;ncia sensorial inspirada na teoria da reciprocidade de Marcel Mauss. Os participantes percorriam um t&uacute;nel de labaredas ap&oacute;s receberem um f&oacute;sforo comest&iacute;vel de chocolate e, no ato final, eram convidados a refletir sobre uma vontade interna, depositando simbolicamente sua chama em um pote de ouro. A a&ccedil;&atilde;o terminava com a escolha entre um biscoito de &aacute;gua ou de fogo, representando perman&ecirc;ncia ou in&iacute;cio.",
  },
  {
    id: "fome-come",
    order: "04/07",
    year: "2012",
    title: "Fome Come",
    cover: "assets/covers/soviet-cover.png",
    slides: [
      "assets/project-media/fome-come-01.png",
      "assets/project-media/fome-come-02.png",
      "assets/project-media/fome-come-03.png",
      "assets/project-media/fome-come-04.png",
      "assets/project-media/fome-come-05.png",
    ],
    description:
      "Fome Come foi um coquetel perform&aacute;tico apresentado na 30&ordf; Bienal de S&atilde;o Paulo, em 2012, que relacionava alimento e desigualdade socioecon&ocirc;mica global. A instala&ccedil;&atilde;o era formada por centenas de caixinhas suspensas, cada uma contendo um quitute de diferentes regi&otilde;es do mundo. Ao serem retiradas pelos convidados, as caixas desfaziam gradualmente a palavra FOME, refletida em um espelho no ch&atilde;o, transformando o ato de comer em parte da pr&oacute;pria destrui&ccedil;&atilde;o simb&oacute;lica da obra.",
  },
  {
    id: "geluminia",
    order: "05/07",
    year: "2017",
    title: "Gel&uacute;minas",
    cover: "assets/covers/geluminia-cover.png",
    slides: [
      "assets/project-media/geluminia-01.png",
      "assets/project-media/geluminia-02.png",
      "assets/project-media/geluminia-03.png",
      "assets/project-media/geluminia-04.png",
      "assets/project-media/geluminia-05.png",
    ],
    description:
      "Gel&uacute;minas, Poesia Luminof&aacute;gica foi uma instala&ccedil;&atilde;o apresentada em 2005 na 1&ordf; Mostra Internacional de Design, com o tema &ldquo;O ninho seguro&rdquo;. A obra ocupava uma sala com tr&ecirc;s grandes lumin&aacute;rias formadas por cerca de 3 mil copos de gelatina colorida, cujas letras compunham a frase &ldquo;Coma luz&rdquo;. Convidado por um &aacute;udio em loop, o p&uacute;blico podia ingerir as gelatinas, ativando uma experi&ecirc;ncia sensorial que articulava luz, alimento, som, cor e sabor, enquanto comentava a rela&ccedil;&atilde;o entre casa, seguran&ccedil;a, sobreviv&ecirc;ncia e ilus&atilde;o de prote&ccedil;&atilde;o.",
  },
  {
    id: "mulher-vida-liberdade",
    order: "06/07",
    year: "2025",
    title: "Mulher, Vida, Liberdade",
    cover: "assets/covers/mulher-vida-liberdade-cover.png",
    slides: ["assets/pages/mulher-vida-liberdade-images-1.png"],
    description:
      "Mulher, Vida, Liberdade foi uma gastroperformance apresentada no Taste Brasil 2025, a convite da Migraflix e da Electrolux. Inspirada nos protestos de 2022 no Ir&atilde;, a experi&ecirc;ncia combinava canto em persa, imagens e palavras ligadas ao lema &ldquo;Mulher, Vida, Liberdade&rdquo;. Os participantes criavam colagens sobre uma base de gelatina de ma&ccedil;&atilde; verde, formando mosaicos comest&iacute;veis que transformavam a liberdade em gesto, imagem e sabor.",
  },
  {
    id: "soviet",
    order: "07/07",
    year: "2012",
    title: "Soviet Roulette",
    cover: "assets/covers/fome-come-cover.png",
    slides: [
      "assets/project-media/soviet-01.png",
      "assets/project-media/soviet-02.png",
    ],
    description:
      "Nesta gastroperformance, a contamina&ccedil;&atilde;o invis&iacute;vel dos alimentos na regi&atilde;o de Chernobil &eacute; reencenada por meio de 50 ma&ccedil;&atilde;s pretas oferecidas ao p&uacute;blico. Sem saber quais s&atilde;o de pl&aacute;stico e quais s&atilde;o feitas de chocolate e creme, os participantes vivenciam simbolicamente a incerteza enfrentada pelos habitantes das &aacute;reas afetadas pelo acidente nuclear de 1986.",
  },
];

const COLORS = {
  red: [206, 33, 26],
  paper: [246, 243, 239],
  ink: [16, 16, 16],
};

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const lerp = (from, to, amount) => from + (to - from) * amount;
const smoothstep = (value) => value * value * (3 - 2 * value);
const SECTION_UNITS = {
  comissionamento: 0,
  pesquisa: 1.72,
  producao: 2.78,
  registros: 3.25,
};

function colorMix(from, to, amount) {
  const mixed = from.map((channel, index) => Math.round(lerp(channel, to[index], amount)));
  return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
}

function opacityWindow(unit, fadeInStart, fullStart, fullEnd, fadeOutEnd) {
  if (unit < fadeInStart || unit > fadeOutEnd) {
    return 0;
  }

  if (unit >= fullStart && unit <= fullEnd) {
    return 1;
  }

  if (unit < fullStart) {
    return smoothstep(clamp((unit - fadeInStart) / (fullStart - fadeInStart)));
  }

  return 1 - smoothstep(clamp((unit - fullEnd) / (fadeOutEnd - fullEnd)));
}

function readShapeMetrics() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const columnCount = window.matchMedia("(max-width: 900px)").matches ? 6 : 12;
  const col = vw / columnCount;
  const row = vh / 12;
  const slotCenter = {
    x: vw - col * 1.55 - col * 0.48,
    y: row * 2.65 + col * 0.48,
  };
  const circle = {
    cx: slotCenter.x,
    cy: slotCenter.y,
    x: slotCenter.x - col * 0.48,
    y: slotCenter.y - col * 0.48,
    w: col * 0.96,
    h: col * 0.96,
    r: col * 0.48,
  };
  const capsule = {
    x: vw - col * 1.4 - col * 1.18,
    y: row * 2.62,
    w: col * 1.18,
    h: row * 0.98,
    r: col * 0.22,
  };
  const bar = {
    x: vw - col * 1.58 - col * 0.32,
    y: row * 2.48,
    w: col * 0.32,
    h: row * 2.56,
    r: 0,
  };
  const coverRadius = Math.max(
    Math.hypot(slotCenter.x, slotCenter.y),
    Math.hypot(vw - slotCenter.x, slotCenter.y),
    Math.hypot(slotCenter.x, vh - slotCenter.y),
    Math.hypot(vw - slotCenter.x, vh - slotCenter.y),
  ) + 12;

  return [
    {
      at: 0,
      kind: "ellipse",
      cx: slotCenter.x,
      cy: slotCenter.y,
      rx: coverRadius,
      ry: coverRadius,
    },
    {
      at: 1.62,
      kind: "ellipse",
      cx: circle.cx,
      cy: circle.cy,
      rx: circle.r,
      ry: circle.r,
    },
    {
      at: 2.62,
      kind: "rect",
      x: capsule.x,
      y: capsule.y,
      w: capsule.w,
      h: capsule.h,
      r: capsule.r,
    },
    {
      at: 3.5,
      kind: "rect",
      x: bar.x,
      y: bar.y,
      w: bar.w,
      h: bar.h,
      r: bar.r,
    },
    {
      at: 4.3,
      kind: "rect",
      x: capsule.x,
      y: capsule.y,
      w: capsule.w,
      h: capsule.h,
      r: capsule.r,
    },
  ];
}

function ellipsePath(cx, cy, rx, ry) {
  return [
    `M ${cx - rx} ${cy}`,
    `C ${cx - rx} ${cy - ry * 0.55228475} ${cx - rx * 0.55228475} ${cy - ry} ${cx} ${cy - ry}`,
    `C ${cx + rx * 0.55228475} ${cy - ry} ${cx + rx} ${cy - ry * 0.55228475} ${cx + rx} ${cy}`,
    `C ${cx + rx} ${cy + ry * 0.55228475} ${cx + rx * 0.55228475} ${cy + ry} ${cx} ${cy + ry}`,
    `C ${cx - rx * 0.55228475} ${cy + ry} ${cx - rx} ${cy + ry * 0.55228475} ${cx - rx} ${cy}`,
    "Z",
  ].join(" ");
}

function roundedRectPath(x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);

  return [
    `M ${x + radius} ${y}`,
    `L ${x + w - radius} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + radius}`,
    `L ${x + w} ${y + h - radius}`,
    `Q ${x + w} ${y + h} ${x + w - radius} ${y + h}`,
    `L ${x + radius} ${y + h}`,
    `Q ${x} ${y + h} ${x} ${y + h - radius}`,
    `L ${x} ${y + radius}`,
    `Q ${x} ${y} ${x + radius} ${y}`,
    "Z",
  ].join(" ");
}

function shapeToBox(shape) {
  if (shape.kind === "ellipse") {
    return {
      x: shape.cx - shape.rx,
      y: shape.cy - shape.ry,
      w: shape.rx * 2,
      h: shape.ry * 2,
      r: Math.min(shape.rx, shape.ry),
    };
  }

  return shape;
}

function drawShape(shape) {
  if (shape.kind === "ellipse") {
    return ellipsePath(shape.cx, shape.cy, shape.rx, shape.ry);
  }

  return roundedRectPath(shape.x, shape.y, shape.w, shape.h, shape.r);
}

function interpolateShape(unit) {
  const shapes = readShapeMetrics();

  for (let index = 0; index < shapes.length - 1; index += 1) {
    const current = shapes[index];
    const next = shapes[index + 1];

    if (unit <= next.at) {
      const local = smoothstep(clamp((unit - current.at) / (next.at - current.at)));
      const from = shapeToBox(current);
      const to = shapeToBox(next);

      return {
        kind: "rect",
        x: lerp(from.x, to.x, local),
        y: lerp(from.y, to.y, local),
        w: lerp(from.w, to.w, local),
        h: lerp(from.h, to.h, local),
        r: lerp(from.r, to.r, local),
      };
    }
  }

  return shapes[shapes.length - 1];
}

let ticking = false;
const deckState = {
  activeDeck: null,
  isAnimating: false,
  isOpen: false,
  savedScrollY: 0,
};
let entryDismissed = false;
const urlParams = new URLSearchParams(window.location.search);
const galleryState = {
  isPointerDown: false,
  isDragging: false,
  activeLink: null,
  startX: 0,
  scrollLeft: 0,
  suppressClick: false,
};
const mediaState = new Map();
let appInitialized = false;
const PREVIEW_KEY = "mattar-projects-preview";
const isLocalPreviewHost = ["", "localhost", "127.0.0.1"].includes(window.location.hostname);
const shouldUseLocalPreview = isLocalPreviewHost || urlParams.get("preview") === "local";

function normalizeProject(project, index = 0, total = 1) {
  const id = project.id || slugify(project.title || `projeto-${index + 1}`);
  const galleryMedia = project.gallery || project.slides || [];

  return {
    id,
    order: project.order || `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`,
    year: project.year || "",
    title: project.title || "Projeto sem titulo",
    cover: project.cover || "assets/covers/dadiva-cover.png",
    coverAlt: project.coverAlt || project.title || "Imagem de capa",
    slides: galleryMedia.length ? galleryMedia.map(normalizeMediaItem) : [normalizeMediaItem(project.cover || "assets/covers/dadiva-cover.png")],
    description: project.description || project.text || "",
    layout: {
      coverCol: Number(project.layout?.coverCol ?? 7.35),
      coverRow: Number(project.layout?.coverRow ?? 2.1),
      coverWidth: Number(project.layout?.coverWidth ?? 3),
      coverHeight: Number(project.layout?.coverHeight ?? 8.9),
      coverPosition: project.layout?.coverPosition || "center center",
      textCol: Number(project.layout?.textCol ?? 0.94),
      textRow: Number(project.layout?.textRow ?? 6.48),
      textWidth: Number(project.layout?.textWidth ?? 5.85),
      textScale: Number(project.layout?.textScale ?? 1),
    },
  };
}

function normalizeMediaItem(item) {
  if (typeof item === "string") {
    return {
      type: inferMediaType(item),
      src: item,
    };
  }

  return {
    type: item.type || inferMediaType(item.src || ""),
    src: item.src || "",
    title: item.title || "",
  };
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

function externalVideoEmbed(src) {
  try {
    const url = new URL(src);

    if (url.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.pathname.replace("/", "")}`;
    }

    if (url.hostname.includes("youtube.com")) {
      const videoId = url.searchParams.get("v") || url.pathname.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.hostname.includes("vimeo.com")) {
      const videoId = url.pathname.split("/").filter(Boolean).pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
  } catch (error) {
    return src;
  }

  return src;
}

function renderMediaItem(item, project, index) {
  const media = normalizeMediaItem(item);
  const label = `${project.title}, registro ${index + 1}`;

  if (media.type === "video") {
    return `
      <figure class="media-card media-card--video">
        <video src="${encodeURI(media.src)}" controls playsinline preload="metadata" aria-label="${escapeAttribute(label)}"></video>
      </figure>`;
  }

  if (media.type === "externalVideo") {
    return `
      <figure class="media-card media-card--external-video">
        <iframe src="${escapeAttribute(externalVideoEmbed(media.src))}" title="${escapeAttribute(label)}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
      </figure>`;
  }

  return `
    <figure class="media-card">
      <img src="${encodeURI(media.src)}" alt="${escapeAttribute(label)}" loading="lazy" decoding="async" />
    </figure>`;
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

function escapeAttribute(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function loadProjects() {
  try {
    const previewData = shouldUseLocalPreview ? localStorage.getItem(PREVIEW_KEY) : null;
    const data = previewData ? JSON.parse(previewData) : await fetchProjectsData();
    const sourceProjects = Array.isArray(data) ? data : data.projects;

    if (!Array.isArray(sourceProjects) || !sourceProjects.length) {
      throw new Error("projects.json vazio");
    }

    ACTIVE_PROJECTS = sourceProjects.map((project, index) => normalizeProject(project, index, sourceProjects.length));
  } catch (error) {
    ACTIVE_PROJECTS = ACTIVE_PROJECTS.map((project, index) => normalizeProject(project, index, ACTIVE_PROJECTS.length));
  }
}

async function fetchProjectsData() {
  const response = await fetch(`assets/data/projects.json?v=${Date.now()}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`projects.json ${response.status}`);
  }

  return response.json();
}

async function refreshProjectsFromDataSource() {
  await loadProjects();
  renderGallery();
  buildDeckMarkup();
  preloadDeckImages();
}

function renderGallery() {
  if (!gallery) {
    return;
  }

  gallery.innerHTML = ACTIVE_PROJECTS.map((project, index) => {
    const order = project.order || `${String(index + 1).padStart(2, "0")}/${String(ACTIVE_PROJECTS.length).padStart(2, "0")}`;

    return `
      <a class="gallery__link" href="#${escapeAttribute(project.id)}" data-open-deck="${escapeAttribute(project.id)}">
        <figure class="gallery__card">
          <img src="${encodeURI(project.cover)}" alt="${escapeAttribute(project.coverAlt || project.title)}" loading="lazy" decoding="async" />
          <figcaption><span>${order.split("/")[0]}</span><strong>${project.title}</strong></figcaption>
        </figure>
      </a>`;
  }).join("");
}

function preloadDeckImages() {
  deckImages.forEach((image) => {
    const preload = new Image();
    preload.src = image.currentSrc || image.src;
    image.decoding = "async";
  });
}

function buildDeckMarkup() {
  if (!deckOverlay) {
    return;
  }

  deckOverlay.innerHTML = ACTIVE_PROJECTS.map((project) => {
    const mediaDeckId = `${project.id}-media`;
    const projectTitle = project.year ? `${project.title} (${project.year})` : project.title;
    const coverStyle = [
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
    const slides = project.slides
      .map((slide, index) => renderMediaItem(slide, project, index))
      .join("");

    return `
      <article class="deck-page deck-page--project" data-deck="${project.id}" data-project-id="${project.id}" data-next-deck="${mediaDeckId}">
        <img class="deck-logo" src="assets/brand/Logo-Vector.svg" alt="" aria-hidden="true" />
        <header class="deck-page__header">
          <p>${project.order}</p>
          <button type="button" data-close-deck>voltar &agrave; galeria</button>
        </header>
        <section class="deck-project">
          <div class="deck-project__copy" style="${textStyle}">
            <h2>${projectTitle}</h2>
            <p>${project.description}</p>
          </div>
          <figure class="deck-cover" style="${coverStyle}">
            <img src="${encodeURI(project.cover)}" alt="${escapeAttribute(project.coverAlt || project.title)}" loading="eager" decoding="async" />
          </figure>
        </section>
        <footer class="deck-page__footer">
          <div class="deck-page__actions">
            <button type="button" data-open-deck="${mediaDeckId}">pr&oacute;ximo</button>
          </div>
        </footer>
      </article>

      <article class="deck-page deck-page--media" data-deck="${mediaDeckId}" data-project-id="${project.id}" data-prev-deck="${project.id}">
        <img class="deck-logo" src="assets/brand/Logo-Vector.svg" alt="" aria-hidden="true" />
        <header class="deck-page__header">
          <p>${project.order} &middot; m&iacute;dias</p>
          <button type="button" data-close-deck>voltar &agrave; galeria</button>
        </header>
        <section class="media-gallery" tabindex="0" aria-label="M&iacute;dias de ${project.title}">
          ${slides}
        </section>
        <footer class="deck-page__footer deck-page__footer--media">
          <div class="deck-page__actions">
            <button type="button" data-open-deck="${project.id}">anterior</button>
          </div>
        </footer>
      </article>
    `;
  }).join("");

  deckPages = Array.from(deckOverlay.querySelectorAll("[data-deck]"));
  deckImages = Array.from(deckOverlay.querySelectorAll(".deck-page img"));
  mediaPages = Array.from(deckOverlay.querySelectorAll(".deck-page--media"));
  applyDeckImageRatios();
}

function applyDeckImageRatios() {
  const images = Array.from(deckOverlay.querySelectorAll(".deck-cover img, .media-card img"));

  images.forEach((image) => {
    const figure = image.closest("figure");

    const applyRatio = () => {
      const width = image.naturalWidth || 1;
      const height = image.naturalHeight || 1;
      const ratio = width / height;

      figure?.style.setProperty("--media-ratio", ratio.toFixed(4));
      figure?.classList.toggle("is-portrait", ratio < 0.86);
      figure?.classList.toggle("is-squareish", ratio >= 0.86 && ratio < 1.25);
      figure?.classList.toggle("is-wide", ratio >= 1.25 && ratio < 1.85);
      figure?.classList.toggle("is-panoramic", ratio >= 1.85);
    };

    if (image.complete) {
      applyRatio();
    } else {
      image.addEventListener("load", applyRatio, { once: true });
    }
  });
}

function getMediaSlides(page) {
  return Array.from(page.querySelectorAll(".media-card"));
}

function setActiveMediaSlide(page, nextIndex = 0) {
  const slides = getMediaSlides(page);

  if (!slides.length) {
    return { index: -1, count: 0 };
  }

  const index = clamp(nextIndex, 0, slides.length - 1);

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });

  page.dataset.slideIndex = String(index);
  page.dataset.slideCount = String(slides.length);
  mediaState.set(page.dataset.deck, index);

  return { index, count: slides.length };
}

function syncActiveMediaPage(page) {
  if (!page?.classList.contains("deck-page--media")) {
    return { index: -1, count: 0 };
  }

  const storedIndex = mediaState.get(page.dataset.deck) ?? 0;
  return setActiveMediaSlide(page, storedIndex);
}

function updateScrollState() {
  const doc = document.documentElement;
  const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
  const scrollY = window.scrollY;
  const unit = scrollY / window.innerHeight;
  const pageProgress = clamp(scrollY / maxScroll);
  const collapse = smoothstep(clamp(unit / 1.62));
  const shape = interpolateShape(unit);
  const trackWidth = track.getBoundingClientRect().width;
  const accentWidth = accent.getBoundingClientRect().width;
  const accentX = pageProgress * Math.max(trackWidth - accentWidth, 0);

  shapeLayer.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
  redShape.setAttribute("d", drawShape(shape));
  root.style.setProperty("--counter-opacity", (1 - collapse).toFixed(3));
  root.style.setProperty("--accent-left", `${accentX.toFixed(2)}px`);
  root.style.setProperty("--line-color", colorMix(COLORS.paper, COLORS.ink, collapse));
  root.style.setProperty("--accent-color", colorMix(COLORS.paper, COLORS.red, collapse));
  root.style.setProperty("--text-intro-color", colorMix(COLORS.paper, COLORS.paper, 0));
  setSectionVisibility(unit);

  ticking = false;
}

function setSectionVisibility(unit) {
  const opacityById = {
    comissionamento: opacityWindow(unit, 0, 0, 0.52, 0.82),
    pesquisa: opacityWindow(unit, 1.2, 1.48, 2.32, 2.52),
    producao: opacityWindow(unit, 2.48, 2.7, 2.96, 3.12),
    registros: opacityWindow(unit, 3.04, 3.22, 99, 99),
  };

  sections.forEach((section) => {
    const opacity = opacityById[section.id] || 0;
    section.style.setProperty("--section-opacity", opacity.toFixed(3));
    section.classList.toggle("is-current", opacity > 0.001);
  });
}

function lockPage() {
  if (document.body.classList.contains("deck-open")) {
    return;
  }

  deckState.savedScrollY = window.scrollY;
  document.body.classList.add("deck-open");
}

function unlockPage() {
  const scrollY = deckState.savedScrollY;

  document.body.classList.remove("deck-open");
  window.scrollTo({ top: scrollY, behavior: "auto" });
  requestUpdate();
}

function setActiveDeck(deckId) {
  const activeDeck = deckPages.find((page) => page.dataset.deck === deckId);

  if (!activeDeck) {
    return null;
  }

  deckPages.forEach((page) => {
    page.classList.toggle("is-active", page === activeDeck);
  });
  activeDeck.scrollTop = 0;
  activeDeck.querySelector(".media-gallery")?.scrollTo({ top: 0, behavior: "auto" });
  deckState.activeDeck = deckId;
  if (activeDeck.classList.contains("deck-page--media")) {
    syncActiveMediaPage(activeDeck);
  }

  return activeDeck;
}

function switchDeck(deckId) {
  if (deckState.activeDeck === deckId || deckState.isAnimating) {
    return;
  }

  setActiveDeck(deckId);
}

function getActiveDeckPage() {
  return deckPages.find((page) => page.dataset.deck === deckState.activeDeck) || null;
}

function isDeckId(deckId) {
  if (!deckId) {
    return false;
  }

  return ACTIVE_PROJECTS.some((project) => project.id === deckId || `${project.id}-media` === deckId);
}

function findDeckTarget(direction) {
  const activePage = getActiveDeckPage();

  if (!activePage) {
    return null;
  }

  const controls = Array.from(activePage.querySelectorAll("[data-open-deck]"))
    .filter((control) => control.dataset.openDeck !== deckState.activeDeck);
  const target = direction > 0 ? controls[controls.length - 1] : controls[0];

  return target?.dataset.openDeck || null;
}

async function openDeck(deckId, triggerElement = null) {
  if (!deckOverlay) {
    return;
  }

  dismissEntryScreen();

  if (!deckPages.length) {
    buildDeckMarkup();
  }

  if (deckState.isOpen) {
    switchDeck(deckId);
    return;
  }

  deckState.isAnimating = true;
  lockPage();

  const activeDeck = setActiveDeck(deckId);

  if (!activeDeck) {
    unlockPage();
    deckState.isAnimating = false;
    return;
  }

  deckState.isOpen = true;
  deckOverlay.classList.add("is-open");
  deckOverlay.setAttribute("aria-hidden", "false");
  if (activeDeck.classList.contains("deck-page--media")) {
    syncActiveMediaPage(activeDeck);
  }
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  deckState.isAnimating = false;
}

async function closeDeck() {
  if (!deckOverlay || !deckState.isOpen || deckState.isAnimating) {
    return;
  }

  deckState.isAnimating = true;
  deckOverlay.classList.remove("is-open");
  deckOverlay.setAttribute("aria-hidden", "true");
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  deckPages.forEach((page) => page.classList.remove("is-active"));
  deckState.isOpen = false;
  deckState.activeDeck = null;
  deckState.isAnimating = false;
  unlockPage();
}

function advanceMediaSlide(direction) {
  const activePage = getActiveDeckPage();

  if (!activePage?.classList.contains("deck-page--media")) {
    return false;
  }

  const slides = getMediaSlides(activePage);

  if (!slides.length) {
    return false;
  }

  const currentIndex = Number.parseInt(activePage.dataset.slideIndex || "0", 10) || 0;
  const nextIndex = currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < slides.length) {
    setActiveMediaSlide(activePage, nextIndex);
    return true;
  }

  return false;
}

function scrollActiveMediaGallery(deltaY) {
  const activePage = getActiveDeckPage();
  const mediaGallery = activePage?.querySelector(".media-gallery");

  if (!mediaGallery) {
    return false;
  }

  const maxScrollTop = mediaGallery.scrollHeight - mediaGallery.clientHeight;

  if (maxScrollTop <= 1) {
    return false;
  }

  if (deltaY > 0 && mediaGallery.scrollTop < maxScrollTop - 1) {
    mediaGallery.scrollBy({ top: deltaY * 0.72, behavior: "auto" });
    return true;
  }

  if (deltaY < 0 && mediaGallery.scrollTop > 1) {
    mediaGallery.scrollBy({ top: deltaY * 0.72, behavior: "auto" });
    return true;
  }

  return false;
}

function scrollToSection(sectionId) {
  const unit = SECTION_UNITS[sectionId];

  if (unit === undefined) {
    return;
  }

  window.history.replaceState(null, "", `#${sectionId}`);
  window.scrollTo({
    top: unit * window.innerHeight,
    behavior: "smooth",
  });
}

function requestUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollState);
    ticking = true;
  }
}

function dismissEntryScreen() {
  if (entryDismissed || !entryScreen) {
    return;
  }

  entryDismissed = true;
  entryScreen.classList.add("is-hidden");
  entryScreen.setAttribute("aria-hidden", "true");
}

function canGalleryScroll(delta) {
  return canHorizontalScroll(gallery, delta);
}

function canHorizontalScroll(element, delta) {
  if (!element) {
    return false;
  }

  const maxScrollLeft = element.scrollWidth - element.clientWidth;

  if (maxScrollLeft <= 0) {
    return false;
  }

  if (delta < 0) {
    return element.scrollLeft > 0;
  }

  return element.scrollLeft < maxScrollLeft - 1;
}

function handleGalleryWheel(event) {
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

  if (!canGalleryScroll(delta)) {
    return;
  }

  event.preventDefault();
  gallery.scrollBy({
    left: delta * 0.86,
    behavior: "auto",
  });
}

function handleHorizontalWheel(event) {
  const strip = event.currentTarget;
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

  if (!canHorizontalScroll(strip, delta)) {
    return;
  }

  event.preventDefault();
  strip.scrollBy({
    left: delta * 0.86,
    behavior: "auto",
  });
}

function handleGalleryPointerDown(event) {
  if (!gallery || event.button !== 0) {
    return;
  }

  galleryState.isPointerDown = true;
  galleryState.isDragging = false;
  galleryState.suppressClick = false;
  galleryState.activeLink = event.target.closest(".gallery__link");
  galleryState.startX = event.clientX;
  galleryState.scrollLeft = gallery.scrollLeft;
  gallery.setPointerCapture?.(event.pointerId);
}

function handleGalleryPointerMove(event) {
  if (!gallery || !galleryState.isPointerDown) {
    return;
  }

  const deltaX = event.clientX - galleryState.startX;

  if (Math.abs(deltaX) < 6 && !galleryState.isDragging) {
    return;
  }

  galleryState.isDragging = true;
  galleryState.suppressClick = true;
  gallery.classList.add("is-dragging");
  gallery.scrollLeft = galleryState.scrollLeft - deltaX;
}

function handleGalleryPointerEnd(event) {
  if (!gallery || !galleryState.isPointerDown) {
    return;
  }

  const link = galleryState.activeLink;
  const shouldOpenDeck = link && !galleryState.isDragging;

  galleryState.isPointerDown = false;
  galleryState.activeLink = null;
  gallery.classList.remove("is-dragging");
  gallery.releasePointerCapture?.(event.pointerId);

  if (shouldOpenDeck) {
    event.preventDefault();
    openDeck(link.dataset.openDeck, link);
    return;
  }

  window.setTimeout(() => {
    galleryState.suppressClick = false;
  }, 180);
}

function suppressDraggedGalleryClick(event) {
  if (!galleryState.suppressClick || !event.target.closest(".gallery")) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  galleryState.suppressClick = false;
}

function handleDirectionalKeys(event) {
  const isDeckOpen = deckOverlay?.classList.contains("is-open");

  if (isDeckOpen && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const targetDeck = findDeckTarget(direction);

    if (targetDeck) {
      event.preventDefault();
      switchDeck(targetDeck);
    }

    return;
  }

  if (!isDeckOpen && document.activeElement === gallery && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    event.preventDefault();
    gallery.scrollBy({
      left: event.key === "ArrowRight" ? gallery.clientWidth * 0.66 : gallery.clientWidth * -0.66,
      behavior: "smooth",
    });
  }
}

function applyInitialSection() {
  const unitParam = urlParams.get("unit");
  const sectionId = urlParams.get("section") || window.location.hash.replace("#", "");
  const target = sectionId ? document.getElementById(sectionId) : null;

  if (unitParam !== null) {
    const unit = Number(unitParam);
    if (Number.isFinite(unit)) {
      window.scrollTo({ top: unit * window.innerHeight, behavior: "auto" });
    }
  } else if (target) {
    const unit = SECTION_UNITS[target.id] || 0;
    window.scrollTo({ top: unit * window.innerHeight, behavior: "auto" });
  }
}

window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("pointerdown", dismissEntryScreen, { passive: true, once: true });
window.addEventListener("click", dismissEntryScreen, { passive: true, once: true });
window.addEventListener("wheel", dismissEntryScreen, { passive: true, once: true });
window.addEventListener("touchmove", dismissEntryScreen, { passive: true, once: true });
window.addEventListener(
  "keydown",
  (event) => {
    if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(event.key)) {
      dismissEntryScreen();
    }
  },
  { once: true },
);
window.addEventListener("resize", requestUpdate);
window.addEventListener("hashchange", () => {
  const deckId = window.location.hash.replace("#", "");

  if (!isDeckId(deckId)) {
    return;
  }

  openDeck(deckId);
});
gallery?.addEventListener("wheel", handleGalleryWheel, { passive: false });
gallery?.addEventListener("pointerdown", handleGalleryPointerDown);
gallery?.addEventListener("pointermove", handleGalleryPointerMove);
gallery?.addEventListener("pointerup", handleGalleryPointerEnd);
gallery?.addEventListener("pointercancel", handleGalleryPointerEnd);
document.addEventListener("click", suppressDraggedGalleryClick, true);
document.addEventListener("click", (event) => {
  const deckTrigger = event.target.closest("[data-open-deck]");
  const closeTrigger = event.target.closest("[data-close-deck]");

  if (deckTrigger) {
    event.preventDefault();
    openDeck(deckTrigger.dataset.openDeck, deckTrigger);
    return;
  }

  if (closeTrigger) {
    event.preventDefault();
    closeDeck();
    return;
  }

  const link = event.target.closest("[data-target-section]");

  if (!link) {
    return;
  }

  event.preventDefault();
  scrollToSection(link.dataset.targetSection);
}, true);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && deckOverlay?.classList.contains("is-open")) {
    closeDeck();
    return;
  }

  handleDirectionalKeys(event);
});
deckOverlay?.addEventListener(
  "wheel",
  (event) => {
    if (deckState.isAnimating) {
      return;
    }

    const activePage = getActiveDeckPage();

    if (!activePage) {
      return;
    }

    if (activePage.classList.contains("deck-page--media")) {
      const consumed = advanceMediaSlide(event.deltaY > 0 ? 1 : -1);

      if (consumed) {
        event.preventDefault();
        return;
      }

      if (event.deltaY < -80 && activePage.dataset.prevDeck) {
        event.preventDefault();
        switchDeck(activePage.dataset.prevDeck);
        return;
      }

      return;
    }

    if (event.deltaY > 80 && activePage.dataset.nextDeck) {
      event.preventDefault();
      switchDeck(activePage.dataset.nextDeck);
      return;
    }

    if (event.deltaY < -80 && activePage.dataset.prevDeck) {
      event.preventDefault();
      switchDeck(activePage.dataset.prevDeck);
      return;
    }

    if (event.deltaY < -80) {
      event.preventDefault();
      closeDeck();
      return;
    }
  },
  { passive: false },
);
async function initializeApp() {
  if (appInitialized) {
    return;
  }

  appInitialized = true;
  await loadProjects();
  renderGallery();
  buildDeckMarkup();
  preloadDeckImages();

  if (urlParams.get("skipEntry") === "1") {
    dismissEntryScreen();
  }

  const hashDeck = window.location.hash.replace("#", "");
  if (deckPages.some((page) => page.dataset.deck === hashDeck)) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: "auto" });
    updateScrollState();
    return;
  }

  applyInitialSection();
  updateScrollState();
}

window.addEventListener("load", initializeApp);
window.addEventListener("storage", (event) => {
  if (event.key === PREVIEW_KEY && shouldUseLocalPreview) {
    refreshProjectsFromDataSource();
  }
});

initializeApp();
