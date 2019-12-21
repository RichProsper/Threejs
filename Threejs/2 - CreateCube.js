let scene, camera, renderer, cube;

function createCube() {
    let geometry = new THREE.BoxGeometry(1,1,1);
    let material = new THREE.MeshBasicMaterial({color:0x00a1cb});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffee);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 5;

    scene.add(new THREE.AxesHelper(5));

    createCube();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    cube.rotation.y += 0.1;
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();