window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, cube, plane, spotLight;
let ADD = 0.01, theta = 0;

function createGeometry() {
    let geometry = new THREE.BoxGeometry(5,5,5);
    let material = new THREE.MeshPhongMaterial({color: 0xfd12e0, shininess: 100, side: THREE.DoubleSide});

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = 5;

    geometry = new THREE.BoxGeometry(2000,1,2000);
    material = new THREE.MeshPhongMaterial({color: 0xfff000, shininess: 100, side: THREE.DoubleSide});
    plane = new THREE.Mesh(geometry, material);
    plane.position.y = -1;

    // geometry = new THREE.SphereGeometry(1,30,30)
    // material = new THREE.MeshBasicMaterial({color: 0xffffff});
    // sphere = new THREE.Mesh(geometry, material);
    // sphere.position.y = 5;

    scene.add(cube);
    scene.add(plane);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 20);

    spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(15,90,10);
    spotLight.angle = 0.1;
    spotLight.penumbra = 0.05;
    spotLight.decay = 2;
    spotLight.distance = 200;
    scene.add(spotLight);

    let ambient = new THREE.AmbientLight(0xffffff, 0.075);
    scene.add(ambient);

    createGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    spotLight.angle += ADD;
    if (spotLight.angle >= Math.PI/2 || spotLight.angle <= 0.05) ADD *= -1;

    // if (Math.floor(Math.random() * 555) <= 1) {
    //     let color = new THREE.Color(Math.random()*0xffffff);
    //     light.color = color;
    //     sphere.material.color = color;
    // }

    // light.position.y = sphere.position.y = -15 * Math.sin(theta);
    // light.position.z = sphere.position.z = -10 * Math.cos(theta);
    // theta += ADD;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();