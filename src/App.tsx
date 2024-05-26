import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Audio, Messages, Carousal } from "./pages";
import { Layout } from "./components";
import { AudioProvider } from "./context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
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
          </Routes>
        </BrowserRouter>
      </AudioProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
