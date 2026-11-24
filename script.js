document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Interactive expandable experience & education chips (matching yashsmehta.com)
  var chips = Array.prototype.slice.call(document.querySelectorAll(".logo-chip"));
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
  var hoverTimer = null;
  var openedByHover = null;

  function setChipOpen(chip, isOpen) {
    chip.classList.toggle("open", isOpen);
    var trigger = chip.querySelector(".chip-trigger");
    if (trigger) trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  function keepAnchorStable(el, targetTop) {
    var end = Date.now() + 650;
    var active = true;
    function stop() { active = false; }
    ["touchmove", "wheel"].forEach(function (ev) {
      window.addEventListener(ev, stop, { passive: true, once: true });
    });
    (function tick() {
      if (!active) return;
      var delta = el.getBoundingClientRect().top - targetTop;
      if (Math.abs(delta) > 0.5) {
        window.scrollBy({ top: delta, left: 0, behavior: "instant" });
      }
      if (Date.now() < end) requestAnimationFrame(tick);
    })();
  }

  function openChip(chip) {
    var swapped = false;
    var trigger = chip.querySelector(".chip-trigger");
    var topBefore = trigger.getBoundingClientRect().top;

    chips.forEach(function (other) {
      if (other !== chip && other.parentNode === chip.parentNode) {
        var wasOpen = other.classList.contains("open");
        other.classList.toggle("swap", wasOpen);
        if (wasOpen) {
          swapped = true;
          setChipOpen(other, false);
        }
      }
    });

    chip.classList.toggle("swap", swapped);
    if (swapped) keepAnchorStable(trigger, topBefore);
    setChipOpen(chip, true);
  }

  function closeChip(chip) {
    chip.classList.remove("swap");
    setChipOpen(chip, false);
  }

  chips.forEach(function (chip) {
    var trigger = chip.querySelector(".chip-trigger");
    var closeBtn = chip.querySelector(".exp-close");

    trigger.addEventListener("mouseenter", function () {
      if (canHover && !chip.classList.contains("open")) {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () {
          openChip(chip);
          openedByHover = chip;
        }, 110);
      }
    });

    trigger.addEventListener("mouseleave", function () {
      clearTimeout(hoverTimer);
      if (openedByHover === chip) openedByHover = null;
    });

    trigger.addEventListener("click", function () {
      clearTimeout(hoverTimer);
      if (chip.classList.contains("open") && openedByHover !== chip) {
        closeChip(chip);
      } else {
        openChip(chip);
      }
      openedByHover = null;
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeChip(chip);
        trigger.focus({ preventScroll: true });
      });
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") chips.forEach(closeChip);
  });

  // Gentle first-view hop nudge on the logo chips
  var groups = document.querySelector(".exp-groups");
  if (groups && !reducedMotion && "IntersectionObserver" in window) {
    var nudgeObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        nudgeObserver.disconnect();
        setTimeout(function () {
          groups.classList.add("nudge");
          setTimeout(function () {
            groups.classList.remove("nudge");
          }, 500 + 75 * chips.length + 100);
        }, 600);
      }
    }, { threshold: 0.85 });
    nudgeObserver.observe(groups);
  }

  // Highlights / News show-more toggle
  var newsToggle = document.getElementById("newsToggle");
  var newsList = document.getElementById("newsList");
  if (newsToggle && newsList) {
    newsToggle.addEventListener("click", function () {
      var expanded = newsList.classList.toggle("expanded");
      this.setAttribute("aria-expanded", expanded ? "true" : "false");
      this.textContent = expanded ? this.dataset.less : this.dataset.more;
    });
  }

  // Scroll reveal
  window.revealReady = true;
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function reveal(el, delay) {
    el.style.setProperty("--reveal-delay", delay + "ms");
    el.classList.add("is-in");
  }
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      var i = 0;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealObserver.unobserve(entry.target);
          reveal(entry.target, 70 * Math.min(i++, 8));
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.1 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { reveal(el, 0); });
  }
});
