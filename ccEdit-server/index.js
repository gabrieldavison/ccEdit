const express = require("express");
const app = express();
const http = require("http");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("hello");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("editorMessage", (msg) => {
    console.log(msg);
    io.emit("viewMessage", msg);
  });
});

httpServer.listen(3001, () => {
  console.log("listening on *:3001");
});
