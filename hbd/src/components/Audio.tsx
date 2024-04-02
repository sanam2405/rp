import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { LYRICS } from "../constants";

interface AudioProps {
  play: () => void;
}

export const Audio: FC<AudioProps> = ({ play }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstLoopCompleted, setFirstLoopCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showSanamButton, setShowSanamButton] = useState(true); // Tracks if "Built by Sanam" button should be shown
  const [showMusicButton, setShowMusicButton] = useState(false); // Tracks if music button should be shown
  const navigate = useNavigate();

  useEffect(() => {
    let wakeLock: any;

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
    play(); // Start playing the audio
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
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          {showSanamButton && (
            <Button
              variant="outlined"
              color="error"
              endIcon={<FavoriteBorderIcon />}
              onClick={handleSanamClick}
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
            >
              Music
            </Button>
          )}
          {isVisible && !firstLoopCompleted && (
            <p key={currentLineIndex} className="tiro-bangla-regular">
              {LYRICS[currentLineIndex]}
            </p>
          )}
        </Box>
      </Container>
    </>
  );
};
