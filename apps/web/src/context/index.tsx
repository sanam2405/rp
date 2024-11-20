"use client";

import { DARK_SCREEN, MUSIC } from "@rp/constants";
import {
  createContext,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// global audio state
const globalAudioState = {
  isPlaying: false,
};

interface AudioContextType {
  play: () => void;
  pause: () => void;
  resume: () => void;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// singleton audio instance
const audioElement =
  typeof window !== "undefined" ? new Audio(MUSIC.SANAM) : null;
if (audioElement) {
  audioElement.loop = true;
}

export const AudioProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // global state to sync with local state
  const [isPlaying, setIsPlaying] = useState(globalAudioState.isPlaying);

  // sync local state with global state
  useEffect(() => {
    globalAudioState.isPlaying = isPlaying;
  }, [isPlaying]);

  // sync with global state on mount
  useEffect(() => {
    setIsPlaying(globalAudioState.isPlaying);

    // if it was playing before, resume it
    if (globalAudioState.isPlaying && audioElement) {
      audioElement.play();
    }
  }, []);

  const play = () => {
    if (audioElement && !globalAudioState.isPlaying) {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioElement && globalAudioState.isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (audioElement && !globalAudioState.isPlaying) {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const audioContextValue: AudioContextType = {
    play,
    pause,
    resume,
    isPlaying,
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
