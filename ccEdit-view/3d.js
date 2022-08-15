import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-canvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

//// SCENE AND CAMERA
const scene = new THREE.Scene();
renderer.setClearColor(0x000000, 0);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3);

// Lighting
// Come back to this as I can probably do a better light setup
const light = new THREE.PointLight("white", 0.8, 0);
light.position.set(-0.3, -0.3, 2);
scene.add(light);

// Objects are the 3 entites that I have wrapped to have an update method
const objects = {};

// Renderqueue is something I dont think I'm using anymore but it's a way to hook into the scene and call a function
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

//////// 3D Constuctors
// Cant remember why I put the object counter in here or what it's actually doing?
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

  const o = {
    t: c,
    update: null,
  };
  addObject(o);
  return o;
};

// MODELS

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

const m = THREE.MathUtils;

export { addObject, cube, glb, remove, m };
