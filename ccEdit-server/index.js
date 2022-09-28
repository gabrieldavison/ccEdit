const express = require("express");
const app = express();
const http = require("http");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const fs = require("fs");

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
  socket.on("slotMessage", (msg) => {
    const f = __dirname + "/slots/" + msg.slot + ".txt";
    if (msg.action === "save") {
      fs.writeFile(f, msg.state, (content, err) => {
        console.log(content);
        console.log("wrote slot");
      });
    } else {
      fs.readFile(f, function (err, data) {
        const d = data.toString();
        io.emit("slotMessage", { data: d, action: "load" });
      });
    }
  });
});

httpServer.listen(3001, () => {
  console.log("listening on *:3001");
});
