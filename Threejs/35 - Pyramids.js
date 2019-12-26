window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer, spotLight, plane, texture;
let ADD = 0.0075, theta = 0;

let RIR = (from, to) => from + (Math.random() * (to - from));

function createGeometry() {
    function createPyramid() {
        let material = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide});
        let geometry = new THREE.ConeGeometry(10, 15, 4);
        let pyramid = new THREE.Mesh(geometry, material);
        pyramid.position.set(RIR(-35,35), 0, RIR(-35,5));
        pyramid.castShadow = true;
        pyramid.receiveShadow = true;
        scene.add(pyramid);
    }

    texture = new THREE.TextureLoader().load(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROLZWbx2R1SzVG5nbp9DE2inV_dAgjAJK5duMc37SfRri6BTTqg&s`);

    for (let i = 0; i < 4; i++) createPyramid();

    texture = new THREE.TextureLoader().load(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu-SaTSETOZsYssQAz6PPxNAioUEZppMp4j07LnK94zIVLrsKC&s`);

    let geometry = new THREE.BoxGeometry(2000, 1, 2000);
    let material = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide});
    plane = new THREE.Mesh(geometry, material);
    plane.position.y = -1;
    plane.receiveShadow = true;
    scene.add(plane);
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    scene.fog = new THREE.Fog(0xf0f0f0);
 
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 5, 40);

    spotLight = new THREE.DirectionalLight(0xffffff, 1);
    spotLight.position.z = 40;
    spotLight.angle = Math.PI / 2;
    spotLight.penumbra - 0.05;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.castShadow = true;
    spotLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50,1,10,2500));
    spotLight.shadow.bias = 0.0001;
    spotLight.shadow.mapSize.width = window.innerWidth;
    spotLight.shadow.mapSize.height = window.innerHeight;

    scene.add(spotLight);
    
    createGeometry();
            
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    
    document.body.appendChild(renderer.domElement);
}

function mainLoop() {
    spotLight.position.x = -40 * Math.sin(theta);
    spotLight.position.y = 40 * Math.cos(theta);
    theta += ADD;
    
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
mainLoop();