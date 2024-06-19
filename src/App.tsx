import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Audio, Messages, Carousal } from "./pages";
import { Layout } from "./components";
import { AudioProvider, DarkModeProvider } from "./context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <DarkModeProvider>
        <AudioProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    {" "}
                    <Audio />{" "}
                  </Layout>
                }
              />
              <Route
                path="/birthday"
                element={
                  <Layout>
                    {" "}
                    <Messages />{" "}
                  </Layout>
                }
              />
              <Route
                path="/wish"
                element={
                  <Layout>
                    {" "}
                    <Carousal />{" "}
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
    </>
  );
}

export default App;
