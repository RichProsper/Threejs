window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, light;
let cubes = [];
let ADD = 0.5;
const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

let randomInRange = (from, to) => from + (Math.random() * (to - from));

function createCube() {
    let w = randomInRange(1,3);
    let h = randomInRange(1,3);
    let d = randomInRange(1,3);
    let geometry = new THREE.BoxGeometry(w,h,d);
    let material = new THREE.MeshLambertMaterial({color: Math.random()*0xffffff});
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(randomInRange(-40,40),0,randomInRange(-40,40));
    cubes.push(cube);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 5, 100);

    light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);
    
    for (let i = 1; i <= 150; i++) createCube();
    cubes.forEach(c => scene.add(c));
            
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    camera.position.z -= 0.1;
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

document.addEventListener('keydown', move);

function move(key) {
    let keyCode = key.keyCode;
    if (keyCode === LEFT) camera.position.x -= ADD;
    else if (keyCode === UP) camera.position.y += ADD;
    else if (keyCode === RIGHT) camera.position.x += ADD;
    else camera.position.y -= ADD;
}

init();
mainLoop();