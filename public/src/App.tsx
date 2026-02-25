import { Scope, createScope } from "animejs";
import { useRef, type RefObject, useEffect, useState } from "react";
import { createWebTimeline, initMobileMenu, initScrollSpy, initSwiper, initViewAnimate } from "./main.ts";
import { DecorativeCircles } from "./ui/decorators/circles.tsx";
import { Header, Main, Footer } from "./ui/views/index.tsx";
import { userContext } from "./ui/store.tsx";
import { User } from "./common/index.ts";

export default function App() {
  const [user, setUser] = useState(() => new User());
  const [loadError, setLoadError] = useState<string | null>(null);
  const root = useRef<HTMLDivElement | null>(null);
  const scope: RefObject<Scope | null> = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    fetch("data/user.json", { signal: controller.signal })
      .then(res => res.json())
      .then(resData => {
        if (!isActive) return;
        const tl = createWebTimeline();
        const user = User.deserialize(resData);
        if (!user) throw new Error("User JSON is corrupted");
        setUser(user);
        scope.current = createScope({ root }).add(self => {
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
            cleanupMobileMenu();
            cleanupViewAnimate();
            cleanupScrollSpy();
            cleanupSwiper();
            tl.cancel();
          };
        });
      })
      .catch(error => {
        if (!isActive) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Failed to initialize app:", error);
        setLoadError("Some profile data failed to load.");
      });

    return () => {
      isActive = false;
      controller.abort();
      if (scope.current) {
        scope.current.revert();
        scope.current = null;
      }
    };
  }, []);

  return (
    <userContext.Provider value={user}>
      <div className="s-pagewrap" ref={root}>
        {loadError && <p role="alert">{loadError}</p>}
        <DecorativeCircles />
        <Header />
        <Main />
        <Footer />
      </div>
    </userContext.Provider>
  );
}
