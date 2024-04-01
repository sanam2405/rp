import useSound from 'use-sound';
import mozart from '/mozart.mp3';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState} from "react"

export const Audio = () => {
    
 const [play, { stop }] = useSound(mozart, { loop: true });
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    if (isVisible) {
      play();
    } else {
      stop();
    }
    setIsVisible(!isVisible);
  };
return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          {isVisible && (
            <Button
              variant="outlined"
              endIcon={<PlayCircleOutlineOutlinedIcon />}
              onClick={handleClick}
              sx={{ marginBottom: '1rem' }}
            >
              Music
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
};
