// Setting the scene - creating the rendering
const scene = new THREE.Scene();

// Camera settings
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer - actually rendering
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("viewer").appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Loader
const loader = new THREE.GLTFLoader();

// Load baseplate
loader.load('./models/baseplate.glb', (gltf) => {
  const baseplate = gltf.scene;
  baseplate.position.set(-2, 0, 0);
  scene.add(baseplate);
});

// Load topplate
loader.load('./models/topplate.glb', (gltf) => {
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
