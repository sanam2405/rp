import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Audio, Messages, Carousal } from "./pages";
import { Layout, Leaf, Loader } from "./components";
import { AudioProvider, DarkModeProvider } from "./context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { CSSProperties } from "react";

const backgroundStyle: CSSProperties = {
  position: "relative",
  overflow: "hidden",
};

const backgroundOverlay: CSSProperties = {
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

function App() {
  return (
    <div className="bg-wallpaper" style={backgroundStyle}>
      <div style={backgroundOverlay}></div>

      <DarkModeProvider>
        <AudioProvider>
          <BrowserRouter>
            <Loader />
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Leaf numberOfLeaves={7} leafPath="/thelastleaf.png">
                      <Audio />
                    </Leaf>
                  </Layout>
                }
              />
              <Route
                path="/birthday"
                element={
                  <Layout>
                    <Messages />
                  </Layout>
                }
              />
              <Route
                path="/wish"
                element={
                  <Layout>
                    <Carousal />
                  </Layout>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </AudioProvider>
      </DarkModeProvider>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
