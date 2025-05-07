import React, { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import {
  sendMessage,
  onMessageReceived,
  removeMessageListener,
} from "./utils/socket";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const onMessage = (data) => {
    setChatHistory((prev) => [
      ...prev,
      { message: data.message, sender: "other" },
    ]);
  };

  useEffect(() => {
    onMessageReceived(onMessage);

    return () => {
      removeMessageListener();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory((prev) => [...prev, { message, sender: "me" }]);
      sendMessage(message);
      setMessage("");
    }
  };

  const appStyle = { padding: "20px", maxWidth: "600px", margin: "auto" };

  const chatBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };

  const inputStyle = { padding: "10px", width: "100%" };

  const inputField = (
    <input
      type="text"
      placeholder="Type your message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      style={inputStyle}
    />
  );

  const buttonField = (
    <button
      onClick={handleSendMessage}
      style={{ padding: "10px", marginLeft: "10px" }}
    >
      Send
    </button>
  );

  return (
    <div className="App" style={appStyle}>
      <h2>Real-Time Chat</h2>
      <ChatBox chatHistory={chatHistory} />
      <div style={chatBoxStyle}>
        {inputField}
        {buttonField}
      </div>
    </div>
  );
}

export default App;
