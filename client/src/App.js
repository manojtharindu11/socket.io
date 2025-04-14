import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function App() {
  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello from client!" });
  };

  return (
    <div className="App">
      <input type="text" placeholder="Enter message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
