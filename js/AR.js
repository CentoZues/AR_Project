function startAR(imagePath, offsetDeg, containerName) {

    //Create 3D Scene
    var container, camera, scene, renderer, controls, geometry, mesh, id;
    //var sceneRotation = compassHeading;
    var sceneRotation = 360 - compassHeading;
    container = document.getElementById(containerName);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    controls = new DeviceOrientationController(camera);
    controls.connect();
    controls.enableManualZoom = false;

    scene = new THREE.Scene();


    //Background Image
    var geometry = new THREE.SphereGeometry(3000, 64, 64);
    geometry.scale( - 1, 1, 1 );

    var material = new THREE.MeshBasicMaterial( {
        //map: new THREE.TextureLoader().load('textures/backgroundTexture.jpg')
        map: new THREE.TextureLoader().load(imagePath)
    });
    
    var mesh = new THREE.Mesh(geometry, material);
    //Rotation to match North
    mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -(THREE.Math.degToRad(offsetDeg)));
    //Rotation to match user angle
    console.log("Rotation used", sceneRotation);
    mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), -(THREE.Math.degToRad(sceneRotation)));
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0xffffff, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    container.appendChild(renderer.domElement);

    animate();

    function animate() {
        id = window.requestAnimationFrame(animate);
        controls.update();
        render();

    }

    function render() {
        
        renderer.render( scene, camera );
        if(window.curSlide != 4) {
            console.log("kill!");
            killScene();
        }
    }

    function killScene() {
        renderer.forceContextLoss();
        cancelAnimationFrame(id);
        renderer.domElement.addEventListener('dblclick', null, false);
        scene = null;
        projector = null;
        camera = null;
        controls = null;
    }

    //On window resize.. Probably wont need because it'll be fullscreen on phone anyway. Doesn't hurt.
    window.addEventListener('resize', function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

    }, false);
        
    
}