let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 5;

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