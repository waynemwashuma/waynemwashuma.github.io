import { stagger, animate, createTimeline } from "animejs";
import { Swiper } from "swiper";

type Cleanup = () => void;
const NOOP: Cleanup = () => undefined;

/* Mobile Menu */
export function initMobileMenu(): Cleanup {
  const toggleButton = document.querySelector('.mobile-menu-toggle');
  const mainNavWrap = document.querySelector('.main-nav-wrap');
  const siteBody = document.querySelector("body");

  if (!(toggleButton && mainNavWrap && siteBody)) return NOOP;

  const onToggleClick = function (event: Event) {
    event.preventDefault();
    toggleButton.classList.toggle('is-clicked');
    siteBody.classList.toggle('menu-is-open');
  };
  toggleButton.addEventListener('click', onToggleClick);

  const onNavLinkClick = function () {
      // at 800px and below
      if (window.matchMedia('(max-width: 800px)').matches) {
        toggleButton.classList.toggle('is-clicked');
        siteBody.classList.toggle('menu-is-open');
      }
  };
  const links = mainNavWrap.querySelectorAll('.main-nav a');
  links.forEach(function (link) {
    link.addEventListener("click", onNavLinkClick);
  });

  const onResize = function () {

    // above 800px
    if (window.matchMedia('(min-width: 801px)').matches) {
      if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
      if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
    }
  };
  window.addEventListener('resize', onResize);

  return function cleanupMobileMenu() {
    toggleButton.removeEventListener('click', onToggleClick);
    links.forEach(function (link) {
      link.removeEventListener("click", onNavLinkClick);
    });
    window.removeEventListener('resize', onResize);
  };
};

/* Highlight active menu link on pagescroll */
export function initScrollSpy(): Cleanup {
  function escapeCssValue(value: string) {
    if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
      return CSS.escape(value);
    }
    return value.replace(/["\\]/g, "\\$&");
  }

  function navHighlight() {
    const sections = document.querySelectorAll(".target-section");
    const { scrollY } = window;
    sections.forEach(function (current) {
      if (!(current instanceof HTMLElement)) return
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
      if (!sectionId) return;
      const escapedSectionId = escapeCssValue(sectionId);
      const element = document.querySelector(`.main-nav a[href*="${escapedSectionId}"]`);

      if (!element) return

      const parent = element.parentElement;
      if (!parent) return;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        parent.classList.add("current");
      } else {
        parent.classList.remove("current");
      }
    });
  }

  let ticking = false;
  const onScroll = function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      navHighlight();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  navHighlight();
  return function cleanupScrollSpy() {
    window.removeEventListener("scroll", onScroll);
  };
};

/* Animate elements if in viewport */
export function initViewAnimate(): Cleanup {
  const blocks = Array.from(document.querySelectorAll("[data-animate-block]")).filter(function (element): element is HTMLElement {
    return element instanceof HTMLElement;
  });

  if (!blocks.length || !("IntersectionObserver" in window)) return NOOP;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return;
      const current = entry.target;
      if (current.classList.contains("ss-animated")) {
        observer.unobserve(current);
        return;
      }
      animate(current.querySelectorAll("[data-animate-el]"), {
        opacity: [0, 1],
        translateY: [100, 0],
        delay: stagger(400, { start: 200 }),
        duration: 800,
        easing: 'easeInOutCubic',
        begin: function () {
          current.classList.add("ss-animated");
        }
      });
      observer.unobserve(current);
    });
  }, {
    rootMargin: "0px 0px -20% 0px",
    threshold: 0.01
  });

  blocks.forEach(function (block) {
    observer.observe(block);
  });

  return function cleanupViewAnimate() {
    observer.disconnect();
  };
};

/* Swiper */
export function initSwiper(): Cleanup {
  const container = document.querySelector('.swiper-container');
  if (!(container instanceof HTMLElement)) return NOOP;

  const swiper = new Swiper(container, {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is > 400px
      401: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is > 800px
      801: {
        slidesPerView: 2,
        spaceBetween: 32
      },
      // when window width is > 1200px
      1201: {
        slidesPerView: 2,
        spaceBetween: 80
      }
    }
  });

  return function cleanupSwiper() {
    swiper.destroy(true, true);
  };
};

/* Smoothscroll */
export  const EaseFunctions = {
  easeInQuad: function (t: number, b: number, c: number, d: number) {
    t /= d;
    return c * t * t + b;
  },
  easeOutQuad: function (t: number, b: number, c: number, d: number) {
    t /= d;
    return -c * t * (t - 2) + b;
  },
  easeInOutQuad: function (t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  },
  easeInOutCubic: function (t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }
}

export function createWebTimeline() {
  return createTimeline({
    playbackEase: 'easeInOutCubic',
    duration: 800,
    autoplay: false
  }).add('#loader', {
    opacity: 0,
    duration: 1000,
    onBegin: function () {
      window.scrollTo(0, 0);
    }
  })
    .add('#preloader', {
      opacity: 0,
      onComplete: function () {
        const preloader = document.querySelector("#preloader")
        if (!(preloader instanceof HTMLElement)) return
        preloader.style.visibility = "hidden";
        preloader.style.display = "none";
      }
    })
    .add('.s-header', {
      translateY: [-100, 0],
      opacity: [0, 1]
    }, '-=200')
    .add(['.s-intro .text-pretitle', '.s-intro .text-huge-title'], {
      translateX: [100, 0],
      opacity: [0, 1],
      delay: stagger(400)
    })
    .add('.circles span', {
      keyframes: [
        { opacity: [0, .3] },
        { opacity: [.3, .1], delay: stagger(100, { reversed: true }) }
      ],
      delay: stagger(100, { reversed: true })
    })
    .add('.intro-scrolldown', {
      translateY: [100, 0],
      opacity: [0, 1]
    }, '-=800');
}
