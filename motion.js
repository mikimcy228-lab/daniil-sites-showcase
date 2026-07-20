(function () {
  "use strict";

  var root = document.documentElement;
  var targets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var observer;

  root.classList.add("js");

  function reveal(target) {
    target.classList.add("is-revealed");
  }

  function revealAll() {
    targets.forEach(reveal);
    if (observer) {
      observer.disconnect();
    }
  }

  function handleMotionPreference(event) {
    if (event.matches) {
      root.classList.add("motion-reduced");
      revealAll();
    }
  }

  if (reducedMotion.matches) {
    root.classList.add("motion-reduced");
    revealAll();
  } else if (!("IntersectionObserver" in window)) {
    revealAll();
  } else {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", handleMotionPreference);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(handleMotionPreference);
  }
})();
