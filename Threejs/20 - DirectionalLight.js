window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, cube, cone, plane, light, sphere, lightHelper;
let ADD = 0.05;

function createGeometry() {
    let geometry = new THREE.BoxGeometry(5,5,5);
    let material = new THREE.MeshPhongMaterial({color: 0x555555, shininess: 100, side: THREE.DoubleSide});

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -6;
    cube.position.y = -5;
    cube.position.z = -10;

    geometry = new THREE.ConeGeometry(3,4,20,1,true);
    cone = new THREE.Mesh(geometry, material);
    cone.position.x = 7;
    cone.position.y = -5;

    geometry = new THREE.PlaneGeometry(1000,1000,50,50);
    material = new THREE.MeshPhongMaterial({color: 0xaaaaaa, side: THREE.DoubleSide});
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -100;

    geometry = new THREE.SphereGeometry(1,30,30)
    material = new THREE.MeshBasicMaterial({color: 0xffd700});
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = -5;
    sphere.position.y = 5;
    sphere.position.z = 5;

    scene.add(cube);
    scene.add(cone);
    scene.add(plane);
    scene.add(sphere);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 18;

    light = new THREE.DirectionalLight(0xffd700);
    light.position.x = -5;
    light.position.y = 5;
    light.position.z = 5;
    scene.add(light);

    lightHelper = new THREE.DirectionalLightHelper(light, 4, 0x000000);
    scene.add(lightHelper);

    createGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    if (Math.floor(Math.random() * 500) <= 1) {
        let color = Math.random()*0xffffff;
        light.color = new THREE.Color(color);
        sphere.material.color = new THREE.Color(color);
    }

    light.position.x += ADD;
    sphere.position.x += ADD;
    if (light.position.x <= -10 || light.position.x >= 10) ADD *= -1;

    lightHelper.update();

    // cube.rotation.y += ADD;
    // cone.rotation.x -= ADD;

    console.log(light.intensity);
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();