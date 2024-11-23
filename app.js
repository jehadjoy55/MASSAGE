const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  console.log("A new user connected");

  // When a message is received, broadcast it to all other clients
  ws.on("message", (message) => {
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // When a client disconnects, remove it from the list of clients
  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
    console.log("A user disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:3000");
