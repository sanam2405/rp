import { Aura, backgroundOverlay, backgroundStyle, Layout } from "@/components";
import { AudioProvider, DarkModeProvider } from "@/context";
// import { Landing } from "@/screens";
import { FC } from "react";
import "../backdrop.css";
import "../globals.css";

export const LandingPage: FC = () => {
  return (
    <div className="bg-wallpaper animate-fade-in" style={backgroundStyle}>
      <div style={backgroundOverlay}></div>
      <DarkModeProvider>
        <AudioProvider>
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
            {/* <Landing /> */}
          </Layout>
        </AudioProvider>
      </DarkModeProvider>
    </div>
  );
};
