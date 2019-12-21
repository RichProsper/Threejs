window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let scene, camera, renderer;
let triangles = [];
let normalVectors = [];
let distances = [];
let ADD = 0.1;

function createTriangles() {
    let g1 = new THREE.Geometry();
    g1.vertices.push(new THREE.Vector3(0,2,0));
    g1.vertices.push(new THREE.Vector3(1,0,1));
    g1.vertices.push(new THREE.Vector3(-1,0,1));
    g1.faces.push(new THREE.Face3(0,1,2));
    let m1 = new THREE.MeshBasicMaterial({
        color: 0x72f0ee, side: THREE.DoubleSide
    });
    triangles.push(new THREE.Mesh(g1, m1));

    let g2 = new THREE.Geometry();
    g2.vertices.push(new THREE.Vector3(0,2,0));
    g2.vertices.push(new THREE.Vector3(1,0,-1));
    g2.vertices.push(new THREE.Vector3(-1,0,-1));
    g2.faces.push(new THREE.Face3(0,1,2));
    let m2 = new THREE.MeshBasicMaterial({
        color: 0x89e82d, side: THREE.DoubleSide
    });
    triangles.push(new THREE.Mesh(g2, m2));

    let g3 = new THREE.Geometry();
    g3.vertices.push(new THREE.Vector3(0,2,0));
    g3.vertices.push(new THREE.Vector3(-1,0,1));
    g3.vertices.push(new THREE.Vector3(-1,0,-1));
    g3.faces.push(new THREE.Face3(0,1,2));
    let m3 = new THREE.MeshBasicMaterial({
        color: 0x26bc5d, side: THREE.DoubleSide
    });
    triangles.push(new THREE.Mesh(g3, m3));

    let g4 = new THREE.Geometry();
    g4.vertices.push(new THREE.Vector3(0,2,0));
    g4.vertices.push(new THREE.Vector3(1,0,1));
    g4.vertices.push(new THREE.Vector3(1,0,-1));
    g4.faces.push(new THREE.Face3(0,1,2));
    let m4 = new THREE.MeshBasicMaterial({
        color: 0x40abe1, side: THREE.DoubleSide
    });
    triangles.push(new THREE.Mesh(g4, m4));

    let g5 = new THREE.Geometry();
    g5.vertices.push(new THREE.Vector3(0,-2,0));
    g5.vertices.push(new THREE.Vector3(1,0,1));
    g5.vertices.push(new THREE.Vector3(-1,0,1));
    g5.faces.push(new THREE.Face3(0,1,2));
    let m5 = new THREE.MeshBasicMaterial({
        color: 0x2187d0, side: THREE.DoubleSide
    });
    triangles.push(new THREE.Mesh(g5, m5));

    let g6 = new THREE.Geometry();
    g6.vertices.push(new THREE.Vector3(0,-2,0));
    g6.vertices.push(new THREE.Vector3(1,0,-1));
    g6.vertices.push(new THREE.Vector3(-1,0,-1));
    g6.faces.push(new THREE.Face3(0,1,2));
    let m6 = new THREE.MeshBasicMaterial({
        color: 0x3e4c4a, side: THREE.DoubleSide
    });
    triangles.push(new THREE.Mesh(g6, m6));

    let g7 = new THREE.Geometry();
    g7.vertices.push(new THREE.Vector3(0,-2,0));
    g7.vertices.push(new THREE.Vector3(-1,0,1));
    g7.vertices.push(new THREE.Vector3(-1,0,-1));
    g7.faces.push(new THREE.Face3(0,1,2));
    let m7 = new THREE.MeshBasicMaterial({
        color: 0x750117, side: THREE.DoubleSide
    });
    triangles.push(new THREE.Mesh(g7, m7));

    let g8 = new THREE.Geometry();
    g8.vertices.push(new THREE.Vector3(0,-2,0));
    g8.vertices.push(new THREE.Vector3(1,0,1));
    g8.vertices.push(new THREE.Vector3(1,0,-1));
    g8.faces.push(new THREE.Face3(0,1,2));
    let m8 = new THREE.MeshBasicMaterial({
        color: 0x79b275, side: THREE.DoubleSide
    });
    triangles.push(new THREE.Mesh(g8, m8));

    triangles.forEach(t => scene.add(t));
}


function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 20;

    createTriangles();
    triangles.forEach(t => {
        let mp1 = midpoint(
            {x: t.geometry.vertices[0].x, y: t.geometry.vertices[0].y, z: t.geometry.vertices[0].z},
            {x: t.geometry.vertices[1].x, y: t.geometry.vertices[1].y, z: t.geometry.vertices[1].z}
        );
        let mp2 = midpoint(
            mp1, {x: t.geometry.vertices[2].x, y: t.geometry.vertices[2].y, z: t.geometry.vertices[2].z}
        );
        normalVectors.push(normalVector({x: 0, y: 0, z:0}, mp2));
        distances.push(0);
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 
}

function mainLoop() {
    for (let i = 0; i < triangles.length; i++) {
        ADD += 0.001;
        distances[i] += ADD;

        let nP = newPosition(i, normalVectors[i]);
        let x = Math.abs(Math.round(normalVectors[i].x * 10));
        
        setTimeout(() => {
            triangles[i].position.x = nP.x;
            triangles[i].position.y = nP.y;
            triangles[i].position.z = nP.z;
        }, 1500);
        
        setTimeout(() => {
            if (x == 3) triangles[i].rotation.x += 0.1;
            else triangles[i].rotation.z += 0.1;
        }, 1550);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

function midpoint(pointA, pointB) {
    let midpoint = {
        x : (pointA.x + pointB.x) / 2,
        y : (pointA.y + pointB.y) / 2,
        z : (pointA.z + pointB.z) / 2
    };
    return midpoint;
}

function normalVector(pointA, pointB) {
    let vector = {
        x: pointB.x - pointA.x,
        y: pointB.y - pointA.y,
        z: pointB.z - pointA.z
    };

    let vectorLength = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));

    let normalVector = {
        x: vector.x / vectorLength,
        y: vector.y / vectorLength,
        z: vector.z / vectorLength
    };
    
    return normalVector;
}

function newPosition(i, V) {
    let newPosition = {
        x: distances[i] * V.x,
        y: distances[i] * V.y,
        z: distances[i] * V.z
    };
    return newPosition;
}

init();
mainLoop();