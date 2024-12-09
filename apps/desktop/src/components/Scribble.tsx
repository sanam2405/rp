import { initializeDoubleTapListener } from "@/lib";
import { FC, useEffect } from "react";

export const Scribble: FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeDoubleTapListener(500);
      try {
        window.addEventListener("doubletap", (event: any) => {
          alert("Double tapped");
          console.log(event);
        });
      } catch {
        console.log("Unable to capture the Double tap event.");
      }
    }
  }, []);
  return <div></div>;
};
