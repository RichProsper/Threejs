window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, cube, sphere, cone;
let ADD = 0.02;

function createGeometry() {
    let material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide, color: 0x7fc5f9,  emissive: 0x25673d, emissiveIntensity: 0.4, metallness: 1, roughness: 0.3
    });

    let geometry = new THREE.BoxGeometry(3,3,3);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = -6;

    geometry = new THREE.SphereGeometry(3,30,30);
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = 0;

    geometry = new THREE.ConeGeometry(3,4,20,1,true);
    cone = new THREE.Mesh(geometry, material);
    cone.position.x = 7;

    scene.add(cube);
    scene.add(sphere);
    scene.add(cone);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 20;

    let directionalLightUp = new THREE.DirectionalLight(0xfffff);
    scene.add(directionalLightUp);

    createGeometry();
    
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
};

function mainLoop() {
    sphere.rotation.x += ADD;
    sphere.rotation.y += ADD;
    cube.rotation.x += ADD;
    cube.rotation.y += ADD/2;
    cone.rotation.x += ADD/3;
    cone.rotation.y += ADD/4;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

init();
mainLoop();