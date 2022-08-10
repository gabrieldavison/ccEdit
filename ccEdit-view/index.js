import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

const light = new THREE.PointLight("white", 0.8, 0);
light.position.set(-0.3, -0.3, 2);
scene.add(light);

const objects = {};
const renderQueue = [];

//// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  renderQueue.forEach((f) => f());
  for (let o in objects) {
    const currentObject = objects[o];
    if (currentObject.update) currentObject.update(currentObject);
  }
}
animate();
const addR = (v) => {
  if (v.isArray) {
    v.map((f) => renderQueue.push(f));
  } else {
    renderQueue.push(v);
  }
};

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
src(s0).out();

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

// TEMPORAL

let timeFunctions = {};
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

const t = {};
t.osc = (v, mag, freq, name = counter) => {
  const oldV = w[v];
  if (timeFunctions[name]) delete timeFunctions[name];
  const fn = (_, now) => {
    const s = Math.sin((now / 1000) * freq * Math.PI * 2) * mag;
    console.log(oldV + Number(s.toFixed(2)));
    w[v] = oldV + Number(s.toFixed(2));
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
    // console.log(timePassed);
    // work out what % this is of duration
    const segment = timePassed / duration;
    const inc = difference * segment;
    w[v] += Number(inc.toFixed(3));

    // work out how much to add to v
  };
  addTimeFunc(name, fn);
};

t.stop = (name) => {
  if (timeFunctions[name]) {
    delete timeFunctions[name];
  }
};

t.kill = () => {
  timeFunctions = {};
};

//////       TEMPORAL VARIABLES
/*
- At the moment these are just a poor mans atom.
- Implementing my own atom might be adviseable and will make the API cleaner.
  - E.g. for temporal functions I wont have to pass string variables. I could pass the atom instead.
*/

w.a = 0;
w.b = 0;
w.c = 0;
w.d = 0;
w.e = 0;
w.f = 0;
const wa = (v = null) => (v ? (w.a = v) : () => w.a);
const wb = (v = null) => (v ? (w.b = v) : () => w.b);
const wc = (v = null) => (v ? (w.c = v) : () => w.c);
const wd = (v = null) => (v ? (w.d = v) : () => w.d);
const we = (v = null) => (v ? (w.e = v) : () => w.e);
const wf = (v = null) => (v ? (w.f = v) : () => w.f);

//////// 3D Constuctors
let objectCounter = 0;

const addObject = (o) => {
  objects[objectCounter] = o;
  objectCounter += 1;
};

const cube = (size, x, y, z) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({});
  const c = new THREE.Mesh(geometry, material);
  scene.add(c);
  c.scale.set(size, size, size);
  c.position.set(x, y, z);

  const obj = {
    t: c,
    updatePosition: null,
    updateRotation: null,
    updateScale: null,
  };
  objects;

  return obj;
};

// MODELS
const testglb = "./models/nagy-boats.glb";

const glb = async (name, initFn = () => {}) => {
  const glbMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

  const loader = new GLTFLoader();
  const model = await loader.loadAsync(name);
  const obj = model.scene;
  scene.add(obj);
  obj.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.material = glbMaterial;
    }
  });
  initFn(obj);

  const o = {
    t: obj,
    update: null,
  };
  addObject(o);
  return o;
};

const remove = (obj) => scene.remove(obj.t);

w.myObj = await glb(testglb);

w.myObj.update = (obj) => {
  obj.t.rotation.x += 0.001;
  console.log(obj);
};
