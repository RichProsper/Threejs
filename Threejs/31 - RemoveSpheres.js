window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, light1, rayCast, mouse;
let spheres = [];
let ADD = 0.15; //How fast the spheres will rise to the top of the screen

//Remove clicked ballon
document.addEventListener('click', e => {
    mouse.x = (e.clientX / window.innerWidth * 2) - 1;
    mouse.y = 1 - (e.clientY / window.innerHeight * 2);
    mouse.z = 1;

    rayCast.setFromCamera(mouse, camera);
    let intersects = rayCast.intersectObjects(scene.children);

    //Ensures program doesn't try to remove a clicked on blank space
    if (intersects.length === 0) return;

    scene.remove(intersects[0].object);
    intersects[0].object.geometry.dispose();
    intersects[0].object.material.dispose();
    intersects[0].object = undefined;

    let index = spheres.indexOf(intersects[0].object);
    if (index > -1) spheres.splice(index, 1);
});

let RIR = (from, to) => from + (Math.random() * (to - from));

function createSpheres() {
    let material = new THREE.MeshPhongMaterial({
        color: Math.random()*0xffffff, shininess: RIR(80,100), side: THREE.DoubleSide
    });
    let geometry  = new THREE.SphereGeometry(5, 30, 30);
    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(RIR(-40,40), RIR(-40,-20), RIR(-20,20));
    spheres.push(sphere);
    scene.add(sphere);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 40);

    light1 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light1);
    
    rayCast = new THREE.Raycaster();
    mouse = new THREE.Vector2(-1, -1);
            
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    if (Math.floor(Math.random() * 50) <= 1) createSpheres();
    spheres.forEach((s,i) => {
        s.position.y += ADD;
        if (s.position.y >= 30) {
            scene.remove(s);
            s.geometry.dispose();
            s.material.dispose();
            s = undefined;
            spheres.splice(i, 1);
        }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();