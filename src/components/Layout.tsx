import { FC, ReactNode, useEffect, useState } from "react";
import { Flashlight } from "./Flashlight";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [darkness, setDarkness] = useState(1);

  const updateDarkness = () => {
    const isLargeScreen = window.matchMedia("(min-width: 786px)").matches;
    setDarkness(isLargeScreen ? 0.95 : 0.05);
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
        // moveTo={position}
        moveTo={{ x: 0, y: 0 }}
        darkness={darkness}
      >
        <div className="bg-wallpaper h-screen overflow-auto">{children}</div>
      </Flashlight>
    </>
  );
};
