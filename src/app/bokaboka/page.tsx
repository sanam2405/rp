import type { Metadata } from "next";
import { Leaf } from "@/components";
import { Carousal } from "@/screens";

export const metadata: Metadata = {
  title: "HBD • Rimjhim",
  description: "with ❤️ for love by sanam",
  generator: "Next.js",
  applicationName: "rp",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "GSAP",
    "Howler",
    "Swiper",
    "Birthday",
    "UI",
    "UX",
    "Love",
    "Memoir",
  ],
  authors: [
    { name: "Manas Pratim Biswas", url: "https://manaspratimbiswas.com" },
  ],
  creator: "Manas Pratim Biswas",
  publisher: "Manas Pratim Biswas",

  openGraph: {
    title: "HBD • Rimjhim",
    description: "with ❤️ for love by sanam",
    url: "https://rimjhim.manaspratimbiswas.com",
    siteName: "Rimjhim",
    images: [
      {
        url: "https://raw.githubusercontent.com/sanam2405/sanam2405/main/assets/images/rimjhim/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://raw.githubusercontent.com/sanam2405/sanam2405/main/assets/images/rimjhim/opengraph-image.jpg",
        width: 1800,
        height: 1600,
        alt: "Rimjhim",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rimjhim",
    description: "with ❤️ for love by sanam",
    creator: "@sanam2405",
    images: {
      url: "https://raw.githubusercontent.com/sanam2405/sanam2405/main/assets/images/rimjhim/opengraph-image.jpg",
      alt: "Rimjhim",
    },
  },

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function KigoTumi() {
  return (
    <>
      <Leaf numberOfLeaves={7} leafPath="/thelastleaf.png">
        <Carousal />
      </Leaf>
    </>
  );
}
