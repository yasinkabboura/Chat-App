const socket = io("http://localhost:4010", { transports: ["websocket"] });
const chatContainer = document.getElementById("chat_container");
const sendForm = document.getElementById("send_form");
const textMessage = document.getElementById("text_message");

const name = prompt("Enter your name here?");
appendMessage("Welcome to the chat");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

sendForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = textMessage.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  textMessage.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  chatContainer.append(messageElement);
}
