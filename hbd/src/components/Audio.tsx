import { FC } from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import polatoka from "/polatoka.mp3";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { LYRICS } from "../constants";
// import { Carousal } from "./Carousal";

export const Audio: FC = () => {
  const [play] = useSound(polatoka, { loop: true });
  const [isVisible, setIsVisible] = useState(true);
  const [firstLoopCompleted, setFirstLoopCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (!isVisible && !firstLoopCompleted) {
      const interval = setInterval(() => {
        setCurrentLineIndex((prevIndex) => {
          if ((prevIndex + 1) % LYRICS.length === 0) {
            setFirstLoopCompleted(true);
          }
          return (prevIndex + 1) % LYRICS.length;
        });
      }, 5000); // beat duration

      return () => {
        clearInterval(interval);
      };
    }
  }, [isVisible, firstLoopCompleted]);

  const handleClick = () => {
    play();
    setIsVisible(false);
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
          {isVisible && (
            <Button
              variant="outlined"
              endIcon={<PlayCircleOutlineOutlinedIcon />}
              onClick={handleClick}
              sx={{ marginBottom: "1rem" }}
            >
              Music
            </Button>
          )}

          {/* display the current line of lyrics if music is playing */}
          {!isVisible && !firstLoopCompleted && (
            <p key={currentLineIndex} className="tiro-bangla-regular">
              {LYRICS[currentLineIndex]}
            </p>
          )}
        </Box>
      </Container>

      {/* {
            !isVisible && firstLoopCompleted && <Carousal/>
          } */}
    </>
  );
};
