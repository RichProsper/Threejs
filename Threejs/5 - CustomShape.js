let scene, camera, renderer, shape;
let rotate = 0.02;

function createShape() {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(3,0,0));
    geometry.vertices.push(new THREE.Vector3(0,5,0));
    geometry.vertices.push(new THREE.Vector3(0,0,2));
    geometry.vertices.push(new THREE.Vector3(2,2,2));
    geometry.vertices.push(new THREE.Vector3(0,0,0));

    geometry.faces.push(new THREE.Face3(0,1,2));
    geometry.faces.push(new THREE.Face3(0,2,3));
    geometry.faces.push(new THREE.Face3(0,1,3));
    geometry.faces.push(new THREE.Face3(1,2,4));

    let material = new THREE.MeshBasicMaterial({
        color     : 0xffffff,
        side      : THREE.DoubleSide,
        wireframe : false
    });

    shape = new THREE.Mesh(geometry, material);
    scene.add(shape);
}


function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 20;

    createShape();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    // shape.rotation.x += rotate;
    // shape.rotation.y += rotate/1.2;
    shape.geometry.vertices[1].y -= 0.003;
    shape.geometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();