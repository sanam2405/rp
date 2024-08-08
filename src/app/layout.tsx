import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AudioProvider, DarkModeProvider } from "./context";
import { Layout, Loader } from "./components";
import { CSSProperties } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HBD • Rimjhim",
  description: "with ❤️ for love by sanam",
};

const backgroundStyle: CSSProperties = {
  position: "relative",
  overflow: "hidden",
};

const backgroundOverlay: CSSProperties = {
  content: "",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/wordcloud.png')",
  backgroundSize: "cover",
  backgroundRepeat: "repeat-x repeat-y",
  backgroundPosition: "center top",
  zIndex: -1,
  opacity: 0.15,
  filter: "grayscale(100%) contrast(150%)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-wallpaper" style={backgroundStyle}>
          <div style={backgroundOverlay}></div>

          <DarkModeProvider>
            <AudioProvider>
              <Loader />
              <Layout>{children}</Layout>
            </AudioProvider>
          </DarkModeProvider>
        </div>
      </body>
    </html>
  );
}
