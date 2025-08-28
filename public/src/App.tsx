import { Scope, createScope } from "animejs";
import { useRef, type RefObject, useEffect, useState } from "react";
import { createWebTimeline, initMobileMenu, initScrollSpy, initSwiper, initViewAnimate } from "./main.ts";
import { DecorativeCircles } from "./ui/decorators/circles.tsx";
import { Header, Main, Footer } from "./ui/views/index.tsx";
import { userContext } from "./ui/store.tsx";
import { User } from "./common/index.ts";

export default function App() {
  const [user, setUser] = useState(new User())
  const root = useRef(null);
  const scope: RefObject<Scope | null> = useRef(null);

  useEffect(() => {
    fetch("data/user.json")
      .then(res => res.json())
      .then(resData => {
        const user = User.deserialize(resData)
        if(!user) throw "User json is corrupted"
        setUser(user)
      });
  }, [])
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
    <userContext.Provider value={user}>
      <div className="s-pagewrap" ref={root}>
        <DecorativeCircles />
        <Header />
        <Main />
        <Footer />
      </div>
    </userContext.Provider>
  )
}