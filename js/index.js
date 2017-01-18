//Remove ability for smartphone/tablets to scroll around the screen
$('html, body').on('touchstart touchmove', function(e) {

	e.preventDefault();
	
});



$('div').each(function(){

	this.onclick = function() {};

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
			}).on('click touchstart touchend', onPinTap);
		} else if (i == 0) { //First Marker
			return L.marker(wp.latLng, {
				pinId: (i + 1),
				draggable: false,
				icon: L.ExtraMarkers.icon({
					icon: 'pin icon',
					shape: 'star',
					markerColor: 'blue'
				})
			}).on('click touchstart touchend', onPinTap);
		} else if (i == (nWps - 1)) { //Last Marker
			return L.marker(wp.latLng, {
				pinId: (i + 1),
				draggable: false,
				icon: L.ExtraMarkers.icon({
					icon: 'flag outline icon',
					shape: 'star',
					markerColor: 'red'
				})
			}).on('click touchstart touchend', onPinTap);
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
	startAR(this.options.pinId);
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
	$(document).on('click touchstart touchend', '.toMapView', function() {
		//alert("Button Pressed ( -> Map View )");
		$.fn.fullpage.moveTo(2);
		//$('#walkPage .ui.sidebar').sidebar('show');
	});

	//Home Button
	$(document).on('click touchstart touchend', '.toHome', function() {
		//alert("Button Pressed ( -> Home )");
		$.fn.fullpage.moveTo(1);
		$('#walkPage .ui.sidebar').sidebar('hide');
	});

	//Sidebar Button
	$(document).on('click touchstart touchend', '.sidebartoggle', function() {
		//alert("Button Pressed ( Sidebar Toggled )");
		$('#walkPage .ui.sidebar').sidebar('show');
	});

	//Return button
    $(document).on('click touchstart touchend', '.toReturn', function() {
        //alert("Button Pressed ( -> Map View )");
        $.fn.fullpage.moveTo(2);
    });


});