let scene, camera, renderer, torus;

function createTorus() {
    let geometry = new THREE.TorusGeometry(10,1.2,5,30);
    let material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });
    torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 20;

    createTorus();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();