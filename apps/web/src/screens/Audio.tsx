"use client";

import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { useAudio, useDarkMode } from "@/context";
import { INTRO, LYRICS } from "@rp/constants";
import { motion } from "framer-motion";
import { usePostHog } from "posthog-js/react";

export const Audio: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIntroCompleted, setIsIntroCompleted] = useState(false);
  const [firstLoopCompleted, setFirstLoopCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentIntroLineIndex, setCurrentIntroLineIndex] = useState(0);
  const [showSanamButton, setShowSanamButton] = useState(false); // Tracks if "Built by Sanam" button should be shown
  const [sanamAnimation, setSanamAnimation] = useState("animate-pulse z-50"); // Tracks the animation of the Sanam button
  const [showMusicButton, setShowMusicButton] = useState(false); // Tracks if music button should be shown
  const [musicAnimation, setMusicAnimation] = useState("animate-pulse z-50"); // Tracks the animation of the Music button
  const [monologueOne, setMonologueOne] = useState(false);
  const [monologueTwo, setMonologueTwo] = useState(false);
  const navigate = useRouter();
  const { play, isPlaying } = useAudio();
  const { darkMode } = useDarkMode();
  const posthog = usePostHog();
  const sanamText = "End of Beginning. Let's Restart ?".split(" ");
  const musicText = "Some Music ?".split(" ");

  useEffect(() => {
    let wakeLock: WakeLockSentinel | null;

    const requestWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake lock activated");
      } catch (error) {
        console.error("Failed to activate wake lock:", error);
      }
    };

    const releaseWakeLock = () => {
      if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
        console.log("Wake lock released");
      }
    };

    if (!isIntroCompleted) {
      requestWakeLock();
      const intervals = [5441, 1729, 1729, 1729, 1729];
      const currentInterval =
        intervals[currentIntroLineIndex % intervals.length];
      const interval = setInterval(() => {
        setCurrentIntroLineIndex((prevIndex) => {
          if ((prevIndex + 1) % INTRO.length === 0) {
            setIsIntroCompleted(true);
            setShowSanamButton(true);
          }
          return (prevIndex + 1) % INTRO.length;
        });
      }, currentInterval); // intro beat duration

      return () => {
        clearInterval(interval);
        releaseWakeLock();
      };
    }

    if (isVisible && !firstLoopCompleted) {
      requestWakeLock();

      const interval = setInterval(() => {
        setCurrentLineIndex((prevIndex) => {
          if ((prevIndex + 1) % LYRICS.length === 0) {
            setFirstLoopCompleted(true);
            posthog.capture("landing.music_loop_completed");
            navigate.push("/kigotumi");
          }
          return (prevIndex + 1) % LYRICS.length;
        });
      }, 5000); // beat duration

      return () => {
        clearInterval(interval);
        releaseWakeLock();
      };
    }

    return () => {
      releaseWakeLock();
    };
  }, [isVisible, isIntroCompleted, firstLoopCompleted, navigate]);

  const handleSanamClick = () => {
    setShowSanamButton(false);
    setMonologueOne(true);
    posthog.capture("landing.button_clicked", {
      buttonName: "sanamButtom",
    });

    setTimeout(() => {
      setMonologueOne(false);
      setShowMusicButton(true);
    }, 3000);
  };

  const handleMusicClick = () => {
    setShowMusicButton(false);
    setMonologueTwo(true);

    setTimeout(() => {
      setMonologueTwo(false);
      setIsVisible(true);
      if (!isPlaying) {
        play();
      }
    }, 3000);

    posthog.capture("landing.button_clicked", {
      buttonName: "musicButton",
    });
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          component="div"
          sx={{
            textAlign: "center",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!isIntroCompleted && (
            <p
              key={currentIntroLineIndex}
              className={`tiro-bangla-regular text-red-500 hover:text-black transition-all duration-1500 ease-in-out opacity-100 ${currentIntroLineIndex !== 0 && darkMode ? "gradient-lyrics opacity-0" : "opacity-100"}`}
            >
              {INTRO[currentIntroLineIndex]}
            </p>
          )}
          {isIntroCompleted && showSanamButton && (
            <Button
              id="sanamButton"
              variant="contained"
              color="error"
              endIcon={<FavoriteTwoToneIcon />}
              onClick={handleSanamClick}
              className={`${sanamAnimation} hover:scale-110 transition-transform duration-200`}
            >
              {sanamText.map((el, i) => (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i / 5 }}
                  key={i}
                  className="mr-1"
                >
                  <i>{el}</i>
                </motion.button>
              ))}
            </Button>
          )}
          {monologueOne && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className=" tiro-bangla-regular text-red-500 text-2xl"
            >
              <i>তোমাকেই ভালবাসবো ভেবেছি শত যুদ্ধের শেষে</i>
            </motion.div>
          )}
          {showMusicButton && (
            <Button
              id="musicButton"
              variant="contained"
              endIcon={<PlayCircleOutlineOutlinedIcon />}
              onClick={handleMusicClick}
              className={`${musicAnimation} hover:scale-110 transition-transform duration-200 text-white`}
              sx={{ marginBottom: "1rem" }}
            >
              {musicText.map((el, i) => (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i / 5 }}
                  key={i}
                  className="mr-1"
                >
                  <i>{el}</i>
                </motion.button>
              ))}
            </Button>
          )}
          {monologueTwo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="tiro-bangla-regular text-blue-500 text-2xl"
            >
              <i>পলাতকা প্লাবনের পরী প্রণয়নী</i>
            </motion.div>
          )}
          {isVisible && !firstLoopCompleted && (
            <p
              key={currentLineIndex}
              className={`tiro-bangla-regular text-red-500 hover:text-black ${currentLineIndex !== 0 && darkMode ? "gradient-lyrics" : ""}`}
            >
              {LYRICS[currentLineIndex]}
            </p>
          )}
        </Box>
        <Box
          component="div"
          sx={{
            position: "fixed",
            bottom: "0px",
            left: "50%",
            marginLeft: "33px",
            transform: "translateX(-50%)",
          }}
        >
          <p
            className="font-lvs text-4xl mb-4 text-red-500 hover:text-black hover: cursor-pointer"
            onClick={() => {
              showMusicButton
                ? setMusicAnimation("animate-bounce")
                : setSanamAnimation("animate-bounce");
            }}
          >
            {" "}
            {/* withlovebokaboka */}
            &#xE126;&#x0069;&#x0074;&#xE638;&#x0062;&#x006F;&#x006B;&#x0061;&#x0062;&#x006F;&#x006B;&#xE078;{" "}
          </p>
        </Box>
      </Container>
    </>
  );
};
