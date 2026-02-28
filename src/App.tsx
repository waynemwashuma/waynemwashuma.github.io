import userdata from "../content/author.json" with {type:"json"}
import { Scope, createScope } from "animejs";
import { useRef, type RefObject, useEffect } from "react";
import { createWebTimeline, initMobileMenu, initScrollSpy, initSwiper, initViewAnimate } from "./main.ts";
import { DecorativeCircles } from "./ui/decorators/circles.tsx";
import { Header, Main, Footer } from "./ui/views/index.tsx";
import { userContext } from "./ui/store.tsx";
import { User } from "./common/index.ts";

export default function App() {
  const user = User.deserialize(userdata)

  if(!user){
    throw "Invalid user data"
  }
  const root = useRef<HTMLDivElement | null>(null);
  const scope: RefObject<Scope | null> = useRef(null);

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    const tl = createWebTimeline();
    scope.current = createScope({ root }).add((self) => {
      if (!self) return;
      const element = document.documentElement;
      const preloader = document.querySelector("#preloader");

      if (!preloader) return;
      element.classList.remove("ss-preload");
      element.classList.add("ss-loaded");

      (root.current ?? document).querySelectorAll(".ss-animated").forEach(item => {
        item.classList.remove("ss-animated");
      });
      const cleanupMobileMenu = initMobileMenu();
      const cleanupViewAnimate = initViewAnimate();
      const cleanupScrollSpy = initScrollSpy();
      const cleanupSwiper = initSwiper();
      tl.play();

      return () => {
        if (scope.current) {
          scope.current.revert();
          scope.current = null;
        }
        cleanupMobileMenu();
        cleanupViewAnimate();
        cleanupScrollSpy();
        cleanupSwiper();
        tl.cancel();
      };
    });
  }, [])
  return (
    <userContext.Provider value={user}>
      <div className="s-pagewrap" ref={root}>
        <DecorativeCircles />
        <Header />
        <Main />
        <Footer />
      </div>
    </userContext.Provider>
  );
}
