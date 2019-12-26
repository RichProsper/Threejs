window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, sphere, target, texture;
let ADD = 0.005;

function createGeometry() {
    texture = new THREE.TextureLoader().load(`https://miro.medium.com/max/6000/1*b-wEtEfULD7CBJtdeyO-5Q.jpeg`);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(2, 2);

    let material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
    let geometry = new THREE.SphereGeometry(5,100,100);
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
 
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    
    createGeometry();
            
    renderer = new THREE.WebGLRenderer({antialiasing: true});   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();