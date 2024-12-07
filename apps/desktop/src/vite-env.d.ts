/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_WS_BACKEND_URI: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
