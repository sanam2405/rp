import { FC, ReactNode, useEffect, useState } from "react";
import { Flashlight } from "./Flashlight";
import { useDarkMode } from "../context";
import { DARK_SCREEN, LIGHT_SCREEN } from "../constants";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const { darkness, setDarkness, setDarkMode } = useDarkMode();

  const updateDarkness = () => {
    const isLargeScreen = window.matchMedia("(min-width: 786px)").matches;
    if (isLargeScreen) {
      setDarkness(DARK_SCREEN);
      setDarkMode(true);
    } else {
      setDarkness(LIGHT_SCREEN);
      setDarkMode(false);
    }
  };

  useEffect(() => {
    updateDarkness();
    window.addEventListener("resize", updateDarkness);
    return () => window.removeEventListener("resize", updateDarkness);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Flashlight
        enableMouse={false}
        showCursor={true}
        initialPosition={position}
        moveTo={position}
        darkness={darkness}
      >
        <div className="bg-wallpaper h-screen overflow-auto">{children}</div>
      </Flashlight>
    </>
  );
};
