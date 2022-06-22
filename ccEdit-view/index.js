import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const isPreview = window.name === "preview";

const errorDisplay = document.getElementById("error-display");
if (!isPreview) {
  errorDisplay.remove();
}

const hydraCanvas = document.getElementById("hydra-canvas");
const hydra = new Hydra({
  canvas: hydraCanvas,
  detectAudio: false,
  enableStreamCapture: false,
});
hydra.setResolution(document.body.offsetWidth, document.body.offsetHeight);
osc(100).out();

const socket = io("http://localhost:3001");
socket.on("viewMessage", (msg) => {
  const { preview, message } = msg;
  if ((preview && isPreview) || !preview) {
    try {
      eval(message);
      errorDisplay.innerText = "";
    } catch (e) {
      isPreview ? (errorDisplay.innerText = e) : console.log(e);
    }
  }
});
// socket.on("viewMessage", (msg) => {
//   try {
//     eval(msg);
//   } catch (e) {
//     console.log(e);
//   }
// });
