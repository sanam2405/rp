import { Aura, Layout, RPTerminal } from "@/components";
import { AudioProvider, DarkModeProvider } from "@/context";
import { FC } from "react";
import "../globals.css";

export const RTermPage: FC = () => {
  return (
    <>
      <DarkModeProvider>
        <AudioProvider>
          <Layout>
            <div className="w-full absolute inset-0 h-screen z-50 pointer-events-none">
              <Aura
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full pointer-events-none"
                particleColor="#FFFFFF"
              />
            </div>

            <div className="flex w-screen h-screen p-0 m-0">
              <RPTerminal />
            </div>
          </Layout>
        </AudioProvider>
      </DarkModeProvider>
    </>
  );
};
