import { RPSidebar } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  BokabokaPage,
  EpiloguePage,
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
    <SidebarProvider defaultOpen={false}>
      <div className="relative min-h-screen w-full">
        <div className="fixed inset-0">
          <Router>
            <div className="absolute inset-0 z-[100] pointer-events-none">
              <div className="pointer-events-auto">
                <RPSidebar />
              </div>
            </div>
            <main className="relative w-full h-full">
              <div className="z-[90] relative">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/preface" element={<PrefacePage />} />
                  <Route path="/kigotumi" element={<KigotumiPage />} />
                  <Route path="/bokaboka" element={<BokabokaPage />} />
                  <Route path="/ilu" element={<ILUPage />} />
                  <Route path="/rterm" element={<RTermPage />} />
                  <Route path="/redit" element={<ReditPage />} />
                  <Route path="/epilogue" element={<EpiloguePage />} />
                </Routes>
              </div>
            </main>
          </Router>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
