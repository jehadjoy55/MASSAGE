const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });
let clients = [];

server.on("connection", (ws) => {
    clients.push(ws);
    console.log("New client connected.");

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        // Broadcast the message to all clients
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message: data.message }));
            }
        });
    });

    ws.on("close", () => {
        clients = clients.filter((client) => client !== ws);
        console.log("Client disconnected.");
    });
});

console.log("WebSocket server is running on ws://localhost:3000");
