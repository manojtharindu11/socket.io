import { io } from "socket.io-client";

export const socket = io("http://localhost:4000");

// Function to send a message
export const sendMessage = (message) => {
  socket.emit("send_message", { message });
};

// Listener for receiving messages
export const onMessageReceived = (callback) => {
  socket.on("receive_message", callback);
};

// Clean up listener
export const removeMessageListener = () => {
  socket.off("receive_message");
};