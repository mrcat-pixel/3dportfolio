// scene setup

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
const renderer_element = renderer.domElement;
document.getElementById("viewport-contain").appendChild(renderer_element);

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
camera.position.set(0, 0, 50);
let camera_target = new THREE.Vector3(0, 0, 50);
scene.add(camera);

let circleArray = [
    new Circle(scene, -50, 200, 0x08302B, 0, 0.0005, 100),
    new Circle(scene, -100, 600, 0x4e284b, 0, -0.005, 50),
    new Circle(scene, -300, 1000, 0x2D1A07, 5, 0.015, 200),
    new Circle(scene, -20, 100, 0x352651, 5, -0.02, 20)
    ]

await document.fonts.load(0.128 * pane_resolution + 'px texfont');
await document.fonts.load(0.032 * pane_resolution + 'px texfont');

const cluster = new PaneCluster(scene);
new Starfield(scene);

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
document.addEventListener('mouseup', () => { is_mouse_down = false; });
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
    camera_target.z = clamp(camera_target.z, 15, 75);

    camera.rotation.y = clamp(camera.rotation.y, 0, 45);
}

function animateCircles() {
    for (const a of circleArray) a.animate();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    easeCamera();
    rotateCamera();
    clampCamera();
    animateCircles();

    cluster.animate()

    animate_filter_buttons();
    document.getElementById("sidebar").style.opacity =
        ((camera.position.z * 0.1) - 1.4).toString();
}
render();