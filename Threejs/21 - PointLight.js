window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, cube, cone, plane, light, light2, sphere, sphere2;
let ADD = 0.02, theta = 0;

function createGeometry() {
    let geometry = new THREE.BoxGeometry(5,5,5);
    let material = new THREE.MeshPhongMaterial({color: 0xfd12e0, shininess: 100, side: THREE.DoubleSide});

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -7;
    cube.position.y = -5;
    cube.rotation.x = 0.2;
    cube.rotation.y = 0.2;

    geometry = new THREE.ConeGeometry(3,4,20,1,true);
    cone = new THREE.Mesh(geometry, material);
    cone.position.x = 7;
    cone.position.y = -5;
    cone.rotation.x -= 0.6;
    cone.rotation.z -= 0.6;

    geometry = new THREE.PlaneGeometry(1000,1000,50,50);
    material = new THREE.MeshPhongMaterial({color: 0x0e21df, side: THREE.DoubleSide});
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -10;

    geometry = new THREE.SphereGeometry(1,30,30)
    material = new THREE.MeshBasicMaterial({color: 0xffffff});
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.y = 5;

    geometry = new THREE.SphereGeometry(1,30,30)
    material = new THREE.MeshBasicMaterial({color: 0xffffff});
    sphere2 = new THREE.Mesh(geometry, material);
    sphere2.position.y = 5;

    scene.add(cube);
    scene.add(cone);
    scene.add(plane);
    scene.add(sphere);
    scene.add(sphere2);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 25;

    light = new THREE.PointLight(0xffffff, 3, 150, 3);
    light.position.y = 5;
    light.position.z = -10;
    scene.add(light);

    light2 = new THREE.PointLight(0xffffff, 3, 150, 3);
    light2.position.y = 5;
    light2.position.z = -10;
    scene.add(light2);

    createGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    if (Math.floor(Math.random() * 555) <= 1) {
        let color = new THREE.Color(Math.random()*0xffffff);
        light.color = color;
        sphere.material.color = color;
    }

    light.position.y = sphere.position.y = -15 * Math.sin(theta);
    light.position.z = sphere.position.z = -10 * Math.cos(theta);
    theta += ADD;

    if (Math.floor(Math.random() * 555) <= 1) {
        let color2 = new THREE.Color(Math.random()*0xffffff);
        light2.color = color2;
        sphere2.material.color = color2;
    }

    light2.position.x = sphere2.position.x = 15 * Math.sin(theta);
    light2.position.z = sphere2.position.z = 10 * Math.cos(theta);

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();