/* eslint-disable */
"use client";

import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";

export const RPTerminal = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const ws = new WebSocket("ws://localhost:5005");

  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import("@xterm/xterm");
      const { FitAddon } = await import("@xterm/addon-fit");

      const term = new Terminal();
      const fitAddon = new FitAddon();

      if (!terminalRef.current) return;
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();
      term.write("\x1B[1;3;31mrimjhim@sanam\x1B[0m $ 1 4 3 ");

      // handles WebSocket messages
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "data") {
          term.write(data.data);
        }
      };

      // handles terminal key events
      term.onKey((e) => {
        ws.send(
          JSON.stringify({
            type: "command",
            data: e.key,
          }),
        );
      });
    };

    initTerminal();

    return () => {
      ws.close();
    };
  }, []);

  return <div ref={terminalRef} className="w-full h-full p-0 m-0"></div>;
};
