import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import * as THREE from "three";

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

//// THREE SETUP
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-canvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
//// CONSTANTS
const rotSpeed = 0.0025;

//// SETUP SCENE AND CAMERA
const scene = new THREE.Scene();
renderer.setClearColor(0x000000, 0);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3);

// Add cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
const newCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
};

window.rot = 0.01;

//// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += window.rot;
  cube.rotation.y += window.rot;
}
animate();

// Plug into hydra
s0.init({ src: document.getElementById("three-canvas") });
src(s0).modulate(osc(10)).out();

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
