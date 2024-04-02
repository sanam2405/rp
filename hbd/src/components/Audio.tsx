import { FC } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { LYRICS } from "../constants";
// import { Carousal } from "./Carousal";

interface AudioProps {
  play: () => void;
}

export const Audio: FC<AudioProps> = ({ play }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [firstLoopCompleted, setFirstLoopCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isVisible && !firstLoopCompleted) {
      const interval = setInterval(() => {
        setCurrentLineIndex((prevIndex) => {
          if ((prevIndex + 1) % LYRICS.length === 0) {
            setFirstLoopCompleted(true);
            navigate("/wish");
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
    </>
  );
};
