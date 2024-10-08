// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@rp/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [sharedConfig],
};

export default config;
