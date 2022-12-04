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
    if (currentObject._update) currentObject._update();
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

// Cant remember why I put the object counter in here or what it's actually doing?
let objectCounter = 0;

const addObject = (o) => {
  objects[objectCounter] = o;
  objectCounter += 1;
};

//////// 3D primitives
const addPrimitive = (
  { x, y, z },
  geometry,
  geometryParams = [],
  material = THREE.MeshPhongMaterial,
  materialParams = {}
) => {
  const geom = new geometry(...geometryParams);
  const mat = new material(materialParams);
  const objReference = new THREE.Mesh(geom, mat);
  scene.add(objReference);
  objReference.position.set(x, y, z);
  const o = {
    t: objReference,
    update: null,
  };
  addObject(o);
  return o;
};

const cube = (x, y, z, size) => {
  return addPrimitive({ x, y, z }, THREE.BoxGeometry, [size, size, size]);
};

const rect = (x, y, z, width, height, depth) => {
  return addPrimitive({ x, y, z }, THREE.BoxGeometry, [width, height, depth]);
};

const circle = (x, y, z, radius, segments = 20) => {
  return addPrimitive({ x, y, z }, THREE.CircleGeometry, [radius, segments]);
};

const plane = (
  x,
  y,
  z,
  width,
  height,
  widthSegments = 5,
  heightSegments = 5
) => {
  return addPrimitive({ x, y, z }, THREE.PlaneGeometry, [
    width,
    height,
    widthSegments,
    heightSegments,
  ]);
};

const canvasPlane = (
  x,
  y,
  z,
  width,
  height,
  widthSegments = 5,
  heightSegments = 5
) => {
  const geom = new THREE.PlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments
  );
  const texture = new THREE.CanvasTexture(
    document.getElementById("defaultCanvas0")
  );
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    side: THREE.DoubleSide,
  });
  const objReference = new THREE.Mesh(geom, mat);
  scene.add(objReference);
  objReference.position.set(x, y, z);
  texture.needsUpdate = true;
  const o = {
    t: objReference,
    _update: () => (texture.needsUpdate = true),
    update: null,
  };
  addObject(o);
  return o;
};

const sphere = (x, y, z, radius, segments = 20) => {
  return addPrimitive(
    { x, y, z },
    THREE.SphereGeometry,
    [radius, segments, segments],
    THREE.MeshPhongMaterial
  );
};

const wireSphere = (x, y, z, radius, segments = 20) => {
  const geom = new THREE.SphereGeometry(radius, segments, segments);
  const wireGeom = new THREE.WireframeGeometry(geom);
  const mat = new THREE.MeshBasicMaterial({
    wireframe: true,
    wireframeLinewidth: 2,
  });
  const objReference = new THREE.Mesh(geom, mat);
  scene.add(objReference);
  objReference.position.set(x, y, z);
  const o = {
    t: objReference,
    update: null,
  };
  addObject(o);
  return o;
};

// glb display
// When you use this one it must be async
const glb = async (x, y, z, name, initFn = () => {}) => {
  const glbMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

  const loader = new GLTFLoader();
  const model = await loader.loadAsync(name);
  const obj = model.scene;
  obj.position.x = x;
  obj.position.y = y;
  obj.position.z = z;
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

export {
  addObject,
  cube,
  rect,
  circle,
  plane,
  canvasPlane,
  sphere,
  wireSphere,
  glb,
  remove,
  m,
};
