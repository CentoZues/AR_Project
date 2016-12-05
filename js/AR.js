function startAR(pinID) {
    //Create 3D Scene
    var container, camera, scene, renderer, controls, geometry, mesh;

    container = document.getElementById('ARContainer');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    controls = new THREE.DeviceOrientationControls(camera);
    scene = new THREE.Scene();
    
    //Wireframe Sphere
    //var geometry = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 );
    var geometry = new THREE.SphereGeometry( 100, 20, 20 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff00ff, side: THREE.BackSide, wireframe: true } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //Load Video
    video = document.createElement('AR-video');
    video.width = 480;
    video.height = 204;
    video.autoplay = true;
    video.src = "vid/big-buck-bunny_trailer.webm";

    //Create Video Texture/Material
    var videoTexture = new THREE.Texture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    var videoMaterial = new THREE.MeshBasicMaterial( { map: videoTexture } );

    //Video Screen Mesh
    var videoScreenGeometry = new THREE.PlaneGeometry(240, 100, 4, 4);
    var videoScreen = new THREE.Mesh(videoScreenGeometry, videoMaterial);
    scene.add(videoScreen);



    //X Axis
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 50; //Forward
    cube.position.y = 0; //Up
    cube.position.z = 0; //Side
    scene.add(cube);

    //Y Axis
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0; //Forward
    cube.position.y = 50; //Up
    cube.position.z = 0; //Side
    scene.add(cube);

    //Z Axis
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0; //Forward
    cube.position.y = 0; //Up
    cube.position.z = 50; //Side
    scene.add(cube);

    renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    container.appendChild(renderer.domElement);

    function animate() {
        window.requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        render();
    }

    function render() {
        if( video.readyState === video.HAVE_ENOUGH_DATA ){
          videoTexture.needsUpdate = true;
        }
    }


    //On window resize.. Probably wont need because it'll be fullscreen on phone anyway. Doesn't hurt.
    window.addEventListener('resize', function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

    }, false);

    animate();
}