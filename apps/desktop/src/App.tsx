import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./backdrop.css";
import { Aura, Layout } from "./components";
import { AudioProvider, DarkModeProvider } from "./context";

// const Landing = lazy(() => import("./screens/Landing"));

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AudioProvider>
          <div className="bg-wallpaper animate-fade-in min-h-screen">
            <Layout>
              <div className="w-full absolute inset-0 h-screen">
                <Aura
                  id="tsparticlesfullpage"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
              </div>
            </Layout>
          </div>
        </AudioProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;
