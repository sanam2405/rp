import { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import { Balloons } from "./Balloons";
import { Spots } from "./Spots";
import { useNavigate } from "react-router-dom";
export const Messages: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textBoxCharsRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (textBoxCharsRef.current) {
      const textBoxChars = textBoxCharsRef.current;
      textBoxChars.innerHTML = `<span> Happy Birthday Rimjhim! </span>`;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          navigate("/wish");
        }, 7000);
      },
    });

    tl.to(containerRef.current, { visibility: "visible" })
      .from(".one", { opacity: 0, y: 10 })
      .from(".two", { opacity: 0, y: 10 }, "-=0.3")
      .to([".one", ".two"], { opacity: 0, y: 10 }, "+=2.8")
      .from(".three", { opacity: 0, y: 10 })
      .to(".three", { opacity: 0, y: 10 }, "+=3")
      .from(".four", {
        visibility: "hidden",
        duration: 0.1,
        scale: 0,
        opacity: 0,
      })
      .from(".fake-btn", {
        visibility: "hidden",
        duration: 0.1,
        scale: 0,
        opacity: 0,
      })
      .to(".hbd-chatbox span", {
        visibility: "hidden",
        stagger: 0.05,
        duration: 0.1,
      })
      .to(".fake-btn", {
        visibility: "hidden",
        backgroundColor: "rgb(127, 206, 248)",
        duration: 0.1,
      })
      .to(
        ".four",
        { visibility: "hidden", opacity: 0, duration: 0.01 },
        "-=0.3",
      )
      .to(
        ".four",
        { visibility: "hidden", scale: 0.2, y: -150, duration: 0.001 },
        "+=0.1",
      )
      .to(
        ".four",
        {
          visibility: "hidden",
          scale: 0.2,
          opacity: 0,
          y: -150,
          duration: 0.3,
        },
        "+=0.1",
      )
      .from(".idea-1", { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
      .to(
        ".idea-1",
        { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" },
        "+=4",
      )
      .from(".idea-2", { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
      .to(
        ".idea-2",
        { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" },
        "+=5",
      )
      .from(".idea-3", { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
      .to(".idea-3 strong", {
        scale: 1.8,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff",
      })
      .to(
        ".idea-3",
        { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" },
        "+=2.5",
      )
      .from(".idea-4", { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
      .to(
        ".idea-4",
        { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" },
        "+=2.5",
      )
      .from(
        ".idea-5",
        {
          rotationX: 15,
          rotationZ: -10,
          skewY: "-5deg",
          y: 50,
          z: 10,
          opacity: 0,
        },
        "+=1.5",
      )
      .to(".idea-5 .smiley", { rotation: 90, x: 8 }, "+=0.4")
      .to(".idea-5", { scale: 0.2, opacity: 0 }, "+=2")
      .staggerFrom(
        ".idea-6 span",
        0.8,
        {
          scale: 3,
          opacity: 0,
          rotation: 15,
          ease: "expoScale(1, 10, expo.out)",
        },
        0.2,
      )
      .staggerTo(
        ".idea-6 span",
        0.8,
        {
          scale: 3,
          opacity: 0,
          rotation: -15,
          ease: "expoScale(1, 10, expo.out)",
        },
        0.2,
      )
      .staggerFromTo(
        ".baloons img",
        2.5,
        { opacity: 0.9, y: 1400 },
        { opacity: 1, y: -1000 },
        0.2,
      )
      .from(
        ".lydia-dp",
        { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 },
        "-=2",
      )
      .from(".hat", { x: -100, y: 350, rotation: -180, opacity: 0 })
      .staggerFrom(
        ".wish-hbd span",
        0.7,
        {
          opacity: 0,
          y: -50,
          rotation: 150,
          skewX: "30deg",
          ease: "elastic.out(0.6, 0.2)",
        },
        0.1,
      )
      .staggerFromTo(
        ".wish-hbd span",
        0.7,
        { scale: 1.4, rotationY: 150 },
        {
          scale: 1,
          rotationY: 0,
          color: "#ff69b4",
          ease: "expoScale(1, 10, expo.out)",
        },
        0.1,
      )
      .from(".wish h5", { opacity: 0, y: 10, skewX: "-15deg" }, "party")
      .staggerTo(
        ".eight svg",
        1.5,
        {
          visibility: "visible",
          opacity: 0,
          scale: 80,
          repeat: 3,
          repeatDelay: 1.4,
        },
        0.3,
      )
      .to(".six", { opacity: 0, y: 30, zIndex: "-1" })
      .staggerFrom(
        ".nine p",
        1,
        { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" },
        1.2,
      )
      .to(".last-smile", { rotation: 90 }, "+=2");

    return () => {};
  }, []);

  return (
    <div ref={containerRef} className="container">
      <div className="one">
        <h1> Hey RP! </h1>
      </div>
      <div className="two">
        <p data-node-name="greetingText">Rimjhim, Roheena</p>
      </div>
      <div className="three">
        <p data-node-name="text1">It's your Birthday! :D</p>
      </div>
      <div className="four">
        <div className="text-box">
          <p className="hbd-chatbox" ref={textBoxCharsRef}>
            <span> Happy Birthday Rimjhim! </span>
          </p>
          <p className="fake-btn">Send</p>
        </div>
      </div>
      <div className="five">
        <p className="idea-1">
          I so wished to speak to you yesterday at the GB
        </p>
        <p className="idea-2">
          But then I fell down on the floor and stopped XD
        </p>
        <p className="idea-3">
          <span> Actually, I realised, I wanted to do something </span>
          <br />
          <strong> special</strong>.
        </p>
        <p className="idea-4">Because</p>
        <p className="idea-5">
          <span>You are Special </span>
          <br />
          <span className="smiley"> {"    "} :)</span>
        </p>
        <p className="idea-6">
          <span>S</span>
          <span>O</span>
        </p>
      </div>
      <div className="six">
        <img src="/rpdp.png" alt="" className="lydia-dp" />
        <img src="/hat.svg" alt="" className="hat" />
        <div className="wish">
          <h3 className="wish-hbd">
            <span> Happy 21st Birthday! </span>
          </h3>
          <h5>May you always put on this pretty smile :)</h5>
        </div>
      </div>
      <div className="seven">
        <div className="baloons">
          <Balloons />
        </div>
      </div>
      <div className="eight">
        <Spots />
      </div>
      <div className="nine">
        <p>I hope things turn good between you and me some day</p>
        <p id="replay">Okay, I have something more for you...</p>
        <p className="last-smile"> :) </p>
      </div>
    </div>
  );
};
