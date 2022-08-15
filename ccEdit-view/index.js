import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { wa, wb, wc, wd, we, wf, t } from "./temporal";
import { addObject, cube, glb, remove, m } from "./3d";

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

// Plug into hydra
// Not sure if these needs to be called after 3js setup
s0.init({ src: document.getElementById("three-canvas") });
src(s0).out();

//LIB

const width = document.body.offsetWidth;
const height = document.body.offsetHeight;
const w = window;

const r = () => location.reload();

const doTimes = (n, f) => {
  for (let i = 0; i < n; i++) f();
};

const a = (n) => Array(n).fill(null);

// Maths
const rf = (min, max) => m.randFloat(min, max);

// Socket Setup
const socket = io("http://localhost:3001");
socket.on("viewMessage", async (msg) => {
  const { preview, message } = msg;
  if ((preview && isPreview) || !preview) {
    try {
      eval(`(async () => {${message}})()`);
      errorDisplay.innerText = "";
    } catch (e) {
      isPreview ? (errorDisplay.innerText = e) : console.log(e);
    }
  }
});

//////// 3D Constuctors
