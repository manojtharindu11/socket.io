import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Declare socket outside to avoid multiple connections
const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChatHistory((prev) => [
        ...prev,
        { message: data.message, sender: "other" },
      ]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Add to local chat history as 'me'
      setChatHistory((prev) => [...prev, { message, sender: "me" }]);
      socket.emit("send_message", { message });
      setMessage("");
    }
  };

  return (
    <div
      className="App"
      style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}
    >
      <h2>🗨️ Real-Time Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={{
              textAlign: chat.sender === "me" ? "right" : "left",
              margin: "5px 0",
              color: chat.sender === "me" ? "blue" : "green",
            }}
          >
            <span>{chat.sender === "me" ? "You" : "Stranger"}: </span>
            <span>{chat.message}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: "10px", width: "100%" }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "10px", marginLeft: "10px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
