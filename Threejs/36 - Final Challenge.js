window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('keydown', e => {
    if (e.keyCode === UP) {
        if (camera.fov > 20) camera.fov -= 1;
    }
    else if (e.keyCode === DOWN) {
        if (camera.fov < 120) camera.fov += 1;
    }
    else if (e.keyCode === LEFT) {
        if (camera.position.x > -20) camera.position.x -= 1;
    }
    else if (e.keyCode === RIGHT) {
        if (camera.position.x < 20) camera.position.x += 1;
    }
    camera.updateProjectionMatrix();
});

let scene, camera, renderer, light1, light2;
let spheres = [];
let ADD = 0.0075, theta = 0;
const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

let RIR = (from, to) => from + (Math.random() * (to - from));

function createGeometry() {
    function createSphere() {
        let geometry = new THREE.SphereGeometry(RIR(0.75,1.5), 30, 30);
        let material = new THREE.MeshPhongMaterial({
            color: Math.random()*0xffffff, shininess: RIR(80,100), side: THREE.DoubleSide
        });
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(RIR(-22,22), RIR(-22,22), RIR(-11,11));
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        spheres.push({
            sphere: sphere, rotationSpeed: RIR(0.02,0.04), rotationX: RIR(-22,22),
            rotationY: RIR(-22,22), rotationZ: RIR(-11,11), theta: 0
        });
        scene.add(sphere);
    }

    let numSpheres = Math.floor(RIR(5, 30));
    for (let i = 0; i < numSpheres; i++) createSphere();
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x020202);
 
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 40);

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(10, 20, 30);
    light1.angle = Math.PI / 2;
    light1.penumbra - 0.05;
    light1.decay = 2;
    light1.distance = 200;
    light1.castShadow = true;
    light1.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50,1,10,2500));
    light1.shadow.bias = 0.0001;
    light1.shadow.mapSize.width = window.innerWidth;
    light1.shadow.mapSize.height = window.innerHeight;

    light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(-10, -20, -30);
    light2.angle = Math.PI / 2;
    light2.penumbra - 0.05;
    light2.decay = 2;
    light2.distance = 200;
    light2.castShadow = true;
    light2.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50,1,10,2500));
    light2.shadow.bias = 0.0001;
    light2.shadow.mapSize.width = window.innerWidth;
    light2.shadow.mapSize.height = window.innerHeight;

    scene.add(light1);
    scene.add(light2)
    createGeometry();
            
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {   
    light1.position.x = -20 * Math.sin(theta);
    light1.position.y = 10 * Math.cos(theta);
    light1.position.z = 20 * Math.cos(theta);

    light2.position.x = 20 * Math.sin(theta);
    light2.position.y = -10 * Math.cos(theta);
    light2.position.z = -20 * Math.cos(theta);

    theta += ADD;
    if (theta <= -10 || theta >= 10) ADD *= -1;

    spheres.forEach(s => {
        s.sphere.position.x = s.rotationX * Math.sin(s.theta);
        s.sphere.position.y = s.rotationY * Math.cos(s.theta);
        s.sphere.position.z = s.rotationZ * Math.cos(s.theta);
        s.theta += s.rotationSpeed;
        if (s.theta <= -15 || s.theta >= 15) s.rotationSpeed *= -1;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();
