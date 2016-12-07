function startAR(pinID) {
    //Create 3D Scene
    var container, camera, scene, renderer, controls, geometry, mesh;

    container = document.getElementById('ARContainer');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    controls = new DeviceOrientationController(camera);
    controls.connect();
    controls.enableManualZoom = false;

    scene = new THREE.Scene();
    
    //Wireframe Sphere
    //var geometry = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 );
    var geometry = new THREE.SphereGeometry( 100, 20, 20 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff00ff, side: THREE.BackSide, wireframe: true } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );



    //Test Video Screen
    // var video = document.createElement('video');
    // video.width = 480;
    // video.height = 204;
    // video.autoplay = true;
    // video.loop = false;
    // video.src = 'vid/testvid.ogv';

    video = document.getElementById('video');
    makeVideoPlayableInline(video);
    video.volume = 0.01;

    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;


    var geometry = new THREE.PlaneGeometry( 480, 204, 4, 4 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var screen = new THREE.Mesh(geometry, material);
    screen.position.set(0, 0, -250);
    scene.add(screen);



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
    renderer.setClearColor( 0xffffff, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    container.appendChild(renderer.domElement);

    animate();

    function animate() {
        window.requestAnimationFrame(animate);
        controls.update();
        render();
    }

    function render() {
        
        renderer.render( scene, camera );
    }


    //On window resize.. Probably wont need because it'll be fullscreen on phone anyway. Doesn't hurt.
    window.addEventListener('resize', function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

    }, false);
}