import { ReactNode, createContext, FC, useContext, useState } from "react";
import useSound from "use-sound";
import polatoka from "/polatoka.mp3";

interface AudioContextType {
  play: () => void;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(polatoka, { loop: true });

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  const audioContextValue: AudioContextType = {
    play: togglePlay,
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
