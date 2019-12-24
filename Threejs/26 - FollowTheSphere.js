window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, light1, sphere1, vector;
let spheres = [];
let ADD = 0.02, theta = 0;
const RADIUS = 5, BASE_X = -20, BASE_Y = -20;

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
    
    let geometry = new THREE.SphereGeometry(RADIUS/2, 30, 30);
    let material = new THREE.MeshPhongMaterial({
        color: Math.random()*0xffffff, shininess: 100, side: THREE.DoubleSide
    });
    sphere1 = new THREE.Mesh(geometry, material);

    scene.add(sphere1);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
 
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light1);
    
    createGeometry();
            
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    camera.lookAt(sphere1.position);
    sphere1.position.y = 40 * Math.cos(theta);
    sphere1.position.z = 40 * Math.sin(theta);
    camera.position.y = sphere1.position.y;
    camera.position.z = sphere1.position.z + 5;

    theta += ADD;
    
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();