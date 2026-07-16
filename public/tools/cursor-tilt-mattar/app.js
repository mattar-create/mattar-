const preview = document.querySelector(".preview-area");
const card = document.querySelector("#tiltCard");
const readout = document.querySelector("#readout");

const controls = {
  rotation: document.querySelector("#rotation"),
  travel: document.querySelector("#travel"),
  scale: document.querySelector("#scale"),
  perspective: document.querySelector("#perspective"),
  glow: document.querySelector("#glow"),
};

const outputs = {
  rotation: document.querySelector("#rotationValue"),
  travel: document.querySelector("#travelValue"),
  scale: document.querySelector("#scaleValue"),
  perspective: document.querySelector("#perspectiveValue"),
  glow: document.querySelector("#glowValue"),
};

const autoMode = document.querySelector("#autoMode");
const reset = document.querySelector("#reset");
const vectorSwatches = document.querySelectorAll(".vector-swatch");
const bgSwatches = document.querySelectorAll(".bg-swatch");
const params = new URLSearchParams(window.location.search);
const mImages = (params.get("images") || "")
  .split("|")
  .map((item) => item.trim())
  .filter(Boolean)
  .map((item) => decodeURIComponent(item));
let activeImageIndex = 0;
let imageTimer = 0;

function setupMImages() {
  if (!mImages.length || !card) return;
  card.classList.add("has-image-fill");
  mImages.forEach((src, index) => {
    const layer = document.createElement("div");
    layer.className = `m-image-fill ${index === 0 ? "is-active" : ""}`;
    layer.style.backgroundImage = `url("${src.replaceAll('"', '%22')}")`;
    card.prepend(layer);
  });
  window.clearInterval(imageTimer);
  imageTimer = window.setInterval(() => {
    const layers = Array.from(card.querySelectorAll(".m-image-fill"));
    if (layers.length < 2) return;
    activeImageIndex = (activeImageIndex + 1) % layers.length;
    layers.forEach((layer, index) => layer.classList.toggle("is-active", index === activeImageIndex));
  }, 3600);
}

const state = {
  pointerX: 0.5,
  pointerY: 0.5,
  currentX: 0.5,
  currentY: 0.5,
  auto: true,
  start: performance.now(),
};

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function setVectorColor(hex) {
  const rgb = hexToRgb(hex);
  document.documentElement.style.setProperty("--vector-color", hex);
  document.documentElement.style.setProperty("--vector-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
}

function setBackgroundColor(hex) {
  document.documentElement.style.setProperty("--bg", hex);
}

function lerp(from, to, amount) {
  return from + (to - from) * amount;
}

function updateLabels() {
  outputs.rotation.value = `${controls.rotation.value}°`;
  outputs.travel.value = `${controls.travel.value}px`;
  outputs.scale.value = `${controls.scale.value}%`;
  outputs.perspective.value = `${controls.perspective.value}px`;
  outputs.glow.value = `${controls.glow.value}%`;
  document.documentElement.style.setProperty("--perspective", `${controls.perspective.value}px`);
  document.documentElement.style.setProperty("--mark-scale", Number(controls.scale.value) / 100);
  document.documentElement.style.setProperty("--glow", controls.glow.value);
}

function setPointer(x, y) {
  state.pointerX = Math.min(1, Math.max(0, x));
  state.pointerY = Math.min(1, Math.max(0, y));
  state.auto = false;
  autoMode.classList.remove("is-active");
}

function setPointerFromEvent(event) {
  const rect = preview.getBoundingClientRect();
  setPointer((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
}

function render(now) {
  if (state.auto) {
    const elapsed = (now - state.start) / 1000;
    state.pointerX = 0.5 + Math.cos(elapsed * 0.82) * 0.34;
    state.pointerY = 0.5 + Math.sin(elapsed * 1.08) * 0.32;
  }

  state.currentX = lerp(state.currentX, state.pointerX, 0.12);
  state.currentY = lerp(state.currentY, state.pointerY, 0.12);

  const centeredX = state.currentX - 0.5;
  const centeredY = state.currentY - 0.5;
  const rotation = Number(controls.rotation.value);
  const travel = Number(controls.travel.value);

  card.style.setProperty("--rotate-x", `${centeredY * rotation * -2}deg`);
  card.style.setProperty("--rotate-y", `${centeredX * rotation * 2}deg`);
  card.style.setProperty("--logo-x", `${centeredX * travel * 2}px`);
  card.style.setProperty("--logo-y", `${centeredY * travel * 2}px`);

  readout.textContent = `X ${Math.round(state.currentX * 100)} / Y ${Math.round(
    state.currentY * 100,
  )}`;

  requestAnimationFrame(render);
}

Object.values(controls).forEach((control) => {
  control.addEventListener("input", updateLabels);
});

preview.addEventListener("pointermove", setPointerFromEvent);
preview.addEventListener("pointerdown", setPointerFromEvent);

window.addEventListener("message", (event) => {
  if (event.data?.type !== "mattar:global-cursor") return;
  const x = Number(event.data.x);
  const y = Number(event.data.y);
  setPointer(Number.isFinite(x) ? x : 0.5, Number.isFinite(y) ? y : 0.5);
});

preview.addEventListener("pointerleave", () => {
  state.auto = true;
  state.start = performance.now();
  autoMode.classList.add("is-active");
});

autoMode.addEventListener("click", () => {
  state.auto = !state.auto;
  state.start = performance.now();
  autoMode.classList.toggle("is-active", state.auto);
});

reset.addEventListener("click", () => {
  controls.rotation.value = 18;
  controls.travel.value = 34;
  controls.scale.value = 120;
  controls.perspective.value = 680;
  controls.glow.value = 58;
  state.auto = false;
  state.pointerX = 0.5;
  state.pointerY = 0.5;
  autoMode.classList.remove("is-active");
  setVectorColor("#CE211A");
  setBackgroundColor("#10100F");
  vectorSwatches.forEach((item) => item.classList.toggle("is-active", item.dataset.color === "#CE211A"));
  bgSwatches.forEach((item) => item.classList.toggle("is-active", item.dataset.color === "#10100F"));
  updateLabels();
});

vectorSwatches.forEach((button) => {
  button.addEventListener("click", () => {
    vectorSwatches.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    setVectorColor(button.dataset.color);
  });
});

bgSwatches.forEach((button) => {
  button.addEventListener("click", () => {
    bgSwatches.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    setBackgroundColor(button.dataset.color);
  });
});

setVectorColor("#CE211A");
setBackgroundColor("#10100F");
setupMImages();
updateLabels();
requestAnimationFrame(render);
