window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, light1;
let spheres = [];
let ADD = 0.01, theta = 0;
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
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 40);

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light1);
    
    createGeometry();
            
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.position.x = 40 * Math.sin(theta);
    camera.position.z = 40 * Math.cos(theta);
    theta += ADD;
    
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

function switchCamera() {
    if(camera instanceof THREE.PerspectiveCamera) {
        camera = new THREE.OrthographicCamera(-300, 300, 400, -400, 1, 1000);
        camera.zoom = 5;
        camera.updateProjectionMatrix();
    }
    else {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 0, 40);
    }
}

init();
mainLoop();