import { useEffect, useRef, useState } from "react";

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export default function () {
  const [socket, setSocket] = useState(null);
  const [loadedState, setLoadedState] = useState("");
  useEffect(() => {
    const newSocket = io(`http://localhost:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  useEffect(() => {
    if (socket !== null) {
      socket.on("slotMessage", (msg) => {
        if (msg.action === "load") {
          setLoadedState(msg.data);
          console.log(msg.data);
        }
      });
    }
  }, [socket]);
  const send = (s, preview = false) => {
    socket.emit("editorMessage", { preview: preview, message: s });
  };
  const saveEditorState = (slot, s) => {
    socket.emit("slotMessage", { slot, state: s, action: "save" });
  };
  const loadEditorState = (slot) => {
    socket.emit("slotMessage", { slot, action: "load" });
  };
  return { socket, send, saveEditorState, loadEditorState, loadedState };
}
