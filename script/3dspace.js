// scene setup

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x999999, 1);
const renderer_element = renderer.domElement;
document.getElementById("viewport-contain").appendChild(renderer_element);

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
camera.position.set(0, 0, 25);
let camera_target = new THREE.Vector3(0, 0, 50);
scene.add(camera);

const boxGeometry = new THREE.BoxGeometry(12.5, 20, 2);
const basicMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
const cube1 = new THREE.Mesh(boxGeometry, basicMaterial);
cube1.position.set(0, 0, 0);
scene.add(cube1);
const cube2 = new THREE.Mesh(boxGeometry, basicMaterial);
cube2.position.set(15, 10, 0);
scene.add(cube2);
const cube3 = new THREE.Mesh(boxGeometry, basicMaterial);
cube3.position.set(-15, -10, 0);
scene.add(cube3);

// code

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer_element.addEventListener('wheel', (evt) => {
    camera_target.z += Math.sign(evt.deltaY) * (5 + (camera_target.z - 20) * 0.5);
});

let mouse_position_on_click = {};
let is_mouse_down = false;
renderer_element.addEventListener('mousedown', () => { is_mouse_down = true; });
renderer_element.addEventListener('mouseup', () => { is_mouse_down = false; });
renderer_element.addEventListener('mousemove', (evt) => {
    if (typeof(mouse_position_on_click.x) != 'undefined' && is_mouse_down) {
        let pan_spd = 0.0014 * camera_target.z;

        let deltaX = mouse_position_on_click.x - evt.clientX,
            deltaY = mouse_position_on_click.y - evt.clientY;
        camera_target.x += deltaX * pan_spd;
        camera_target.y -= deltaY * pan_spd;
    }
    mouse_position_on_click = { x: evt.clientX, y: evt.clientY };
});

function easeCamera() {
    const EASE_SPD = 15;

    camera.position.x += (camera_target.x - camera.position.x) / EASE_SPD;
    camera.position.y += (camera_target.y - camera.position.y) / EASE_SPD;
    camera.position.z += (camera_target.z - camera.position.z) / EASE_SPD;
}

function rotateCamera() {
    camera.rotation.y = (camera.position.z - 20) * 0.01;
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function clampCamera() {
    camera_target.x = clamp(camera_target.x, -50, 50);
    camera_target.y = clamp(camera_target.y, -50, 50);
    camera_target.z = clamp(camera_target.z, 20, 75);
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    easeCamera();
    rotateCamera();
    clampCamera();
}
render();