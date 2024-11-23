const ws = new WebSocket("wss://your-backend-url");

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

ws.onopen = () => {
  console.log("Connected to the server.");
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  addMessage("received", data.message);
};

sendButton.addEventListener("click", () => {
  const message = input.value.trim();
  if (!message) return;

  // Send the message to the server
  ws.send(JSON.stringify({ message }));

  // Display your message
  addMessage("sent", message);

  input.value = "";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

function addMessage(type, text) {
  const message = document.createElement("div");
  message.classList.add("message", type);
  message.textContent = text;
  messagesDiv.appendChild(message);
}
