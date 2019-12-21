window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, particles;
let ADD = 0.02;

let randomInRange = (from, to) => { return (Math.random() * (to - from)) + from; }

function createGeometry() {
    let material = new THREE.PointsMaterial({color: 0xffffff, size: 0.5});
    let geometry = new THREE.Geometry();

    for (let i = 1; i <= 1000; i++) {
        let x = randomInRange(-25,25);
        let y = randomInRange(-25,25);
        let z = randomInRange(-25,25);
        geometry.vertices.push(new THREE.Vector3(x,y,z));
    }

    geometry.computeBoundingSphere();
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 30;

    createGeometry();
    
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    
};

function mainLoop() {
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

init();
mainLoop();