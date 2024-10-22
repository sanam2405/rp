import http from "node:http";
import { WebSocketServer } from "ws";
import { spawn } from "node-pty";
import { createServer } from "./server";
import { CUSTOM_PROMPT } from "@rp/constants";

const port = process.env.PORT || 5005;
const app = createServer();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  const ptyProcess = spawn("bash", [], {
    name: "xterm-color",
    env: {
      ...process.env,
      PS1: CUSTOM_PROMPT,
    },
  });

  ws.on("message", (message) => {
    console.log(`received: ${message}`);

    const data = JSON.parse(message.toString());

    if (data.type === "command") {
      ptyProcess.write(data.data);
    }
  });

  ws.on("close", () => {
    console.log("closed ws");
  });

  ptyProcess.onData((data: any) => {
    const message = JSON.stringify({
      type: "data",
      data,
    });

    ws.send(message);
  });
});

server.listen(port, () => {
  console.log(`api service running on ${port}`);
});
