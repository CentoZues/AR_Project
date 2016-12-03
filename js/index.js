//Remove ability for smartphone/tablets to scroll around the screen
$('html, body').on('touchstart touchmove', function(e) {

	e.preventDefault();

});


//////////////////////////
//         Map          //
//////////////////////////

var myMap = L.map('mapid', {
	center: [51.629619, -0.748514]
	//zoom: 13
});

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9iZXJ0aHVja3MiLCJhIjoiY2l2MHZxcDFnMDA0eDJ0dDl6cGhsbnE0dyJ9.Bz2HQaXOIdZnpjvct4hq0g').addTo(myMap);
var pulsingIcon = L.icon.pulse({iconSize:[20,20], color: 'blue'});
//Default Marker
var marker = L.marker([51.629619, -0.748514], {icon: pulsingIcon}).addTo(myMap);

//Set Path
L.Routing.control({
	waypoints: [
		L.latLng(51.630692, -0.754866),
		L.latLng(51.630716, -0.752818),
		L.latLng(51.630237, -0.751395),
		L.latLng(51.629330, -0.751587),
		L.latLng(51.627156, -0.752722),
		L.latLng(51.626712, -0.751070),
		L.latLng(51.625302, -0.746766),
		L.latLng(51.625655, -0.746381),
		L.latLng(51.627754, -0.744933),
		L.latLng(51.629814, -0.747010),
		L.latLng(51.630373, -0.746702),
		L.latLng(51.630800, -0.748020),
		L.latLng(51.632365, -0.747696),
		L.latLng(51.633427, -0.748983)
	],
	options: {
		profile: 'mapbox/walking',
		useHints: false
	},
	createMarker: function(i, wp, nWps) {
		//Numbered Markers
		if (i > 0 && i < (nWps - 1)) {
			return L.marker(wp.latLng, {
				pinId: (i + 1),
				draggable: false,
				icon: L.ExtraMarkers.icon({
					icon: 'fa-number',
					number: (i + 1),
					markerColor: 'blue'
				})
			}).on('click touchstart', onPinTap);
		} else if (i == 0) { //First Marker
			return L.marker(wp.latLng, {
				pinId: (i + 1),
				draggable: false,
				icon: L.ExtraMarkers.icon({
					icon: 'pin icon',
					shape: 'star',
					markerColor: 'blue'
				})
			}).on('click touchstart', onPinTap);
		} else if (i == (nWps - 1)) { //Last Marker
			return L.marker(wp.latLng, {
				pinId: (i + 1),
				draggable: false,
				icon: L.ExtraMarkers.icon({
					icon: 'flag outline icon',
					shape: 'star',
					markerColor: 'red'
				})
			}).on('click touchstart', onPinTap);
		}
		
	},
	draggableWaypoints: false,
	addWaypoints: false,
	show: false,
	routeWhileDragging: false,
	router: L.Routing.mapbox('pk.eyJ1Ijoicm9iZXJ0aHVja3MiLCJhIjoiY2l2Ymc5d2pwMDAzZDJ5bDU2YmR2ZmJkayJ9.CDEBc8_Q-SZG-jxhHtRQ3A')
}).addTo(myMap);

function onPinTap(e) {
	//console.log(this);
	console.log("Pin ID: ", this.options.pinId);
	$.fn.fullpage.moveTo(3, 0);
}



//////////////////////////
//   Gesture Controls   //
//////////////////////////

var trackingElement = document.getElementById('walkPicker');
var motionCap = new Hammer(trackingElement);

motionCap.on('swipeleft swiperight', function(ev) {
	console.log("Gesture: " + ev.type);
	if(ev.type == 'swipeleft') {
		//move forward one element
		$.fn.fullpage.moveSlideRight();
	} else if (ev.type == 'swiperight') {
		//move back one element
		$.fn.fullpage.moveSlideLeft();
	}
});



//////////////////////////
//    Pin Management    //
//////////////////////////

function toggleVisited(id) {

};

function toggleCurrentlyAt(id) {
	
};



////////////////////
//    Argon.js    //
////////////////////

//Create Argon object
var ARPage = Argon.init();
ARPage.context.setDefaultReferenceFrame(ARPage.context.localOriginEastUpSouth);

//Initialise ThreeJS and create scene.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera();
var userLocation = new THREE.Object3D;
scene.add(camera);
scene.add(userLocation);
var renderer = new THREE.WebGLRenderer({
	alpha: true,
	logarithmicDepthBuffer: true
});
renderer.setPixelRatio(window.devicePixelRatio);
app.view.element.appendChild(renderer.domElement);

//Add Box to scene
var boxGeoObject = new THREE.Object3D();
var box = new THREE.Object3D();
var loader = new THREE.TextureLoader();
loader.load("box.png", function (texture) {
	var geometry = new THREE.BoxGeometry(2, 2, 2);
	var material = new THREE.MeshBasicMaterial( {
		map: texture
	});
	var mesh = new THREE.Mesh(geometry, material);
	box.add(mesh);
});
boxGeoObject.add(box);

var boxGeoEntity = new Argon.Cesium.Entity({
	name: "Box",
	position: Cartesian3.ZERO,
	orientation: Cesium.Quaternion.IDENTITY
});

