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



// set up Argon
var app = Argon.init();
// set up THREE.  Create a scene, a perspective camera and an object
// for the user's location
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera();
var userLocation = new THREE.Object3D;
scene.add(camera);
scene.add(userLocation);
// The CSS3DArgonRenderer supports mono and stereo views, and 
// includes both 3D elements and a place to put things that appear 
// fixed to the screen (heads-up-display) 
var renderer = new THREE.CSS3DArgonRenderer();
app.view.element.appendChild(renderer.domElement);
// to easily control stuff on the display
var hud = new THREE.CSS3DArgonHUD();
// We put some elements in the index.html, for convenience. 
// Here, we retrieve the description box and move it to the 
// the CSS3DArgonHUD hudElements[0].  We only put it in the left
// hud since we'll be hiding it in stereo
var description = document.getElementById('description');
hud.hudElements[0].appendChild(description);
app.view.element.appendChild(hud.domElement);
// Tell argon what local coordinate system you want.  The default coordinate
// frame used by Argon is Cesium's FIXED frame, which is centered at the center
// of the earth and oriented with the earth's axes.  
// The FIXED frame is inconvenient for a number of reasons: the numbers used are
// large and cause issues with rendering, and the orientation of the user's "local
// view of the world" is different that the FIXED orientation (my perception of "up"
// does not correspond to one of the FIXED axes).  
// Therefore, Argon uses a local coordinate frame that sits on a plane tangent to 
// the earth near the user's current location.  This frame automatically changes if the
// user moves more than a few kilometers.
// The EUS frame cooresponds to the typical 3D computer graphics coordinate frame, so we use
// that here.  The other option Argon supports is localOriginEastNorthUp, which is
// more similar to what is used in the geospatial industry
app.context.setDefaultReferenceFrame(app.context.localOriginEastUpSouth);
// creating 6 divs to indicate the x y z positioning
var divXpos = document.createElement('div');
var divXneg = document.createElement('div');
var divYpos = document.createElement('div');
var divYneg = document.createElement('div');
var divZpos = document.createElement('div');
var divZneg = document.createElement('div');
// programatically create a stylesheet for our direction divs
// and add it to the document
var style = document.createElement("style");
style.type = 'text/css';
document.head.appendChild(style);
var sheet = style.sheet;
sheet.insertRule("\n    .cssContent {\n        opacity: 0.5;\n        width: 100px;\n        height: 100px;\n        border-radius: 50%;\n        line-height: 100px;\n        fontSize: 20px;\n        text-align: center;\n    }\n", 0);
// Put content in each one  (should do this as a couple of functions)
// for X
divXpos.className = "cssContent";
divXpos.style.backgroundColor = "red";
divXpos.innerText = "Pos X = East";
divXneg.className = "cssContent";
divXneg.style.backgroundColor = "red";
divXneg.innerText = "Neg X = West";
// for Y
divYpos.className = "cssContent";
divYpos.style.backgroundColor = "blue";
divYpos.innerText = "Pos Y = Up";
divYneg.className = "cssContent";
divYneg.style.backgroundColor = "blue";
divYneg.innerText = "Neg Y = Down";
//for Z
divZpos.className = "cssContent";
divZpos.style.backgroundColor = "green";
divZpos.innerText = "Pos Z = South";
divZneg.className = "cssContent";
divZneg.style.backgroundColor = "green";
divZneg.innerText = "Neg Z = North";
// create 6 CSS3DObjects in the scene graph.  The CSS3DObject object 
// is used by the CSS3DArgonRenderer. Because an HTML element can only
// appear once in the DOM, we need two elements to create a stereo view.
// The CSS3DArgonRenderer manages these for you, using the CSS3DObject.
// You can pass a single DIV to the CSS3DObject, which
// will be cloned to create a second matching DIV in stereo mode, or you
// can pass in two DIVs in an array (one for the left and one for the 
// right eyes).  If the content of the DIV does not change as the 
// application runs, letting the CSS3DArgonRenderer clone them is 
// simplest.  If it is changing, passing in two and updating both
// yourself is simplest.
var cssObjectXpos = new THREE.CSS3DObject(divXpos);
var cssObjectXneg = new THREE.CSS3DObject(divXneg);
var cssObjectYpos = new THREE.CSS3DObject(divYpos);
var cssObjectYneg = new THREE.CSS3DObject(divYneg);
var cssObjectZpos = new THREE.CSS3DObject(divZpos);
var cssObjectZneg = new THREE.CSS3DObject(divZneg);
// the width and height is used to align things.
cssObjectXpos.position.x = 200.0;
cssObjectXpos.position.y = 0.0;
cssObjectXpos.position.z = 0.0;
cssObjectXpos.rotation.y = -Math.PI / 2;
cssObjectXneg.position.x = -200.0;
cssObjectXneg.position.y = 0.0;
cssObjectXneg.position.z = 0.0;
cssObjectXneg.rotation.y = Math.PI / 2;
// for Y
cssObjectYpos.position.x = 0.0;
cssObjectYpos.position.y = 200.0;
cssObjectYpos.position.z = 0.0;
cssObjectYpos.rotation.x = Math.PI / 2;
cssObjectYneg.position.x = 0.0;
cssObjectYneg.position.y = -200.0;
cssObjectYneg.position.z = 0.0;
cssObjectYneg.rotation.x = -Math.PI / 2;
// for Z
cssObjectZpos.position.x = 0.0;
cssObjectZpos.position.y = 0.0;
cssObjectZpos.position.z = 200.0;
cssObjectZpos.rotation.y = Math.PI;
cssObjectZneg.position.x = 0.0;
cssObjectZneg.position.y = 0.0;
cssObjectZneg.position.z = -200.0;
//no rotation need for this one
userLocation.add(cssObjectXpos);
userLocation.add(cssObjectXneg);
userLocation.add(cssObjectYpos);
userLocation.add(cssObjectYneg);
userLocation.add(cssObjectZpos);
userLocation.add(cssObjectZneg);
// the updateEvent is called each time the 3D world should be
// rendered, before the renderEvent.  The state of your application
// should be updated here.
app.updateEvent.addEventListener(function() {
    // get the position and orientation (the "pose") of the user
    // in the local coordinate frame.
    var userPose = app.context.getEntityPose(app.context.user);
    // assuming we know the user's pose, set the position of our 
    // THREE user object to match it
    if (userPose.poseStatus & Argon.PoseStatus.KNOWN) {
        userLocation.position.copy(userPose.position);
    }
});
// for the CSS renderer, we want to use requestAnimationFrame to 
// limit the number of repairs of the DOM.  Otherwise, as the 
// DOM elements are updated, extra repairs of the DOM could be 
// initiated.  Extra repairs do not appear to happen within the 
// animation callback.
var viewport = null;
var subViews = null;
var rAFpending = false;
app.renderEvent.addEventListener(function() {
    // only schedule a new callback if the old one has completed
    if (!rAFpending) {
        rAFpending = true;
        viewport = app.view.getViewport();
        subViews = app.view.getSubviews();
        window.requestAnimationFrame(renderFunc);
    }
});
// the animation callback.  
function renderFunc() {
    // if we have 1 subView, we're in mono mode.  If more, stereo.
    var monoMode = subViews.length == 1;
    rAFpending = false;
    // set the renderer to know the current size of the viewport.
    // This is the full size of the viewport, which would include
    // both views if we are in stereo viewing mode
    renderer.setSize(viewport.width, viewport.height);
    hud.setSize(viewport.width, viewport.height);
    // there is 1 subview in monocular mode, 2 in stereo mode
    for (var _i = 0, subViews_1 = subViews; _i < subViews_1.length; _i++) {
        var subview = subViews_1[_i];
        // set the position and orientation of the camera for 
        // this subview
        camera.position.copy(subview.pose.position);
        camera.quaternion.copy(subview.pose.orientation);
        // the underlying system provide a full projection matrix
        // for the camera.  Use it, and then update the FOV of the 
        // camera from it (needed by the CSS Perspective DIV)
        camera.projectionMatrix.fromArray(subview.projectionMatrix);
        camera.fov = subview.frustum.fovy * 180 / Math.PI;
        // set the viewport for this view
        var _a = subview.viewport,
            x = _a.x,
            y = _a.y,
            width = _a.width,
            height = _a.height;
        renderer.setViewport(x, y, width, height, subview.index);
        // render this view.
        renderer.render(scene, camera, subview.index);
        // adjust the hud, but only in mono
        if (monoMode) {
            hud.setViewport(x, y, width, height, subview.index);
            hud.render(subview.index);
        }
    }
}







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



