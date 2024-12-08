import { CSSProperties } from "react";

export const backgroundStyle: CSSProperties = {
  position: "relative",
  overflow: "hidden",
};

export const backgroundOverlay: CSSProperties = {
  content: "",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/wordcloud.png')",
  backgroundSize: "cover",
  backgroundRepeat: "repeat-x repeat-y",
  backgroundPosition: "center top",
  zIndex: -1,
  opacity: 0.15,
  filter: "grayscale(100%) contrast(150%)",
};
