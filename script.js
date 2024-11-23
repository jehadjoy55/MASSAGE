// WebSocket connection to the server
const socket = new WebSocket("ws://localhost:3000"); // Change to Glitch URL when deploying

const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Function to display messages in the chat window
function addMessage(message, isSelf = false) {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.className = isSelf ? "message self" : "message";
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Send a message when the button is clicked
sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  if (message) {
    socket.send(message);
    addMessage(`You: ${message}`, true); // Display message as sent by self
    messageInput.value = ""; // Clear the input field
  }
});

// Receive messages from other users
socket.onmessage = (event) => {
  addMessage(`Mahu: ${event.data}`); // Display message as received from Mahu
};

// Handle errors
socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};
