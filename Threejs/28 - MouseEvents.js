window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, light, cube;
let ADD = 0.05;

function createGeometry() {
    let material = new THREE.MeshPhongMaterial({
        color: Math.random()*0xffffff, shininess: (Math.random()*20)+80, side: THREE.DoubleSide
    });
    let geometry = new THREE.BoxGeometry(5,5,5);
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 35);

    light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);
    
    createGeometry();
            
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    cube.rotation.x += ADD;
    cube.rotation.y += ADD;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

document.addEventListener('click', e => {
    console.log(convertCoordinates(e.clientX, e.clientY))
    ADD *= -1;
});

function convertCoordinates(x, y) {
    return {x: (x/window.innerWidth*2)-1, y: 1-(y/window.innerHeight*2)};
}

init();
mainLoop();