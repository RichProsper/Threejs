window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, light1, rayCast, mouse;
let spheres = [];
let ADD = 0.01, theta = 0;
const RADIUS = 5, BASE_X = -20, BASE_Y = -20;

document.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth * 2) - 1;
    mouse.y = 1 - (e.clientY / window.innerHeight * 2);

    rayCast.setFromCamera(mouse, camera);

    let intersects = rayCast.intersectObjects(scene.children);
    intersects.forEach(obj => obj.object.position.y += 1);
});

function createGeometry() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let material = new THREE.MeshPhongMaterial({
                color: Math.random()*0xffffff, shininess: 100, side: THREE.DoubleSide
            });
            let geometry = new THREE.SphereGeometry(RADIUS, 30, 30);
            let sphere = new THREE.Mesh(geometry, material);

            sphere.position.x = BASE_X + j * 2 * (RADIUS+0.5);
            sphere.position.z = -2*RADIUS * i;
            sphere.position.y = BASE_Y + i * RADIUS;
            scene.add(sphere);
        }   
    }      
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 40);

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light1);
    
    createGeometry();

    rayCast = new THREE.Raycaster();
    mouse = new THREE.Vector2(-1, -1);
            
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();