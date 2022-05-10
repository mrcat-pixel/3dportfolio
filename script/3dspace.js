// scene setup

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
camera.position.set(0, 0, 50);
let camera_target = new THREE.Vector3(0, 0, 50);
scene.add(camera);

const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
const basicMaterial = new THREE.MeshBasicMaterial({color: 0x505050});
const cube = new THREE.Mesh(boxGeometry, basicMaterial);
scene.add(cube);
cube.rotation.set(0.4, 0.2, 0);

// code

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('wheel', (evt) => {
    camera_target.z += Math.sign(evt.deltaY) * 5;
})

function easeCamera() {
    const ease_spd = 10;

    camera.position.x += (camera_target.x - camera.position.x) / ease_spd;
    camera.position.y += (camera_target.y - camera.position.y) / ease_spd;
    camera.position.z += (camera_target.z - camera.position.z) / ease_spd;
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    cube.rotateY(0.05);
    easeCamera();
}
render();