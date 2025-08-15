import { Scope, createScope } from "animejs";
import { useRef, type RefObject, useEffect } from "react";
import { createWebTimeline, initMobileMenu, initScrollSpy, initSwiper, initViewAnimate } from "./main.ts";
import { DecorativeCircles } from "./ui/decorators/circles.tsx";
import { Header,Main,Footer } from "./ui/views/index.tsx";

export default function App() {
  const root = useRef(null);
  const scope: RefObject<Scope | null> = useRef(null);
  
  useEffect(() => {
    const tl = createWebTimeline()
    scope.current = createScope({ root }).add(self => {
      if (!self) return
      window.addEventListener('load', function () {
        const element = document.querySelector('html')
        const preloader = document.querySelector('#preloader');
    
        if (!preloader) return;
        if (!element) return
        element.classList.remove('ss-preload');
        element.classList.add('ss-loaded');
    
        document.querySelectorAll('.ss-animated').forEach(function (item) {
          item.classList.remove('ss-animated');
        });
        initMobileMenu();
        initViewAnimate();
        initScrollSpy()
        initSwiper();
        tl.play();
      });
    });

    return () => {
      if (scope.current)
        scope.current.revert()
    }
  }, []);

  return (
    <div className="s-pagewrap" ref={root}>
      <DecorativeCircles/>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}