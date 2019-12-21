let scene, camera, renderer, cube, normals, sphere, torus;
let ADD = 0.02;

function createGeometry() {
    // let geometry = new THREE.BoxGeometry(5,5,5);
    // let geometry = new THREE.SphereGeometry(5, 30, 30);
    let geometry = new THREE.TorusGeometry(5,2,10,10);
    let material = new THREE.MeshNormalMaterial();

    // cube = new THREE.Mesh(geometry, material);
    // sphere = new THREE.Mesh(geometry, material);
    torus = new THREE.Mesh(geometry, material);
    
    // scene.add(cube);
    // scene.add(sphere);
    scene.add(torus);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 1, 1000
    );
    camera.position.z = 20;
    
    createGeometry();
    
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    // cube.rotation.x += ADD;
    // cube.rotation.y += ADD/3;
    // sphere.rotation.x += ADD;
    // sphere.rotation.y += ADD;
    torus.rotation.x += ADD;
    torus.rotation.y += ADD/3;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
mainLoop();