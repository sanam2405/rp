import { CUSTOM_PROMPT } from "@/constants";
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from "react";

interface ITheme {
  /** The default foreground color */
  foreground?: string;
  /** The default background color */
  background?: string;
  /** The cursor color */
  cursor?: string;
  /** The accent color of the cursor (fg color for a block cursor) */
  cursorAccent?: string;
  /** The selection background color (can be transparent) */
  selectionBackground?: string;
  /** The selection foreground color */
  selectionForeground?: string;
  /**
   * The selection background color when the terminal does not have focus (can
   * be transparent)
   */
  selectionInactiveBackground?: string;
  /**
   * The scrollbar slider background color. Defaults to
   * {@link ITerminalOptions.foreground foreground} with 20% opacity.
   */
  scrollbarSliderBackground?: string;
  /**
   * The scrollbar slider background color when hovered. Defaults to
   * {@link ITerminalOptions.foreground foreground} with 40% opacity.
   */
  scrollbarSliderHoverBackground?: string;
  /**
   * The scrollbar slider background color when clicked. Defaults to
   * {@link ITerminalOptions.foreground foreground} with 50% opacity.
   */
  scrollbarSliderActiveBackground?: string;
  /**
   * The border color of the overview ruler. This visually separates the
   * terminal from the scroll bar when {@link IOverviewRulerOptions.width} is
   * set. When this is not set it defaults to black (`#000000`).
   */
  overviewRulerBorder?: string;
  /** ANSI black (eg. `\x1b[30m`) */
  black?: string;
  /** ANSI red (eg. `\x1b[31m`) */
  red?: string;
  /** ANSI green (eg. `\x1b[32m`) */
  green?: string;
  /** ANSI yellow (eg. `\x1b[33m`) */
  yellow?: string;
  /** ANSI blue (eg. `\x1b[34m`) */
  blue?: string;
  /** ANSI magenta (eg. `\x1b[35m`) */
  magenta?: string;
  /** ANSI cyan (eg. `\x1b[36m`) */
  cyan?: string;
  /** ANSI white (eg. `\x1b[37m`) */
  white?: string;
  /** ANSI bright black (eg. `\x1b[1;30m`) */
  brightBlack?: string;
  /** ANSI bright red (eg. `\x1b[1;31m`) */
  brightRed?: string;
  /** ANSI bright green (eg. `\x1b[1;32m`) */
  brightGreen?: string;
  /** ANSI bright yellow (eg. `\x1b[1;33m`) */
  brightYellow?: string;
  /** ANSI bright blue (eg. `\x1b[1;34m`) */
  brightBlue?: string;
  /** ANSI bright magenta (eg. `\x1b[1;35m`) */
  brightMagenta?: string;
  /** ANSI bright cyan (eg. `\x1b[1;36m`) */
  brightCyan?: string;
  /** ANSI bright white (eg. `\x1b[1;37m`) */
  brightWhite?: string;
  /** ANSI extended colors (16-255) */
  extendedAnsi?: string[];
}

const rpTheme: ITheme = {
  foreground: "#00ff00", // green
  background: "#000000", // black
  cursor: "#ff0000", // red
  selectionBackground: "#ff0000", // red
};

export const RPTerminal = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  let ws: WebSocket | null = null;
  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import("@xterm/xterm");
      const { FitAddon } = await import("@xterm/addon-fit");
      const { ClipboardAddon } = await import("@xterm/addon-clipboard");

      const term = new Terminal({
        cursorBlink: true,
        cursorStyle: "bar",
        cursorInactiveStyle: "bar",
        macOptionIsMeta: true,
        theme: rpTheme,
      });
      const fitAddon = new FitAddon();
      const clipboardAddon = new ClipboardAddon();

      if (!terminalRef.current) return;
      term.loadAddon(fitAddon);
      term.loadAddon(clipboardAddon);
      term.open(terminalRef.current);
      fitAddon.fit();

      term.write(CUSTOM_PROMPT);
      try {
        if (!import.meta.env.VITE_PUBLIC_WS_BACKEND_URI) return;
        ws = new WebSocket(import.meta.env.VITE_PUBLIC_WS_BACKEND_URI);

        // handles WebSocket messages
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === "data") {
            term.write(data.data);
          }
        };

        // handles terminal key events
        term.onKey((e) => {
          ws?.send(
            JSON.stringify({
              type: "command",
              data: e.key,
            }),
          );
        });
      } catch (error) {
        console.error("WebSocket connection failed:", error);
        term.write(
          `\r\n ${CUSTOM_PROMPT} WebSocket connection failed. You can still explore the RPTerminal.`,
        );
      }
    };

    initTerminal();

    return () => {
      ws?.close();
    };
  }, []);

  return <div ref={terminalRef} className="w-full h-full p-0 m-0"></div>;
};
