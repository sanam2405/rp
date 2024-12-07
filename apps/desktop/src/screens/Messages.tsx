import { Balloons, Spots } from "@/components";
import { MEDIA } from "@/constants";
import { useAudio, useDarkMode } from "@/context";
import gsap from "gsap";
import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Messages: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textBoxCharsRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [bokaopacity, setBokaOpacity] = useState<number>(1);
  const { isPlaying, pause } = useAudio();

  useEffect(() => {
    if (textBoxCharsRef.current) {
      const textBoxChars = textBoxCharsRef.current;
      textBoxChars.innerHTML = `<span> Happy Birthday Rimjhim! </span>`;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          navigate("/bokaboka");
        }, 7000);
      },
    });

    tl.to(containerRef.current, { visibility: "visible" })
      .from(".one", { opacity: 0, y: 10 })
      .from(".two", { opacity: 0, y: 10 }, "-=0.3")
      .to([".one", ".two"], { opacity: 0, y: 10 }, "+=4.25")
      .from(".three", { opacity: 0, y: 10 })
      .to(".three", { opacity: 0, y: 10 }, "+=5.25")
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
        "+=5",
      )
      .from(".idea-2", { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
      .to(
        ".idea-2",
        { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" },
        "+=6",
      )
      .from(".idea-3", { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
      .to(".idea-3 strong", {
        scale: 1.8,
        x: 10,
        backgroundColor: "#ef4444",
        color: "#fff",
      })
      .to(
        ".idea-3",
        { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" },
        "+=4.75",
      )
      .from(".idea-4", { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
      .to(
        ".idea-4",
        { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" },
        "+=4.75",
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
        "+=3.5",
      )
      .to(
        ".idea-5 .smiley",
        {
          rotation: 90,
          x: 8,
          onComplete: () => {
            setBokaOpacity(0);
          },
        },
        "+=0.4",
      )
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
        3.5,
        { opacity: 0.9, y: 1400 },
        { opacity: 1, y: -1000 },
        0.2,
      )
      .from(
        ".rp-dp",
        { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 },
        "-=2",
      )
      .from(".hat", { x: -100, y: 350, rotation: -180, opacity: 0 })
      .staggerFrom(
        ".wish-hbd span",
        1.5,
        {
          opacity: 0,
          y: -50,
          rotation: 150,
          skewX: "30deg",
          ease: "elastic.out(0.6, 0.2)",
        },
        0.75,
      )
      .staggerFromTo(
        ".wish-hbd span",
        1.5,
        { scale: 1.4, rotationY: 150 },
        {
          scale: 1,
          rotationY: 0,
          color: "#ef4444",
          ease: "expoScale(1, 10, expo.out)",
        },
        0.75,
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
        {
          opacity: 0,
          y: -20,
          rotationX: 5,
          skewX: "15deg",
        },
        1.5,
      )
      .to(
        ".last-smile",
        {
          rotation: 90,
          onComplete: () => {
            setBokaOpacity(1);
          },
        },
        "+=2",
      );

    return () => {};
  }, [navigate, isPlaying, pause]);

  return (
    <>
      <div style={{ display: "flex", maxWidth: "100vw", overflowX: "hidden" }}>
        <div
          ref={containerRef}
          className="container"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            minHeight: "100vh",
            overflow: "hidden",
            overflowX: "hidden",
          }}
        >
          <div className="one mt-4">
            <h1
              id="heyRP"
              style={{
                background:
                  "linear-gradient(to bottom, #ff0000 0%, #ef4444 40%, #000000 100%)",
                WebkitBackgroundClip: "text" as const, // 'as const' ensures the value is a string literal
                color: "transparent",
              }}
            >
              {" "}
              Hey RP!{" "}
            </h1>
          </div>
          <div className="two mb-12 mt-2">
            <p className="font-lvs text-5xl" id="rimjhim">
              &#xE069;imjhi&#xE168;
            </p>
          </div>
          <div className="three">
            <p
              className={`text-red-500 hover:text-black font-rwd ${darkMode ? "gradient-text" : ""} `}
              style={{ fontSize: "5rem", fontWeight: "300" }}
            >
              It&apos;s your Birthday ^.^
            </p>
          </div>
          <div className="four">
            <div className="text-box">
              <p className="hbd-chatbox" ref={textBoxCharsRef}>
                <span
                  className={`text-red-500 hover:text-black font-rwd text-5xl ${darkMode ? "gradient-text" : ""}`}
                  style={{ fontSize: "5rem", fontWeight: "300" }}
                >
                  {" "}
                  Happy Birthday Rimjhim!{" "}
                </span>
              </p>
              <p className="fake-btn">Send</p>
            </div>
          </div>
          <div className="five">
            <p
              className={`idea-1 text-red-500 hover:text-black font-rwd ${darkMode ? "gradient-text-long" : ""} `}
              style={{ fontSize: "5rem", fontWeight: "300" }}
            >
              I so wished to speak to you yesterday at the GB
            </p>
            <p
              className={`idea-2 text-red-500 hover:text-black font-rwd ${darkMode ? "gradient-text-long" : ""}`}
              style={{ fontSize: "5rem", fontWeight: "300" }}
            >
              But then I fell down on the floor and stopped XD
            </p>
            <p className="idea-3">
              <span
                className={`text-red-500 hover:text-red-500 font-rwd ${darkMode ? "gradient-text-long" : ""}`}
                style={{ fontSize: "5rem", fontWeight: "300" }}
              >
                {" "}
                Actually, I realized, I wanted to do something{" "}
              </span>
              <br /> <br />
              <strong className="text-red-500"> special</strong>.
            </p>
            <p
              className={`idea-4 text-red-500 hover:text-black font-rwd gradient-text ${darkMode ? "gradient-text" : ""}`}
              style={{ fontSize: "5rem", fontWeight: "300" }}
            >
              Because
            </p>
            <p className="idea-5">
              <span
                className={`text-red-500 hover:text-black font-rwd ${darkMode ? "gradient-text" : ""}`}
                style={{ fontSize: "5rem", fontWeight: "300" }}
              >
                You are Special{" "}
              </span>
              <br />
              <span
                className={`smiley text-red-500 hover:text-black font-rwd ${darkMode ? "gradient-text" : ""}`}
                style={{ fontSize: "5rem", fontWeight: "300" }}
              >
                {" "}
                {"    "} :)
              </span>
            </p>

            <p
              className="idea-6"
              style={{ fontSize: "5rem", fontWeight: "300" }}
            >
              <span
                className={`text-red-500 hover:text-black ${darkMode ? "gradient-lyrics" : ""}`}
              >
                S
              </span>
              <span
                className={`text-red-500 hover:text-black ${darkMode ? "gradient-lyrics" : ""}`}
              >
                O
              </span>
            </p>
          </div>
          <div className="six">
            <img
              src={MEDIA.RP_SKETCH}
              alt=""
              className="rp-dp drop-shadow-xl hover:grayscale-[90%]  hover:brightness-125"
              height={500}
              width={500}
            />
            <img
              src="/hat.svg"
              alt=""
              className="hat"
              width={94}
              height={150}
            />
            <div className="wish">
              <h3 className="wish-hbd">
                <span className="text-red-600"> Happy 21st Birthday! </span>
              </h3>
              <h5 className="text-red-500 hover:text-black">
                <strong> May you always put on this pretty smile :) </strong>
              </h5>
            </div>
          </div>
          <div className="seven">
            <div className="baloons hover:brightness-125">
              <Balloons />
            </div>
          </div>
          <div className="eight">
            <Spots />
          </div>
          <div className="nine">
            <p
              className={`text-red-500 hover:text-black ${darkMode ? "gradient-text-long" : ""}`}
            >
              <strong>
                {" "}
                I hope things turn good between you and me some day{" "}
              </strong>
            </p>
            <p
              id="replay"
              className={`text-red-500 hover:text-black ${darkMode ? "gradient-text-long" : ""}`}
            >
              <strong> Okay, I have something more for you... </strong>
            </p>
            <br />
            <p className="last-smile text-red-500 hover:text-black">
              {" "}
              <strong> :) </strong>{" "}
            </p>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            marginLeft: "33px",
            padding: "1rem",
            width: "100%",
            overflow: "hidden",
            opacity: bokaopacity,
            transition: "opacity 3s ease-in-out",
          }}
        >
          <p
            className="font-lvs text-4xl mt-4 hover: text-red-500"
            style={{
              textAlign: "center",
              opacity: bokaopacity,
              transition: "opacity 3s ease-in-out",
            }}
          >
            &#xE126;&#x0069;&#x0074;&#xE638;&#x0062;&#x006F;&#x006B;&#x0061;&#x0062;&#x006F;&#x006B;&#xE078;
          </p>
        </div>
      </div>
    </>
  );
};
