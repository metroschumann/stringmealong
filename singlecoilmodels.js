//Importing relevant library (three.js)

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

//Scene
const scene = new THREE.Scene();

//Camera controls
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });

//Register as viewer
const viewer = document.getElementById("viewer");
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
viewer.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Loader
const loader = new GLTFLoader();

// Load baseplate
loader.load('Baseplate.glb', (gltf) => {
  const baseplate = gltf.scene;
  baseplate.position.set(-2, 0, 0);
  scene.add(baseplate);
});

// Load topplate
loader.load('Topplate.glb', (gltf) => {
  const topplate = gltf.scene;
  topplate.position.set(2, 0, 0);
  scene.add(topplate);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
