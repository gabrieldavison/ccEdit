import * as THREE from "three";
export const threeSetup = (renderer) => {
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

  //// LIGHTING
  const pLight = new THREE.PointLight(0xff0000, 3, 200);
  pLight.position.set(50, 50, 50);
  scene.add(pLight);
  const aLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(aLight);

  const m = THREE.MathUtils;

  //// ANIMATION LOOP
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  animate();
};
