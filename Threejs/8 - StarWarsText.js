let scene, camera, renderer, text;
let ADD = 0.06, theta = 0;

function createTextGeometry() {
    let loader = new THREE.FontLoader();
    let font = loader.parse(JSONFont);

    let titles = "Lorem ipsum dolor sit amet, consectetur\n adipiscing elit, sed do eiusmod tempor incididunt ut\n labore et dolore magna aliqua. Magna etiam tempor orci\n eu lobortis elementum nibh. In massa tempor nec feugiat\n nisl pretium. Tristique sollicitudin nibh sit amet\n commodo. Augue mauris augue neque gravida in fermentum\n et sollicitudin. Et netus et malesuada fames ac turpis\n egestas maecenas. A erat nam at lectus urna duis\n convallis convallis. Ut tortor pretium viverra\n suspendisse potenti. Id semper risus in hendrerit\n gravida rutrum quisque. Rhoncus dolor purus non enim\n praesent elementum facilisis leo. Lacus laoreet non\n curabitur gravida. Nisl rhoncus mattis rhoncus urna\n neque viverra justo nec. Et ligula ullamcorper\n malesuada proin. Nec dui nunc mattis enim ut tellus elementum\n sagittis vitae. Magna ac placerat vestibulum lectus\n  mauris ultrices. Facilisis sed odio morbi quis commodo\n odio. Nec nam aliquam sem et tortor consequat id porta\n nibh. Duis ultricies lacus sed turpis tincidunt. Porta\n nibh venenatis cras sed felis eget velit. Luctus\n venenatis lectus magna fringilla.";

    let geometry = new THREE.TextGeometry(
        titles,
        {
            font   : font,
            size   : 1.5,
            height : 0.1
        }
    );

    let material = new THREE.MeshBasicMaterial({color:0xffffff});
    text = new THREE.Mesh(geometry, material);

    text.position.x = -25;
    text.rotation.x = -0.9;
    scene.add(text);
}


function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 150);
    camera.position.set(0,5,40);

    createTextGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth-18, window.innerHeight-18);
    console.log(window.innerHeight, window.innerWidth);

    document.body.appendChild(renderer.domElement);
    window.addEventListener( 'resize', onWindowResize, false );
}

function mainLoop() {
    text.position.z -= ADD;
    text.position.y += ADD/1.5;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth-18, window.innerHeight-18);
}

init();
mainLoop();