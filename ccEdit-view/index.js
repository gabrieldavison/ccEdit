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

//Lighting

const light = new THREE.PointLight("white", 0.3, 0);
light.position.set(-0.3, -0.3, 2);
scene.add(light);

// Add cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshPhongMaterial({});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
const cube = (size, x, y, z) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({});
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.scale.set(size, size, size);
  cube.position.set(x, y, z);
  return cube;
};

// const cube = addCube(1, 0, 0, 0);

window.rot = 0.01;

const renderQueue = [];
//// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  renderQueue.forEach((f) => f());
}
animate();
const addR = (v) => {
  if (v.isArray) {
    v.map((f) => renderQueue.push(f));
  } else {
    renderQueue.push(v);
  }
};
// addR(() => (cube.rotation.x += window.rot));
// addR(() => (cube.rotation.y += window.rot));

//LIB

const width = document.body.offsetWidth;
const height = document.body.offsetHeight;
const w = window;
const m = THREE.MathUtils;

const r = () => location.reload();

const doTimes = (n, f) => {
  for (let i = 0; i < n; i++) f();
};
const a = (n) => Array(n).fill(null);

// Maths
const rf = (min, max) => m.randFloat(min, max);

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

// Temporal Stuff

// temporal is like 3js render loop
// an array (that is visualized like the stack)
// every tick the array is executed
// each func is passed current tick and last tick
// need to decide whether this live in the editor or the view (view will be easier to start)

const timeFunctions = {};
let counter = 0;
let then = 0;
function timer() {
  requestAnimationFrame(timer);
  const now = Date.now();
  // timeArr.forEach((v) => v(then, now));
  for (let f in timeFunctions) {
    const curr = timeFunctions[f];
    curr.func(then, now, curr);
  }
  then = now;
}
timer();

const addTimeFunc = (name, func) => {
  timeFunctions[name] = { func, name };
  counter += 1;
};
/*
function oscillator(time, frequency = 1, amplitude = 1, phase = 0, offset = 0){
    return Math.sin(time * frequency * Math.PI * 2 + phase * Math.PI * 2) * amplitude + offset; 
}
*/
const t = {};
t.osc = (v, mag, freq, name = counter) => {
  const oldV = w[v];
  if (timeFunctions[name]) delete timeFunctions[name];
  const fn = (_, now) => {
    const s = Math.sin((now / 1000) * freq * Math.PI * 2) * mag;
    w[v] = oldV + s;
  };
  addTimeFunc(name, fn);
};

t.ramp = (v, target, duration, name = counter) => {
  const oldV = w[v];
  const difference = target - oldV;
  const fn = (then, now, me) => {
    const currentV = w[v];
    if (
      (target > oldV && currentV >= target) ||
      (target < oldV && currentV <= target)
    )
      return delete timeFunctions[me.name];
    // work out how much time has passed
    const timePassed = now - then;
    // work out what % this is of duration
    const segment = timePassed / duration;
    const inc = difference * segment;
    w[v] += inc;

    // work out how much to add to v
  };
  addTimeFunc(name, fn);
};

t.stop = (name) => {
  if (timeFunctions[name]) {
    delete timeFunctions[name];
  }
};

// need to turn timeArr into an object
// that way they can be set to a variable and killed
