let scene, camera, renderer, sphere;

function createSphere() {
    let geometry = new THREE.SphereGeometry(5,10,10,0,Math.PI,0,Math.PI*1.4);
    let material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 20;

    createSphere();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();