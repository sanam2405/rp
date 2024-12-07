import {
  BokabokaPage,
  ILUPage,
  KigotumiPage,
  LandingPage,
  PrefacePage,
  ReditPage,
  RTermPage,
} from "@/pages";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./globals.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/preface" element={<PrefacePage />} />
        <Route path="/kigotumi" element={<KigotumiPage />} />
        <Route path="/bokaboka" element={<BokabokaPage />} />
        <Route path="/ilu" element={<ILUPage />} />
        <Route path="/rterm" element={<RTermPage />} />
        <Route path="/redit" element={<ReditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
