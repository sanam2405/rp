import "./App.css";
import useSound from "use-sound";
import polatoka from "/polatoka.mp3";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Audio } from "./components/Audio";
import { Carousal } from "./components/Carousal";

function App() {
  const [play] = useSound(polatoka, { loop: true });

  return (
    <>
      {/* <Audio /> */}
      {/* <Carousal/> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Audio play={play} />} />
          <Route path="/wish" element={<Carousal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
