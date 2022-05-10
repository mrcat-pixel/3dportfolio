// scene setup

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
const renderer_element = renderer.domElement;
document.getElementById("viewport-contain").appendChild(renderer_element);

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
camera.position.set(0, 0, 50);
let camera_target = new THREE.Vector3(0, 0, 50);
scene.add(camera);

class Pane {
    constructor(scene, title, desc, x, y) {
        const canvas = document.createElement( "canvas" );
        let height = 800;
        let width = 0.75*height;

        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "black";
        ctx.font = 0.128 * height + "px texfont";
        ctx.fillText(title, 0.066*width, 0.75*height);

        ctx.font = 0.032 * height + "px texfont";
        for ( let i = 0; i < desc.length; i ++ )
            ctx.fillText( desc[ i ], 0.066*width, 0.04 * height * i + 0.85*height );

        let texture = new THREE.CanvasTexture(canvas);

        this.backpane = new THREE.Mesh(
            new THREE.PlaneGeometry(15, 20),
            new THREE.MeshBasicMaterial({map: texture})
        );
        this.backpane.position.set(x, y, 0);
        scene.add(this.backpane);
    }
}

let pane1 = new Pane(scene,
    'math4',
    ['Function interpolation via', 'the Lagrange polynomial in Python.'],
    0, 0
);

let pane2 = new Pane(scene,
    'duo',
    ['perduo', 'perduo', 'perduo'],
    17, 0
);

let pane3 = new Pane(scene,
    'duo',
    ['perduo', 'perduo', 'perduo'],
    34, 0
);

let pane4 = new Pane(scene,
    'duo',
    ['perduo', 'perduo', 'perduo'],
    -17, 0
);

let pane5 = new Pane(scene,
    'duo',
    ['perduo', 'perduo', 'perduo'],
    -34, 0
);


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

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    easeCamera();
    rotateCamera();
    clampCamera();
}
render();