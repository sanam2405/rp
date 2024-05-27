import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { LYRICS } from "../constants";
import { useAudio } from "../context";

export const Audio: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstLoopCompleted, setFirstLoopCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showSanamButton, setShowSanamButton] = useState(true); // Tracks if "Built by Sanam" button should be shown
  const [sanamAnimation, setSanamAnimation] = useState("animate-pulse z-50"); // Tracks the animation of the Sanam button
  const [showMusicButton, setShowMusicButton] = useState(false); // Tracks if music button should be shown
  const [musicAnimation, setMusicAnimation] = useState("animate-pulse z-50"); // Tracks the animation of the Music button
  const navigate = useNavigate();
  const { play, isPlaying } = useAudio();

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

    if (isVisible && !firstLoopCompleted) {
      requestWakeLock();

      const interval = setInterval(() => {
        setCurrentLineIndex((prevIndex) => {
          if ((prevIndex + 1) % LYRICS.length === 0) {
            setFirstLoopCompleted(true);
            navigate("/birthday");
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
  }, [isVisible, firstLoopCompleted, navigate]);

  const handleSanamClick = () => {
    setShowSanamButton(false); // Hide Sanam button
    setShowMusicButton(true); // Show music button
  };

  const handleMusicClick = () => {
    if (!isPlaying) {
      play(); // Start playing the audio
    }
    setIsVisible(true); // Show the lyrics
    setShowMusicButton(false); // Hide the music button
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
          sx={{
            textAlign: "center",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center horizontally
          }}
        >
          {showSanamButton && (
            <Button
              variant="outlined"
              color="error"
              endIcon={<FavoriteBorderIcon />}
              onClick={handleSanamClick}
              className={sanamAnimation}
            >
              Built by Sanam
            </Button>
          )}
          {showMusicButton && (
            <Button
              variant="outlined"
              endIcon={<PlayCircleOutlineOutlinedIcon />}
              onClick={handleMusicClick}
              sx={{ marginBottom: "1rem" }}
              className={musicAnimation}
            >
              Music
            </Button>
          )}
          {isVisible && !firstLoopCompleted && (
            <p
              key={currentLineIndex}
              className="tiro-bangla-regular text-red-500 hover:text-black"
            >
              {LYRICS[currentLineIndex]}
            </p>
          )}
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            left: "58%",
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
