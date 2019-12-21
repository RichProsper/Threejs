window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, cylinder, sphere;
let ADD = 0.02;

function createGeometry() {
    // let material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 1});
    
    // let material = new THREE.LineDashedMaterial({
    //     color: 0xffffff, linewidth: 1, dashSize: 5, gapSize: 1
    // });
    
    let material = new THREE.PointsMaterial({color: 0xffffff});
    
    let geometry = new THREE.CylinderGeometry(3, 2, 4);
    // cylinder = new THREE.Line(geometry, material);
    cylinder = new THREE.Points(geometry, material);
    cylinder.position.z = -10;
    cylinder.position.x = -5;
    
    geometry.computeLineDistances();
    
    geometry = new THREE.SphereGeometry(3, 30, 30);
    sphere = new THREE.Line(geometry, material);
    // sphere = new THREE.Points(geometry, material);
    
    sphere.position.z = 0;
    sphere.position.x = 5;
    
    geometry.computeLineDistances();
    
    scene.add(cylinder);
    scene.add(sphere);
};

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 15;

    let light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    let light2 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light2);
    createGeometry();
    
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
};

function mainLoop() {
    cylinder.rotation.x += ADD;
    sphere.rotation.x += ADD;
    
    cylinder.rotation.y += ADD;
    sphere.rotation.y += ADD;
    
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

///////////////////////////////////////////////
init();
mainLoop();