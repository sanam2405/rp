import { FC, ReactNode, useEffect, useState } from "react";
import { Flashlight } from "./Flashlight";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

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
        darkness={0.9}
      >
        <div className="bg-wallpaper h-screen overflow-auto">{children}</div>
      </Flashlight>
    </>
  );
};
