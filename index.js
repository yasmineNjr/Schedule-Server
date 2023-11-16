const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    // origin: "https://schedule-a-meeting-client.vercel.app/",
    // origin: "https://schedule-a-meeting-client.onrender.com",
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  // });

  socket.on("send_message", (data) => {
    //socket.to(data.room).emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("send_final", (data) => {
    //socket.to(data.room).emit("receive_message", data);
    socket.broadcast.emit("receive_final", data);
  });

});
  

// server.listen(3001, () => {
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
