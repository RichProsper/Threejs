window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, cube, cone, plane, light;
let ADD = 0.05;

function createGeometry() {
    let geometry = new THREE.BoxGeometry(5,5,5);
    let material = new THREE.MeshPhongMaterial({color: 0x0f1d89, shininess: 100, side: THREE.DoubleSide});

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -6;
    cube.position.y = -5;
    cube.position.z = -6;

    geometry = new THREE.ConeGeometry(3,4,20,1,true);
    cone = new THREE.Mesh(geometry, material);
    cone.position.x = 7;
    cone.position.y = -5;

    geometry = new THREE.PlaneGeometry(1000,1000,50,50);
    material = new THREE.MeshPhongMaterial({color: 0x693421, side: THREE.DoubleSide});
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -100;

    scene.add(cube);
    scene.add(cone);
    scene.add(plane);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 18;

    light = new THREE.AmbientLight(0x1DAB75);
    light.intensity = 1.2;
    scene.add(light);

    createGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    light.intensity += ADD;
    if (light.intensity <= 0.5 || light.intensity >= 10) ADD *= -1;

    console.log(light.intensity);
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();