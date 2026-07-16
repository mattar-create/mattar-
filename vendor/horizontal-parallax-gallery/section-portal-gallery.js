/*
  DOM-only port of the Codrops Horizontal Parallax Gallery engine.
  Audited source files:
  - index.html: .gallery__wrapper > .gallery__image__container > .gallery__media > img
  - src/main.ts: preload, limit measurement, wheel delta, lerp render loop
  - src/gallery/index.ts: track translateX and viewport-position parallax
  - src/gallery/gallery.css: flex track, overflow-hidden wrapper, 125% inner media
  - src/utils/math.ts: GSAP clamp/interpolate equivalents
*/
(function () {
  const DEFAULT_SMOOTHING = 0.09;
  const MIN_COPIES = 5;

  function lerp(from, to, amount) {
    return from + (to - from) * amount;
  }

  function mod(value, size) {
    if (!size) return 0;
    return ((value % size) + size) % size;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  class SectionPortalGallery {
    constructor(root) {
      this.root = root;
      this.gallery = root.querySelector(".section-portal__gallery");
      this.wrapper = root.querySelector(".section-portal__wrapper") || this.gallery;
      this.track = root.querySelector(".section-portal__track");
      this.controls = Array.from(root.querySelectorAll(".section-portal__control"));
      this.baseItems = Array.from(root.querySelectorAll(".section-portal__item"));
      this.currentOffset = 0;
      this.targetOffset = 0;
      this.smoothing = Number(root.dataset.smoothing || DEFAULT_SMOOTHING);
      this.speed = Number(root.dataset.speed || 1);
      this.direction = Number(root.dataset.direction || 1);
      this.loopWidth = 0;
      this.active = false;
      this.resizeObserver = null;

      this.buildLoop();
      this.bindControls();
      this.measure();
      this.render();
      this.observe();
      this.preload().then(() => {
        this.measure();
        this.render();
      });
    }

    buildLoop() {
      if (!this.track || !this.baseItems.length) return;

      this.track.querySelectorAll("[data-portal-clone]").forEach((node) => node.remove());
      const source = this.baseItems.map((item) => item.cloneNode(true));

      for (let copy = 1; copy < MIN_COPIES; copy += 1) {
        source.forEach((item) => {
          const clone = item.cloneNode(true);
          clone.dataset.portalClone = "true";
          clone.setAttribute("aria-hidden", "true");
          this.track.appendChild(clone);
        });
      }

      this.items = Array.from(this.track.querySelectorAll(".section-portal__item"));
      this.images = Array.from(this.track.querySelectorAll(".section-portal__image"));
    }

    preload() {
      const images = this.images.filter((image) => image.tagName === "IMG");
      return Promise.all(images.map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }));
    }

    bindControls() {
      this.controls.forEach((control) => {
        control.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const sign = control.dataset.portalAction === "previous" ? -1 : 1;
          const step = Math.max(320, (this.wrapper?.clientWidth || window.innerWidth) * 0.72);
          this.moveBy(sign * step);
        });
      });
    }

    observe() {
      window.addEventListener("resize", () => this.measure());
      if (!window.ResizeObserver || !this.track) return;

      this.resizeObserver = new ResizeObserver(() => this.measure());
      this.resizeObserver.observe(this.track);
    }

    measure() {
      if (!this.track || !this.baseItems.length) return;

      const trackStyle = window.getComputedStyle(this.track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "0") || 0;
      const baseWidth = this.baseItems.reduce((sum, item) => sum + item.getBoundingClientRect().width, 0);
      this.loopWidth = baseWidth + gap * this.baseItems.length;
    }

    setActive(active) {
      this.active = active;
      this.root.classList.toggle("is-portal-active", active);
      if (active) this.measure();
    }

    moveBy(delta) {
      if (!Number.isFinite(delta)) return;
      this.targetOffset += delta;
    }

    addInput(delta) {
      if (!Number.isFinite(delta)) return;
      this.moveBy(delta * this.speed * this.direction);
    }

    applyParallax() {
      const viewportCenter = window.innerWidth * 0.5;
      const safeCenter = viewportCenter || 1;

      this.images.forEach((image) => {
        const item = image.closest(".section-portal__item");
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const elementCenter = rect.left + rect.width * 0.5;
        const t = clamp((elementCenter - viewportCenter) / safeCenter, -1, 1);
        const depth = Number(item.style.getPropertyValue("--portal-depth") || 1);
        const shift = -t * 10 * depth;
        image.style.transform = `translate3d(${shift}%, 0, 0)`;
      });
    }

    render() {
      if (!this.track || !this.loopWidth) return;

      const wrapped = mod(this.currentOffset, this.loopWidth);
      this.track.style.transform = `translate3d(${-wrapped}px, 0, 0)`;
      this.applyParallax();
    }

    frame() {
      if (!this.active) return;

      this.currentOffset = lerp(this.currentOffset, this.targetOffset, this.smoothing);
      if (Math.abs(this.currentOffset - this.targetOffset) < 0.01) this.currentOffset = this.targetOffset;
      this.render();
    }
  }

  class SectionPortalMotionController {
    constructor() {
      this.instances = [];
      this.raf = null;
      this.animate = this.animate.bind(this);
    }

    init(scope = document) {
      this.instances = Array.from(scope.querySelectorAll(".section-portal")).map((root) => new SectionPortalGallery(root));
      this.updateActive();
      if (!this.raf) this.raf = requestAnimationFrame(this.animate);
    }

    updateActive() {
      this.instances.forEach((instance) => {
        const slide = instance.root.closest(".slide");
        instance.setActive(Boolean(slide && slide.classList.contains("is-active")));
      });
    }

    getActive() {
      this.updateActive();
      return this.instances.find((instance) => instance.active) || null;
    }

    animate() {
      this.updateActive();
      this.instances.forEach((instance) => instance.frame());
      this.raf = requestAnimationFrame(this.animate);
    }
  }

  window.SectionPortalMotion = new SectionPortalMotionController();
})();