let scene, camera, renderer, cube, sphere;
let ADD = 0.05;

function createGeometry() {
    let geometry = new THREE.BoxGeometry(3,2,4);
    let material = new THREE.MeshDepthMaterial();
    cube = new THREE.Mesh(geometry, material);
    cube.position.z = 5;
    cube.position.x = -5;

    geometry = new THREE.SphereGeometry(3,30,30);
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.z = -15;
    sphere.position.x = 5;
    
    scene.add(cube);
    scene.add(sphere);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000001);
    
    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 1, 1000
    );
    camera.position.z = 15;
    
    createGeometry();
    
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    cube.position.z += ADD;
    sphere.position.z -= ADD;

    if (cube.position.z >= 6 || cube.position.z <= -16)
        ADD *= -1;

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