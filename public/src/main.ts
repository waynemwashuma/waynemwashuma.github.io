import { stagger, animate, createTimeline } from "animejs";
import { create as createLightBox } from "basiclightbox";
import MoveTo from "moveto";
import { Swiper } from "swiper";

document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + ' js ';

/* Animations */

/* Mobile Menu */
export function initMobileMenu() {
  const toggleButton = document.querySelector('.mobile-menu-toggle');
  const mainNavWrap = document.querySelector('.main-nav-wrap');
  const siteBody = document.querySelector("body");

  if (!(toggleButton && mainNavWrap && siteBody)) return;

  toggleButton.addEventListener('click', function (event) {
    event.preventDefault();
    toggleButton.classList.toggle('is-clicked');
    siteBody.classList.toggle('menu-is-open');
  });

  mainNavWrap.querySelectorAll('.main-nav a').forEach(function (link) {
    link.addEventListener("click", function (_event) {

      // at 800px and below
      if (window.matchMedia('(max-width: 800px)').matches) {
        toggleButton.classList.toggle('is-clicked');
        siteBody.classList.toggle('menu-is-open');
      }
    });
  });

  window.addEventListener('resize', function () {

    // above 800px
    if (window.matchMedia('(min-width: 801px)').matches) {
      if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
      if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
    }
  });

};


/* Highlight active menu link on pagescroll */
export function initScrollSpy() {
  window.addEventListener("scroll", navHighlight);
  function navHighlight() {
    const sections = document.querySelectorAll(".target-section");
    const {scrollY} = window;
    sections.forEach(function (current) {
      if (!(current instanceof HTMLElement)) return
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
      const element = document.querySelector(".main-nav a[href*=" + sectionId + "]")

      if (!element) return

      const parent = element.parentNode as HTMLElement

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        parent.classList.add("current");
      } else {
        parent.classList.remove("current");
      }
    });
  }

};


/* Animate elements if in viewport */
export function initViewAnimate() {
  window.addEventListener("scroll", viewportAnimation);
  
  function viewportAnimation() {
    const blocks = document.querySelectorAll("[data-animate-block]");
    const scrollY = window.pageYOffset;

    blocks.forEach(function (current) {
      if (!(current instanceof HTMLElement)) return
      const viewportHeight = window.innerHeight;
      const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
      const blockHeight = current.offsetHeight;
      const blockSpace = triggerTop + blockHeight;
      const inView = scrollY > triggerTop && scrollY <= blockSpace;
      const isAnimated = current.classList.contains("ss-animated");

      if (inView && (!isAnimated)) {
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
      }
    });
  }

};


/* Swiper */
export function initSwiper() {

  new Swiper('.swiper-container', {

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

};


/* Lightbox */
export function initLightbox() {

  const folioLinks = document.querySelectorAll('.folio-list__item-link');
  const modals: any[] = [];

  folioLinks.forEach(function (link) {
    const modalbox = link.getAttribute('href');
    if (!modalbox) return
    const element = document.querySelector(modalbox)
    if (!element) return
    let instance = createLightBox(
      element,
      {
        onShow: function (instance) {
          //detect Escape key press
          document.addEventListener("keydown", function (event) {
            event = event || window.event;
            if (event.keyCode === 27) {
              instance.close();
            }
          });
          return false
        }
      }
    )
    modals.push(instance);
  });

  folioLinks.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      modals[index].show();
    });
  });

};


/* Alert boxes */
export function initAlertBoxes() {

  const boxes = document.querySelectorAll('.alert-box');

  boxes.forEach(function (box) {
    if (!(box instanceof HTMLElement)) return
    box.addEventListener('click', function (event) {
      if (!(event.target instanceof HTMLElement)) return
      if (!(event.target.parentElement instanceof HTMLElement)) return
      if (event.target.matches(".alert-box__close")) {
        event.stopPropagation();
        event.target.parentElement.classList.add("hideit");

        setTimeout(function () {
          box.style.display = "none";
        }, 500)
      }
    });

  })

};


/* Smoothscroll */
export function initMoveTo() {

  const easeFunctions = {
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

  const triggers = document.querySelectorAll('.smoothscroll');

  const moveTo = new MoveTo({
    tolerance: 0,
    duration: 1200,
    easing: 'easeInOutCubic',
    container: window
  }, easeFunctions);

  triggers.forEach(function (trigger) {
    moveTo.registerTrigger(trigger as HTMLElement);
  });

};

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
    .add('.intro-social li', {
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: stagger(100, { reversed: true })
    })
    .add('.intro-scrolldown', {
      translateY: [100, 0],
      opacity: [0, 1]
    }, '-=800');
}


/* Initialize */
initMobileMenu();
initViewAnimate();
initScrollSpy()
initSwiper();
initLightbox();
initAlertBoxes();
initMoveTo();
