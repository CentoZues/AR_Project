//Manages the whole app
class WalkManager {
	constructor() {
		this.walks = [];
	}

	addWalk(name, defaultLat, defaultLng) {
		this.walks.push(new Walk(this.walks.length, name, defaultLat, defaultLng));
	}

	loadWalks(data) {
		//Creates all of the Map/Walk/Pin objects from the JSON object
		console.log("Loading in walks", data);
		var manager = this;
		//Loop through Walks
		jQuery.each(data.walks, function(i, walkVal) {
			//console.log(walkVal);
			manager.addWalk(walkVal.name, walkVal.backgroundImg, walkVal.lat, walkVal.lng);
			//Loop through Pins
			jQuery.each(walkVal.pins, function(i, pinVal) {
				//console.log(pinVal);
				manager.walks[(manager.walks.length - 1)].addPin(pinVal.lat, pinVal.lng, pinVal.name);
			});
		});

		//this.display();
		
	}

	display() {
		console.log(JSON.stringify(this, null, 4));
	}

	createPages() {
		//For each walk
		for(var i = 0; i < this.walks.length; i++) {
			//Add the selection page
			PageManager.newSelectionPage(this.walks[i].getName(), this.walks[i].getId(), this.walks[i].getBackground());
		}
	}

	getWalk(id) {
		return this.walks[id];
	}
}

//Manages each walk
class Walk {
	constructor(id, name, backgroundImg, defaultLat, defaultLng) {
		this.id = id;
		this.name = name;
		this.selectionBackground = backgroundImg;
		//Default Lat/Lng are for centering the map
		this.lat = defaultLat;
		this.lng = defaultLng;
		this.pins = [];

		//PageManager.newSelectionPage(this.name, this.id, this.selectionBackground);
		//PageManager.newMapPage(this.name, this.id, this.selectionBackground);
	}

	addPin(lat, lng, name) {
		this.pins.push(new Pin(this.pins.length, lat, lng, name));
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}

	getBackground() {
		return this.selectionBackground;
	}

	getLat() {
		return this.lat;
	}

	getLng() {
		return this.lng;
	}

	getPins() {
		return this.pins;
	}
}

//Holds the pin
class Pin {
	constructor(id, lat, lng, name) {
		this.id = id;
		this.lat = lat;
		this.lng = lng;
		this.name = name;
	}
	
	getLat() {
		return this.lat;
	}

	getLng() {
		return this.lng;
	}
}

class PageManager {
	constructor() {}

	static newSelectionPage(walkName, id, img) {

		var selectionPageHTML = '<div id="' + walkName.split(' ').join('_') + '" class="slide"><div class="pageTitle">';
		selectionPageHTML += '<h1><b>' + walkName + '</b></h1></div>';
		selectionPageHTML += '<div class="pageButton"><a class="circular ui icon button black tapable toMapView" data-map="' + id + '"><i class="arrow down icon"></i>';
		selectionPageHTML += '</a></div></div>';
		$('#walkPicker').append(selectionPageHTML);

		//Background of slide to image
		$('#' + walkName.split(' ').join('_')).css('background', "url('" + img + "') no-repeat center center");
		$('#' + walkName.split(' ').join('_')).css('-webkit-background-size', "cover");
		$('#' + walkName.split(' ').join('_')).css('-moz-background-size', "cover");
		$('#' + walkName.split(' ').join('_')).css('-o-background-size', "cover");
		$('#' + walkName.split(' ').join('_')).css('background-size', "cover");

		//$('#' + walkName.split(' ').join('_')).css('background-color', "red");

	}

	static mapPagePins(pins) {
		var pinHTML = '';
		//Loop through each pin and add to the pin list in the sidebar
		jQuery.each(pins, function(i, val) {
			pinHTML += '<div class="item pin visitedPin">\
				<div class="ui grid">\
					<div class="row pinInfo">\
						<div class="two wide column pinInfoColumn">\
							<span class="pinInfoContent">1.</span>\
						</div>\
						<div class="ten wide column pinInfoColumn">\
							<span class="pinInfoContent">Tourist Information Centre</span>\
						</div>\
						<div class="four wide column pinInfoColumn">\
							<span class="pinInfoContent"><i class="big check circle outline green icon"></i></span>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="item distance">\
				<div class="ui grid">\
					<div class="centered row pinDistance">\
						<div class="three wide column">\
							<i class="clockwise rotated level up icon"></i>\
						</div>\
						<div class="ten wide column">\
							Distance: 100 meters\
						</div>\
						<div class="three wide column">\
							<i class="level down icon"></i>\
						</div>\
					</div>\
				</div>\
			</div>';
		});
	}

	static updateMapRouting(mapObj, walkID) {
		console.log("Updating map pins!", walkID);
		var pinsArray = walkManager.getWalk(walkID).getPins();

		//Create waypoint array
		var waypointsArray = [];
		for (var i = 0; i < pinsArray.length; i++) {
			waypointsArray.push(L.latLng(pinsArray[i].getLat(), pinsArray[i].getLng()));
		}

		//Set Path
		var mapControl = L.Routing.control({
			waypoints: waypointsArray,
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
	}

	static newContentARPage() {

	}

	static newContentStaticPage() {

	}
}

var walkManager = new WalkManager();

//Get JSON and load it in to objects
$.getJSON("json/walks.json", function(data) {
	walkManager.loadWalks(data);
	walkManager.createPages();
});



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
	center: [51.629619, -0.748514],
	zoom: 13
});

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9iZXJ0aHVja3MiLCJhIjoiY2l2MHZxcDFnMDA0eDJ0dDl6cGhsbnE0dyJ9.Bz2HQaXOIdZnpjvct4hq0g').addTo(myMap);
var pulsingIcon = L.icon.pulse({iconSize:[20,20], color: 'blue'});
//Default Marker
var marker = L.marker([51.629619, -0.748514], {icon: pulsingIcon}).addTo(myMap);



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
	$('#walkPicker').on('click touchstart', '.toMapView', function() {
		alert("Button Pressed ( -> Map View #" + $(this).attr('data-map') + ")");
		//Set Map to use the correct positioning and pins
		PageManager.updateMapRouting(myMap, $(this).attr('data-map'));
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

    $(document).on('click touchstart', '.videoOptionButton', function() {
    	console.log('videoOptionButtons pressed');
    	$.fn.fullpage.moveTo(2);
    });

    $('#backToMapButton').on('click touchstart', function() {
    	console.log('backToMapButton pressed');
    	$.fn.fullpage.moveTo(2);
    });

});