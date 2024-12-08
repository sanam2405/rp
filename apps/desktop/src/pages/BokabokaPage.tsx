import {
  Aura,
  Layout,
  Leaf,
  backgroundOverlay,
  backgroundStyle,
} from "@/components";
import { AudioProvider, DarkModeProvider } from "@/context";
import { Carousal } from "@/screens";
import { FC } from "react";

export const BokabokaPage: FC = () => {
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
            <Leaf numberOfLeaves={7} leafPath="/thelastleaf.png">
              <Carousal />
            </Leaf>
          </Layout>
        </AudioProvider>
      </DarkModeProvider>
    </div>
  );
};
