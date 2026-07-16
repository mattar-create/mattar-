(function () {
  function init(scope) {
    const root = scope || document;
    const carousels = Array.from(root.querySelectorAll("[data-vertical-image-carousel]"));

    carousels.forEach((carousel) => {
      const cards = Array.from(carousel.querySelectorAll(".vertical-image-carousel__card"));
      const ring = carousel.querySelector(".vertical-image-carousel__ring");
      if (!ring || !cards.length) return;

      ring.style.setProperty("--carousel-count", cards.length);
      ring.style.setProperty("--n", cards.length);
      cards.forEach((card, index) => {
        card.style.setProperty("--carousel-index", index);
        card.style.setProperty("--i", index);
        card.style.setProperty("--carousel-angle", `${(360 / cards.length) * index}deg`);
      });
      carousel.classList.add("is-initialized");
    });
  }

  window.VerticalImageCarousel = { init };
})();