import { useRef, useLayoutEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { gsap } from "gsap";
//import GSDevTools from "gsap/GSDevTools";
import ScrollTrigger from "gsap/ScrollTrigger";
import styled from "styled-components";
import { addToRefArray } from "./utilities";
import { FadeInText } from "./animations";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { title: "Seccion 1", subTitle: "Subtitulo" },
  { title: "Seccion 2", subTitle: "Subtitulo" },
  { title: "Seccion 3", subTitle: "Subtitulo" },
];

function App() {
  const sectionArrayRef = useRef([]);
  sectionArrayRef.current = [];
  const titleArrayRef = useRef([]);
  titleArrayRef.current = [];
  const subTitleArrayRef = useRef([]);
  subTitleArrayRef.current = [];

  function revealFromTopST(el) {
    let animationObj = gsap.timeline().from(el, {
      y: "-101%",
    });

    let STObj = ScrollTrigger.create({
      animation: animationObj,
      trigger: el,
      start: "top 20%",
      end: "top top",
      markers: true,
      scrub: true,
      id: "from top",
    });

    return STObj;
  }
  function revealFromTop(el) {
    let animationObj = gsap.timeline().from(el, {
      y: "-101%",
      scrollTrigger: {
        trigger: el,
        start: "top 20%",
        end: "top top",
        markers: true,
        scrub: true,
        id: "from top",
      },
    });

    return animationObj;
  }

  function revealFromLeft(el, trigger = null) {
    let animationObj = gsap.timeline().from(el, {
      x: "-100%",
      scrollTrigger: {
        trigger: trigger ? trigger : el,
        start: "center 40%",
        end: "center 20%",
        markers: true,
        scrub: true,
        id: "from top",
      },
    });

    return animationObj;
  }
  function fadeIn(el, trigger = null) {
    let animationObj = gsap.timeline().from(el, {
      autoAlpha: 0,
      scrollTrigger: {
        trigger: trigger ? trigger : el,
        start: "center 35%",
        end: "center 20%",
        markers: true,
        scrub: true,
        id: "fadeIn",
      },
    });

    return animationObj;
  }

  useLayoutEffect(() => {
    sectionArrayRef.current = sectionArrayRef.current.filter(Boolean);
    titleArrayRef.current = titleArrayRef.current.filter(Boolean);
    subTitleArrayRef.current = subTitleArrayRef.current.filter(Boolean);
    console.log(sectionArrayRef.current);
    console.log(titleArrayRef.current);

    subTitleArrayRef.current.forEach((item, index) => {
      fadeIn(item, sectionArrayRef.current[index]);
    });

    titleArrayRef.current.forEach((item, index) => {
      revealFromLeft(item, sectionArrayRef.current[index]);
    });

    sectionArrayRef.current.forEach((item) => {
      revealFromTop(item);
    });

    console.log("scrolltrigger instances:", ScrollTrigger.getAll());
    let getGroup = ScrollTrigger.getAll();
    console.log(getGroup);
  }, []);

  return (
    <StyledDiv className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {sections.map((section, index) => (
          <div key={index} className="section">
            <div id={`section${index}`} className="section-wrapper" ref={(el) => addToRefArray(el, sectionArrayRef)}>
              <div className="section-inner-wrapper">
                <div className="title-wrapper">
                  {" "}
                  <h1 id={`titulo${index}`} ref={(el) => addToRefArray(el, titleArrayRef)}>
                    {section.title}
                  </h1>
                </div>
                <div>
                  <h4 id={`subtitulo${index}`} ref={(el) => addToRefArray(el, subTitleArrayRef)}>
                    {section.subTitle}
                  </h4>
                </div>
                <FadeInText id={`text-${Math.random(100)}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type s</FadeInText>
              </div>
            </div>
          </div>
        ))}
        <div className="section-wrapper"></div>
      </header>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  & {
    margin-top: 50vh;
    margin-bottom: 50vh;
  }
  .section {
    width: 800px;
    margin: 8rem auto;
    overflow: hidden;
    & .section-inner-wrapper {
      padding: 4rem;
    }
    & .section-wrapper {
      background: #ccc;
      & .title-wrapper {
        overflow: hidden;
      }
    }
  }
`;

export default App;
