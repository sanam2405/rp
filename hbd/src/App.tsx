import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Audio } from "./components/Audio";
import { Carousal } from "./components/Carousal";
import { Messages } from "./components/Messages";
import { AudioProvider } from "./context";

function App() {
  return (
    <>
      {/* <Audio /> */}
      {/* <Carousal/> */}
      {/* <Messages /> */}
      <AudioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Audio />} />
            <Route path="/birthday" element={<Messages />} />
            <Route path="/wish" element={<Carousal />} />
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </>
  );
}

export default App;
