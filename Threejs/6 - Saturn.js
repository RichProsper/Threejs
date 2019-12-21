let scene, camera, renderer, planet;
let rings = [];
let saturn = {planet: null, rings: null};
let ADDX = ADDY = 0.01;


function createPlanet() {
    let geometry = new THREE.SphereGeometry(5,30,40);
    let material = new THREE.MeshBasicMaterial({
        color: 0x6f2bb3,
        wireframe: false
    });
    planet = new THREE.Mesh(geometry, material);
    saturn.planet = planet;
}

function createRings() {
    let geometry = new THREE.TorusGeometry(6.3,1,2,30);
    let material = new THREE.MeshBasicMaterial({
        color: 0x2bb346,
        wireframe: false
    });
    let ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI/1.7;
    ring.rotation.y = Math.PI/-1.1;
    rings.push(ring);

    geometry = new THREE.TorusGeometry(8.8,1,2,50);
    material = new THREE.MeshBasicMaterial({
        color: 0x2bb385,
        wireframe: false
    });
    ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI/1.7;
    ring.rotation.y = Math.PI/-1.1;
    rings.push(ring);

    geometry = new THREE.TorusGeometry(11.3,1,2,70);
    material = new THREE.MeshBasicMaterial({
        color: 0x2bacb3,
        wireframe: false
    });
    ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.PI/1.7;
    ring.rotation.y = Math.PI/-1.1;
    rings.push(ring);

    saturn.rings = rings;
}

function createSaturn() {
    createPlanet();
    createRings();
    scene.add(saturn.planet);
    saturn.rings.forEach(r => scene.add(r));
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 20;

    createSaturn();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    saturn.planet.rotation.x -= ADDY/12;
    saturn.planet.position.y += ADDY;

    saturn.rings.forEach(r => {
        r.rotation.x -= ADDY/12;
        r.position.y += ADDY;
    });

    if (saturn.planet.position.y <= -3 || saturn.planet.position.y >= 3) ADDY *= -1;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();