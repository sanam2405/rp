import { Aura, Layout, backgroundOverlay, backgroundStyle } from "@/components";
import { AudioProvider, DarkModeProvider } from "@/context";
import { Messages } from "@/screens";
import { FC } from "react";
import "../backdrop.css";
import "../globals.css";

export const KigotumiPage: FC = () => {
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
            <Messages />
          </Layout>
        </AudioProvider>
      </DarkModeProvider>
    </div>
  );
};
