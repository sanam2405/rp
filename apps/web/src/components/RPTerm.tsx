"use client";

import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";
const term = new Terminal();

export const RPTerminal = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    term.open(terminalRef.current);
    term.write("\x1B[1;3;31mrimjhim@sanam\x1B[0m $ 1 4 3 ");
  }, [terminalRef]);

  return <div ref={terminalRef} className="w-full h-full p-0 m-0"></div>;
};
