import { useRef, useLayoutEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { gsap } from "gsap";
//import GSDevTools from "gsap/GSDevTools";
import ScrollTrigger from "gsap/ScrollTrigger";
import { addToRefArray } from "./utilities";

export function FadeInText({ id, children }) {
  const arrayRef = useRef([]);
  arrayRef.current = [];

  function fadeIn(el, trigger = null) {
    let animationObj = gsap.timeline().from(el, {
      autoAlpha: 0,
      scrollTrigger: {
        trigger: trigger ? trigger : el,
        start: "center 20%",
        end: "center 10%",
        markers: true,
        scrub: true,
        id: "content",
      },
    });

    return animationObj;
  }

  useLayoutEffect(() => {
    arrayRef.current = arrayRef.current.filter(Boolean);

    arrayRef.current.forEach((item, index) => {
      fadeIn(item);
    });

    console.log("scrolltrigger instances:", ScrollTrigger.getAll());
    let getGroup = ScrollTrigger.getAll();
    console.log(getGroup);
  }, []);

  return (
    <div id={id} ref={(el)=>addToRefArray(el,arrayRef)}>
      {children}
    </div>
  );
}
