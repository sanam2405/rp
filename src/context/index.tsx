import {
  ReactNode,
  createContext,
  FC,
  useContext,
  useState,
  SetStateAction,
} from "react";
import useSound from "use-sound";
import { DARK_SCREEN, MUSIC } from "../constants";

interface AudioContextType {
  play: () => void;
  stopPlay: () => void;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(MUSIC.SANAM, {
    loop: true,
    preload: true,
    html5: true,
  });

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopPlaying = () => {
    stop();
    setIsPlaying(false);
  };

  const audioContextValue: AudioContextType = {
    play: togglePlay,
    stopPlay: stopPlaying,
    isPlaying: isPlaying,
  };

  return (
    <AudioContext.Provider value={audioContextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

interface DarkModeContextType {
  darkness: number;
  setDarkness: React.Dispatch<SetStateAction<number>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

export const DarkModeProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(true); // initial dark mode
  const [darkness, setDarkness] = useState(DARK_SCREEN); // initial darkness

  const contextValue: DarkModeContextType = {
    darkness,
    setDarkness,
    darkMode,
    setDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
