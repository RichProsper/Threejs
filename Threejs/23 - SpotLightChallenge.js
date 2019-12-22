window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, light1, light2, target1, target2;
let boxes = [];
let ADD = 0.2;

function createGeometry() {
    let geometry = new THREE.BoxGeometry(8,4,4);
    let material = new THREE.MeshPhongMaterial({color: Math.random()*0xffffff, shininess: 100, side: THREE.DoubleSide});
    let box = new THREE.Mesh(geometry, material);
    box.position.set(6,-5,10);
    boxes.push(box);

    geometry = new THREE.BoxGeometry(8,4,4);
    material = new THREE.MeshPhongMaterial({color: Math.random()*0xffffff, shininess: 100, side: THREE.DoubleSide});
    box = new THREE.Mesh(geometry, material);
    box.position.set(-6,-5,10);
    boxes.push(box);

    geometry = new THREE.BoxGeometry(8,4,4);
    material = new THREE.MeshPhongMaterial({color: Math.random()*0xffffff, shininess: 100, side: THREE.DoubleSide});
    box = new THREE.Mesh(geometry, material);
    box.position.set(-25,-5,-2);
    boxes.push(box);
    
    geometry = new THREE.BoxGeometry(8,4,4);
    material = new THREE.MeshPhongMaterial({color: Math.random()*0xffffff, shininess: 100, side: THREE.DoubleSide});
    box = new THREE.Mesh(geometry, material);
    box.position.set(0,-5,-2);
    boxes.push(box);

    geometry = new THREE.BoxGeometry(8,4,4);
    material = new THREE.MeshPhongMaterial({color: Math.random()*0xffffff, shininess: 100, side: THREE.DoubleSide});
    box = new THREE.Mesh(geometry, material);
    box.position.set(25,-5,-2);
    boxes.push(box);

    geometry = new THREE.BoxGeometry(2000,1,2000);
    material = new THREE.MeshPhongMaterial({color: 0xfff000, shininess: 100, side: THREE.DoubleSide});
    box = new THREE.Mesh(geometry, material);
    box.position.set(0,-6,0);
    boxes.push (box);

    boxes.forEach(b => scene.add(b));
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 20;

    target1 = new THREE.Object3D();

    target2 = new THREE.Object3D();

    scene.add(target1);
    scene.add(target2);

    light1 = new THREE.SpotLight(Math.random()*0xffffff, 1);
    light1.position.set(0,50,0);
    light1.angle = 0.1;
    light1.penumbra = 0.05;
    light1.decay = 2;
    light1.distance = 200;
    light1.target = target1;
    scene.add(light1);

    light2 = new THREE.SpotLight(Math.random()*0xffffff, 1);
    light2.position.set(0,50,0);
    light2.angle = 0.1;
    light2.penumbra = 0.05;
    light2.decay = 2;
    light2.distance = 200;
    light2.target = target2;
    scene.add(light2);

    let ambient = new THREE.AmbientLight(0xffffff, 0.04);
    scene.add(ambient);

    createGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    target1.position.x += ADD;
    target2.position.x -= ADD;
    if (target1.position.x <= -25 || target1.position.x >= 25) ADD *= -1;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();