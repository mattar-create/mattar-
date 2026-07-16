const NEXT = 1;
const PREV = -1;

const slides = Array.from(document.querySelectorAll(".lab-slide"));
const fields = slides.map((slide) => slide.querySelector(".slide-field"));
const bandLayer = document.querySelector(".transition-layer--12");
const bands = Array.from(document.querySelectorAll(".wipe-band"));
const doorLayer = document.querySelector(".transition-layer--16");
const doorPairs = Array.from(document.querySelectorAll(".door-pair"));
const doors = doorPairs.flatMap((pair) => Array.from(pair.querySelectorAll("i")));
const buttons = Array.from(document.querySelectorAll("[data-run]"));
const stateLabel = document.querySelector("[data-state]");

let current = 0;
let isAnimating = false;

function otherIndex() {
  return current === 0 ? 1 : 0;
}

function setButtons(disabled) {
  buttons.forEach((button) => {
    button.disabled = disabled;
  });
}

function updateState() {
  const label = current === 0 ? "Tela A" : "Tela B";
  if (stateLabel) stateLabel.textContent = `Atual: ${label}`;
}

function resetLayers() {
  gsap.set([bandLayer, doorLayer], { autoAlpha: 1, visibility: "hidden" });
  gsap.set(bands, { autoAlpha: 0, xPercent: 0 });
  gsap.set(doors, { autoAlpha: 0, xPercent: 0 });
}

function finish(previous, next) {
  slides[previous].classList.remove("is-current");
  slides[next].classList.add("is-current");
  gsap.set(slides[previous], { autoAlpha: 0, xPercent: 0, scale: 1, zIndex: 0 });
  gsap.set(fields[previous], { xPercent: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1 });
  gsap.set(slides[next], { autoAlpha: 1, xPercent: 0, scale: 1, zIndex: 2 });
  gsap.set(fields[next], { xPercent: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1 });
  resetLayers();
  current = next;
  isAnimating = false;
  setButtons(false);
  updateState();
}

function prepareTransition(next) {
  const previous = current;
  isAnimating = true;
  setButtons(true);
  gsap.killTweensOf([slides[previous], slides[next], fields[previous], fields[next], ...bands, ...doors]);
  slides[next].classList.add("is-current");
  gsap.set(slides[previous], { autoAlpha: 1, xPercent: 0, scale: 1, zIndex: 2 });
  gsap.set(slides[next], { autoAlpha: 0, xPercent: 0, scale: 1, zIndex: 1 });
  gsap.set([fields[previous], fields[next]], { xPercent: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1 });
  return previous;
}

function runTransition12(direction = NEXT) {
  if (isAnimating) return;
  const next = otherIndex();
  const previous = prepareTransition(next);

  gsap.set(bandLayer, { visibility: "hidden" });
  gsap.set(bands, { autoAlpha: 0, xPercent: 0 });
  gsap.set(slides[previous], { autoAlpha: 1, xPercent: 0, scale: 1, zIndex: 2 });
  gsap.set(slides[next], { autoAlpha: 1, xPercent: direction * 100, scale: 1, zIndex: 3 });
  gsap.set(fields[previous], { xPercent: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1 });
  gsap.set(fields[next], { xPercent: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1 });

  gsap.timeline({
    defaults: { duration: 0.72, ease: "power3.inOut" },
    onComplete: () => finish(previous, next),
  })
    .to(slides[previous], { xPercent: -direction * 100 }, 0)
    .to(slides[next], { xPercent: 0 }, 0);
}

function runTransition16(direction = NEXT) {
  if (isAnimating) return;
  const next = otherIndex();
  const previous = prepareTransition(next);

  gsap.set(doorLayer, { visibility: "visible", autoAlpha: 1 });
  doorPairs.forEach((pair, pairIndex) => {
    const [left, right] = pair.querySelectorAll("i");
    gsap.set(pair, { zIndex: 30 + pairIndex });
    gsap.set(left, { autoAlpha: 1, xPercent: -112 });
    gsap.set(right, { autoAlpha: 1, xPercent: 112 });
  });
  gsap.set(slides[previous], { autoAlpha: 1, scale: 1, zIndex: 2 });
  gsap.set(slides[next], { autoAlpha: 1, scale: 0.52, zIndex: 1 });
  gsap.set(fields[previous], { scale: 1, autoAlpha: 1 });
  gsap.set(fields[next], { scale: 0.86, y: direction * 22, autoAlpha: 0.98 });

  const pairsByReferenceOrder = doorPairs.slice().reverse();
  const closeDoors = pairsByReferenceOrder.flatMap((pair) => Array.from(pair.querySelectorAll("i")));
  const openDoors = pairsByReferenceOrder.slice().reverse().flatMap((pair) => Array.from(pair.querySelectorAll("i")));

  gsap.timeline({
    onComplete: () => finish(previous, next),
  })
    .addLabel("start", 0)
    .to(slides[previous], { scale: 0.1, duration: 0.8, ease: "power4.in" }, "start")
    .to(fields[previous], { scale: 0.72, autoAlpha: 0.45, duration: 0.48, ease: "power3.in" }, "start")
    .to(closeDoors, {
      xPercent: (index) => (index % 2 === 0 ? -50 : 50),
      duration: 0.78,
      stagger: { each: 0.07, from: direction === NEXT ? "end" : "start" },
      ease: "power4.inOut",
    }, "start+=0.02")
    .addLabel("middle", ">-0.02")
    .set(slides[previous], { autoAlpha: 0, scale: 1 }, "middle")
    .set(slides[next], { zIndex: 2 }, "middle")
    .to(slides[next], { scale: 1, duration: 1.14, ease: "expo.out" }, "middle-=0.12")
    .to(fields[next], { y: 0, scale: 1, autoAlpha: 1, duration: 0.78, ease: "power3.out" }, "middle+=0.04")
    .to(openDoors, {
      xPercent: (index) => (index % 2 === 0 ? -112 : 112),
      duration: 0.88,
      stagger: { each: 0.07, from: direction === NEXT ? "start" : "end" },
      ease: "power4.inOut",
    }, "middle+=0.02");
}

function goBack() {
  const direction = current === 0 ? NEXT : PREV;
  runTransition16(direction);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.run;
    if (action === "12") runTransition12(current === 0 ? NEXT : PREV);
    if (action === "16") runTransition16(current === 0 ? NEXT : PREV);
    if (action === "back") goBack();
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "1") runTransition12(current === 0 ? NEXT : PREV);
  if (event.key === "2") runTransition16(current === 0 ? NEXT : PREV);
  if (event.key === "Backspace") {
    event.preventDefault();
    goBack();
  }
});

resetLayers();
updateState();
