window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, light1, rayCast, mouse;
let ADD = 0.01;

document.addEventListener('click', e => {
    mouse.x = (e.clientX / window.innerWidth * 2) - 1;
    mouse.y = 1 - (e.clientY / window.innerHeight * 2);
    mouse.z = 1;

    rayCast.setFromCamera(mouse, camera);
    createSphere(rayCast.ray.at(50));
});

function createSphere(pos) {
    let material = new THREE.MeshPhongMaterial({
        color: Math.random()*0xffffff, shininess: 80+(Math.random()*20), side: THREE.DoubleSide
    });
    let geometry  = new THREE.SphereGeometry(5, 30, 30);
    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(pos.x, pos.y, pos.z);
    scene.add(sphere);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 40);

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light1);
    
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