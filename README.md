## **Real-Time Chat Server (Express + Socket.IO)**

### **Setup Instructions**

1. **Initialize Project:**

   ```bash
   npm init
   npm install express socket.io cors nodemon
   ```

2. **Project Structure:**

   ```
    /socket.io
    ├── /server
    │   └── index.js
    │
    └── /client
        └── /src
            ├── App.jsx
            ├── /components
            │   └── ChatBox.jsx
            └── /utils
                └── socket.js
   ```

3. **server.js (Basic Server with Room and Private Messaging)**

   ```javascript
   const express = require("express");
   const http = require("http");
   const cors = require("cors");
   const { Server } = require("socket.io");

   const app = express();
   app.use(cors());

   const server = http.createServer(app);
   const io = new Server(server, {
     cors: {
       origin: "*",
       methods: ["GET", "POST"],
     },
   });

   io.on("connection", (socket) => {
     console.log("User connected:", socket.id);

     // Join a specific room
     socket.on("join_room", (room) => {
       socket.join(room);
       console.log(`User ${socket.id} joined room: ${room}`);
     });

     // Send message to a specific room
     socket.on("send_room_message", ({ room, message }) => {
       io.to(room).emit("receive_message", { message });
     });

     // Send private message to a specific user
     socket.on("send_private_message", ({ userId, message }) => {
       io.to(userId).emit("receive_message", { message });
     });

     // General broadcast message
     socket.on("send_message", (data) => {
       io.emit("receive_message", data);
     });

     // Disconnect
     socket.on("disconnect", () => {
       console.log("User disconnected:", socket.id);
     });
   });

   const PORT = process.env.PORT || 4000;
   server.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
   });
   ```

4. **Start Server (Using Nodemon)**

   ```bash
   npx nodemon index.js
   ```

### **Usage**

#### **1. General Message (Broadcast)**

* **Send Message:**

  ```javascript
  socket.emit("send_message", { message: "Hello everyone" });
  ```
* **Receive Message:**

  ```javascript
  socket.on("receive_message", (data) => {
    console.log("Broadcast:", data.message);
  });
  ```

#### **2. Room Messaging**

* **Join Room:**

  ```javascript
  socket.emit("join_room", "room1");
  ```
* **Send Message to Room:**

  ```javascript
  socket.emit("send_room_message", { room: "room1", message: "Hello room1" });
  ```
* **Receive Message (In Room):**

  ```javascript
  socket.on("receive_message", (data) => {
    console.log("Room Message:", data.message);
  });
  ```

#### **3. Private Messaging**

* **Send Private Message:**

  ```javascript
  socket.emit("send_private_message", { userId: "targetSocketId", message: "Hello User" });
  ```
* **Receive Private Message:**

  ```javascript
  socket.on("receive_message", (data) => {
    console.log("Private Message:", data.message);
  });
  ```
