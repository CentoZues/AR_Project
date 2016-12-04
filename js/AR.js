function startAR(pinID) {
    //Create 3D Scene
    var container, camera, scene, renderer, controls, geometry, mesh;

    var animate = function() {
        window.requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    container = document.getElementById('ARContainer');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    controls = new THREE.DeviceOrientationControls(camera);
    scene = new THREE.Scene();
    
    //Wireframe box
    var geometry = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff00ff, side: THREE.BackSide, wireframe: true } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //Load Video
    video = document.createElement('AR-video');
    video.src = "vid/testvid.ogv";

    videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side: THREE.DoubleSide } );
    var movieGeometry = new THREE.PlaneGeometry(240, 100, 4, 4);
    var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);
    movieScreen.position.set(0, 50, 0);
    scene.add(movieScreen);


    renderer = new THREE.WebGLRenderer( {alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    container.appendChild(renderer.domElement);

    //On window resize.. Probably wont need because it'll be fullscreen on phone anyway. Doesn't hurt.
    window.addEventListener('resize', function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

    }, false);

    animate();
}