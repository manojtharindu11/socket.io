import React from "react";

const ChatBox = ({ chatHistory }) => {
  const chatBoxStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    height: "300px",
    overflowY: "auto",
    marginBottom: "10px",
  };

  const chatStyle = (chat) => ({
    textAlign: chat.sender === "me" ? "right" : "left",
    margin: "5px 0",
    color: chat.sender === "me" ? "blue" : "green",
  });

  const chatBoxContent = chatHistory.map((chat, index) => (
    <div key={index} style={chatStyle(chat)}>
      <span>{chat.sender === "me" ? "You" : "Stranger"}: </span>
      <span>{chat.message}</span>
    </div>
  ));

  
  return <div style={chatBoxStyle}>{chatBoxContent}</div>;
};

export default ChatBox;