// the updateEvent is called each time the 3D world should be
// rendered, before the renderEvent.  The state of your application
// should be updated here.
var boxInit = false;

app.updateEvent.addEventListener(function (frame) {
    // get the position and orientation (the 'pose') of the user
    // in the local coordinate frame.
    var userPose = app.context.getEntityPose(app.context.user);

    // assuming we know the user's pose, set the position of our 
    // THREE user object to match it
    if (userPose.poseStatus & Argon.PoseStatus.KNOWN) {
        userLocation.position.copy(userPose.position);
    }
    else {
        // if we don't know the user pose we can't do anything
        return;
    }
    // the first time through, we create a geospatial position for
    // the box somewhere near us 
    if (!boxInit) {
        var defaultFrame = app.context.getDefaultReferenceFrame();

        // set the box's position to 10 meters away from the user.
        // First, clone the userPose postion, and add 10 to the X
        var boxPos_1 = userPose.position.clone();
        boxPos_1.x += 10;

        // set the value of the box Entity to this local position, by
        // specifying the frame of reference to our local frame
        boxGeoEntity.position.setValue(boxPos_1, defaultFrame);

        // orient the box according to the local world frame
        boxGeoEntity.orientation.setValue(Cesium.Quaternion.IDENTITY);

        // now, we want to move the box's coordinates to the FIXED frame, so
        // the box doesn't move if the local coordinate system origin changes.
        if (Argon.convertEntityReferenceFrame(boxGeoEntity, frame.time, ReferenceFrame.FIXED)) {
            scene.add(boxGeoObject);
            boxInit = true;            
        }
    }
    // get the local coordinates of the local box, and set the THREE object
    var boxPose = app.context.getEntityPose(boxGeoEntity);
    boxGeoObject.position.copy(boxPose.position);
    boxGeoObject.quaternion.copy(boxPose.orientation);

    // rotate the boxes at a constant speed, independent of frame rates     
    // to make it a little less boring
    box.rotateY(3 * frame.deltaTime / 10000);
});

// renderEvent is fired whenever argon wants the app to update its display
app.renderEvent.addEventListener(function () {
    // set the renderer to know the current size of the viewport.
    // This is the full size of the viewport, which would include
    // both views if we are in stereo viewing mode
    var viewport = app.view.getViewport();
    renderer.setSize(viewport.width, viewport.height);

    // there is 1 subview in monocular mode, 2 in stereo mode    
    for (var _i = 0, _a = app.view.getSubviews(); _i < _a.length; _i++) {
        var subview = _a[_i];
        // set the position and orientation of the camera for 
        // this subview
        camera.position.copy(subview.pose.position);
        camera.quaternion.copy(subview.pose.orientation);

        // the underlying system provide a full projection matrix
        // for the camera
        camera.projectionMatrix.fromArray(subview.projectionMatrix);

        // set the viewport for this view
        var _b = subview.viewport, x = _b.x, y = _b.y, width = _b.width, height = _b.height;

        // set the webGL rendering parameters and render this view
        renderer.setViewport(x, y, width, height);
        renderer.setScissor(x, y, width, height);
        renderer.setScissorTest(true);
        renderer.render(scene, camera);
    }
});












//On Load
$(function() {
	//Slide settings
	$('#fullpage').fullpage({
		loopHorizontal: false,
		slidesNavigation: true,
		controlArrows: false,
		normalScrollElements: '.section'
	});
	$.fn.fullpage.setAllowScrolling(false);

	//Initialize sidebar
	$('#walkPage .ui.sidebar').sidebar({
		context: $('#walkPage'),
		silent: true,
		closable: true
	}).sidebar('attach events', '.ui.launch.button');

	//Get User Position (Constantly Polling)
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showAccuratePosition, positionError, {enableHighAccuracy: true});
	} else {
		alert("GeoLocation not supported. Please enable GPS.");
	}

	function showAccuratePosition(position) {
		marker.setLatLng({lat: position.coords.latitude, lng: position.coords.longitude});
		//console.log("Location updated: ", position.coords);
	}

	function positionError(err) {
		if (err.code == 1) {
			console.log("To use this feature, please allow location services.");
		} else if (err.code == 2) {
			console.log("Unable to obtain location, cannot find position. Please try again.");
		} else if (err.code == 3) {
			console.log("Unable to obtain location, response timed out. Please try again.");
		}
	}



	//////////////////////////
	//    Button Presses    //
	//////////////////////////


	//iOS Safari Fix for button press

	//Button to Map View
	$(document).on('click touchstart', '.toMapView', function() {
		//alert("Button Pressed ( -> Map View )");
		$.fn.fullpage.moveTo(2);
		//$('#walkPage .ui.sidebar').sidebar('show');
	});

	//Home Button
	$(document).on('click touchstart', '.toHome', function() {
		//alert("Button Pressed ( -> Home )");
		$.fn.fullpage.moveTo(1);
		$('#walkPage .ui.sidebar').sidebar('hide');
	});

	//Sidebar Button
	$(document).on('click touchstart', '.sidebartoggle', function() {
		//alert("Button Pressed ( Sidebar Toggled )");
		$('#walkPage .ui.sidebar').sidebar('show');
	});

});
