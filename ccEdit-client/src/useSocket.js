import { useEffect, useRef, useState } from "react";

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
export default function () {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://localhost:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  const send = (s, preview = false) => {
    socket.emit("editorMessage", { preview: preview, message: s });
  };
  return { socket, send };
}
