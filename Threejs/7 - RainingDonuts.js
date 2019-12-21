let scene, camera, renderer;
let donuts = [];
let ADD = 0.1;

function randomInRange(from, to) {
    let x = Math.random() * (to - from);
    return x + from;
}

function createDonut() {
    let geometry = new THREE.TorusGeometry(1,0.5,5,30);
    let material = new THREE.MeshBasicMaterial({color:Math.random()*0xffffff});
    let donut = new THREE.Mesh(geometry, material);

    donut.position.x = randomInRange(-15,15);
    donut.position.z = randomInRange(-15,15);
    donut.position.y = 15;
    scene.add(donut);
    donuts.push(donut);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 20;
    camera.position.y = -10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    let x = Math.floor(Math.random()*100);
    if (x < 2) createDonut();

    donuts.forEach(d => d.position.y -= ADD);
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();