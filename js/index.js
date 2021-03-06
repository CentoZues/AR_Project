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
		//console.log("Loading in walks", data);
		var manager = this;
		//Loop through Walks
		jQuery.each(data.walks, function(i, walkVal) {
			//console.log(walkVal);
			manager.addWalk(walkVal.name, walkVal.backgroundImg, walkVal.lat, walkVal.lng);
			//Loop through Pins
			jQuery.each(walkVal.pins, function(i, pinVal) {
				//console.log(pinVal.contentLink);
				manager.walks[(manager.walks.length - 1)].addPin(pinVal.lat, pinVal.lng, pinVal.name, pinVal.contentLink, pinVal.distanceTo);
			});
		});

		//this.display();

	}

	display() {
		console.log(JSON.stringify(this, null, 4));
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

	addPin(lat, lng, name, contentLink, distanceTo) {
		contentLink += '?_=' + (new Date()).getTime();
		this.pins.push(new Pin(this.pins.length, lat, lng, name, contentLink, distanceTo));
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

	getPin(id) {
		return this.pins[id];
	}
}

//Holds the pin
class Pin {
	constructor(id, lat, lng, name, contentLink, distanceTo) {
		this.id = id;
		this.lat = lat;
		this.lng = lng;
		this.name = name;
		this.url = contentLink;
		this.dist = distanceTo;
	}

	getID() {
		return this.id;
	}

	getLat() {
		return this.lat;
	}

	getLng() {
		return this.lng;
	}

	getName() {
		return this.name;
	}

	getURL() {
		return this.url;
	}

	getDist(){
		return this.dist;
	}
}

class PageManager {
	constructor() {}

	static updateMapRouting(curRouting, mapObj, walkID) {
		//console.log("Updating map pins!", walkID);
		var pinsArray = walkManager.getWalk(walkID).getPins();

		//Remove old waypoints
		if (curRouting != null) {
			curRouting.spliceWaypoints(0, curRouting.getWaypoints().length);
		}

		//Create waypoint array
		var waypointsArray = [];
		for (var i = 0; i < pinsArray.length; i++) {
			waypointsArray.push(L.latLng(pinsArray[i].getLat(), pinsArray[i].getLng()));
		}

		//Set Path
		var route = L.Routing.control({
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
						walkId: walkID,
						draggable: false,
						icon: L.ExtraMarkers.icon({
							icon: 'fa-number',
							number: (i + 1),
							markerColor: 'blue'
						})
					}).on('click touchstart touchend', function() {
						loadPageContent(walkID, i);
					});
				} else if (i == 0) { //First Marker
					return L.marker(wp.latLng, {
						pinId: (i + 1),
						walkId: walkID,
						draggable: false,
						icon: L.ExtraMarkers.icon({
							icon: 'pin icon',
							shape: 'star',
							markerColor: 'blue'
						})
					}).on('click touchstart touchend', function() {
						loadPageContent(walkID, i);
					});
				} else if (i == (nWps - 1)) { //Last Marker
					return L.marker(wp.latLng, {
						pinId: (i + 1),
						walkId: walkID,
						draggable: false,
						icon: L.ExtraMarkers.icon({
							icon: 'flag outline icon',
							shape: 'star',
							markerColor: 'red'
						})
					}).on('click touchstart touchend', function() {
						loadPageContent(walkID, i);
					});
				}

			},
			draggableWaypoints: false,
			addWaypoints: false,
			show: false,
			routeWhileDragging: false,
			router: L.Routing.mapbox('pk.eyJ1Ijoicm9iZXJ0aHVja3MiLCJhIjoiY2l2Ymc5d2pwMDAzZDJ5bDU2YmR2ZmJkayJ9.CDEBc8_Q-SZG-jxhHtRQ3A')
		}).addTo(mapObj);

		return route;
	}

	static addPageImport(pins) {
		jQuery.each(pins, function(i, val) {
			//console.log(val);
			var link = document.createElement('link');
			link.rel = 'import';
			link.href = val.url;
			link.onload = function(e) {
				//console.log('\'' + val.url + '\' is loaded.');
			}
			document.head.appendChild(link);
		});

	}
}


//Force HTTPS
// if (location.protocol != 'https:') {
// 	location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
// }


var walkManager = new WalkManager();
var mapRouting = null;
var compassHeading = 0;
var menuShowing = true;
var curLocationLat = null;
var curLocationLng = null;
var curLocation = null;
var loadedContentPages = [];
var modalid;
var curSlide;
var closestPin = null;
var positionTracking = false;
var modalActive = null;
var touchmoved;
var i = 0;

//Get JSON and load it in to objects
$.getJSON("json/walks.json", function(data) {
	walkManager.loadWalks(data);
	//walkManager.createPages();
});


//Remove ability for smartphone/tablets to scroll around the screen
$('html, body').on('touchstart touchmove', function(e) {

	e.preventDefault();

});
function DistanceCheck(pins)
{
	if(curLocation != null) {
		var DistCheckArray = [];

		jQuery.each(pins, function(i, val) {
			var latlng = L.latLng(val.lat, val.lng);
			var curDistanceFrom = curLocation.distanceTo(latlng);
			console.log(curDistanceFrom);
			if (curDistanceFrom < 20) {
				DistCheckArray.push("yes");
			}
			else
			{
				DistCheckArray.push("no");
			}
		});
		console.log(DistCheckArray);

		if (curSlide != 3) {
			var arrcheck = DistCheckArray.includes("yes");
			console.log(arrcheck);
			if (arrcheck == true) {
				console.log(modalActive);
			if (modalActive != 1) {
				console.log("entering curSLide");
				closestPin = DistCheckArray.indexOf("yes");
				console.log("entering indexOf");
				console.log(closestPin);
				console.log("request pagemodal");
				pageModal(closestPin);
			}
			}
		}
	}
}

function pageModal(closestPin){
	var modalHTML = '';
	$('.dimmer').empty();
	console.log("Entered pagemodal");
	modalid = walkManager.getWalk(0).getPin(closestPin).getID();
	console.log(modalid);
	var modalName = walkManager.getWalk(0).getPin(closestPin).getName();
		modalHTML += '<div id="clearable" class="modalReset">\
			<div id="nearbyModal" data-pinId="' + closestPin + '" class="ui modal notification">\
			  	<div class="header">\
			    	You Have Arrived at the '+ modalName +'\
			  	</div>\
			  	<div class="content">\
				    <div class="description">\
				      	<div class="ui header"></div>\
				      	<p>Would you like to Access the content for the '+ modalName +'?</p>\
				    </div>\
			  	</div>\
			  	<div class="actions">\
			    	<div id="closeModalButton" class="ui black button clearable modalReset">\
			      		No Thank You!\
			    	</div>\
			    	<div id="viewContentModalButton" class="ui green right labeled icon button">\
			       		Yes, Please!\
			      		<i class="checkmark icon"></i>\
			    	</div>\
			  	</div>\
			</div>\
		</div>';
		$('#PinModal').append(modalHTML);
		modalActive = 1;
		console.log("html created");
	$('.ui.modal.notification').modal({allowMultiple: false}).modal('show');
}


$('div').each(function(){

	this.onclick = function() {};

});


//////////////////////////
//         Map          //
//////////////////////////

var myMap = L.map('mapid', {
	//center: [51.629619, -0.748514],
	maxZoom: 18,
	minZoom: 15
});

var tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm9iZXJ0aHVja3MiLCJhIjoiY2l2MHZxcDFnMDA0eDJ0dDl6cGhsbnE0dyJ9.Bz2HQaXOIdZnpjvct4hq0g');
tileLayer.addTo(myMap);
tileLayer.on('load', function() {
	tileLayer.off('load');
	$('#mapCover').removeClass('fadedBlack');
	$('#loadingIconHolder').remove();
});
var pulsingIcon = L.icon.pulse({iconSize:[20,20], color: 'blue'});
//Default Marker
var marker = L.marker([0, 0], {icon: pulsingIcon}).addTo(myMap);


function loadPageContent(walkId, pinId) {

	//console.log("Pin ID: ", pinId, "Walk ID: ", walkId);
	//console.log("Content for pin: ", walkManager.getWalk(walkId).getPin(pinId).getID(), walkManager.getWalk(walkId).getPin(pinId).getName(), walkManager.getWalk(walkId).getPin(pinId).getURL(), pinId, walkId);
	//Clear Div
	$(".owl-carousel").owlCarousel('destroy');
	$('#walkContent').empty();

	//Loop through and check for existing content
	var itemIndex = null;
	jQuery.each(loadedContentPages, function(i, val) {
		if(val.walkId == walkId && val.pinId == pinId) {
			itemIndex = i;
		}
	});

	if(itemIndex != null) {
		//console.log(String(loadedContentPages[itemIndex].pageContent), itemIndex);
		$('#walkContent').append(String(loadedContentPages[itemIndex].pageContent));

	} else {
		//Add HTML from import
		var link = document.querySelector('link[href="' + walkManager.getWalk(walkId).getPin(pinId).getURL() + '"]').import;
		var content = link.querySelector('#importContent');
		document.getElementById('walkContent').appendChild(content);
		loadedContentPages.push({'walkId': walkId, 'pinId': pinId, 'pageContent': content.outerHTML});
	}
	//Move to pagef
	$.fn.fullpage.moveTo(3, 0);
	 $(".owl-carousel").owlCarousel({
		items:1,
		nav: true,
		navText: ['','']
	});
	//document.body.style.overflow = "auto";
}

function getAndroidVersion(ua) {
    ua = (ua || navigator.userAgent).toLowerCase();
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? match[1] : false;
};


//On Load
$(function() {

	var androidVersion = getAndroidVersion(); //"4.2.1"
	// parseInt(getAndroidVersion(), 10); //4
	// parseFloat(getAndroidVersion()); //4.2
	console.log("Android version", androidVersion);

	//Slide settings
	function initFullpage() {
		$('#fullpage').fullpage({
			navigation: false,
			loopHorizontal: false,
			slidesNavigation: false,
			controlArrows: false,
			verticalCentered: false,
			normalScrollElements: '#importContent, #mapid, .mapPickSlide, #pinNavigationSidebar, #introPage, .instructions-content',
			scrollOverflow: true,
			scrollOverflowReset: true,
			scrollOverflowOptions: {
				fadeScrollbars: true,
				tap: true
			},
			keyboardScrolling: false,
			setAutoScrolling: false,

			anchors: ['home', 'map', 'content', '360images'],
			afterLoad: function(anchorLink, index) {
				$.fn.fullpage.reBuild();
				//curSlide = index;
				if(index == 4) {
            		$('.back-to-content').removeClass('hidden');
				} else {
					$('.back-to-content').addClass('hidden');
				}
			},
			onLeave: function(index, nextIndex, direction) {
				curSlide = nextIndex;
				if(index == 2 && nextIndex == 3) {
					menuShowing = false;
					$('#pinNavigationSidebarSlide').removeClass('active');
					$('#mapDisplaySlide').addClass('active');
					$.fn.fullpage.reBuild();
				}
			},
			afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
				$.fn.fullpage.reBuild();
			}
		});
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setAutoScrolling(true);
	}
	initFullpage();

	//Get User Position (Constantly Polling)
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showAccuratePosition, positionError, {enableHighAccuracy: true});
	} else {
		alert("GeoLocation not supported. Please enable GPS.");
	}

	//Initialise distance check function


	function showAccuratePosition(position) {
		marker.setLatLng({lat: position.coords.latitude, lng: position.coords.longitude});
		//console.log("Location updated: ", position.coords);
		curLocation = L.latLng(curLocationLat, curLocationLng);
		curLocationLat = position.coords.latitude;
		curLocationLng = position.coords.longitude;
		if (positionTracking == true) {
			myMap.panTo(new L.latLng(curLocationLat, curLocationLng));
		}
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
	$(document).on('click touchstart', '.locator', function() {
        if (positionTracking == false) {
        	positionTracking = true;
        	$(this).addClass('green');
        	$(this).removeClass('black');
        } else {
        	positionTracking = false;
        	$(this).addClass('black');
        	$(this).removeClass('green');
        }
    });
	//iOS Safari Fix for button press

	//Button to Map View
	$(document).on('tap touchend', '.toMapView', function() {
	//$('.toMapView').on('tap touchend', function(e){
		console.log('toMapView clicked // touchmoved = ' + touchmoved);
	    if(touchmoved != true){
	        MapViewInitiation();
	    }
	}).on('touchmove', function(e){
	    touchmoved = true;
	}).on('touchstart', function(){
	    touchmoved = false;
	});


	function MapViewInitiation(){
		modalActive = null;
		$('#loadingIconHolder').show();
		//console.log("Button Pressed ( -> Map View #" + $(this).attr('data-map') + ")");
		//Set Map to use the correct positioning and pins
		mapRouting = PageManager.updateMapRouting(mapRouting, myMap, 0);
		var pins = walkManager.getWalk(0).getPins();
		//console.log(walkManager.getWalk($(this).attr('data-map')).getPins());
		//Add pins to sidebar
		//PageManager.mapPagePins(pins, 0);
		//Move to map page
		$('#mapid').removeClass("fadedBlack");
		$.fn.fullpage.moveTo(2);
		menuShowing = false;
		//Load content pages
		PageManager.addPageImport(pins);
		//$('#walkPage .ui.sidebar').sidebar('show');
		var myVar = setInterval(function() {
			DistanceCheck(pins);
		}, 3000);

		// only center the map the first time it is loaded
		if (i < 1) {
			setTimeout(function() {
				myMap.panTo(new L.latLng(pins[0].getLat(), pins[0].getLng()));
			}, 500);
		}
		i++;
	}

	//Home Button
	$(document).on('click touchstart', '.toHome', function() {
		//alert("Button Pressed ( -> Home )");
		$.fn.fullpage.moveTo(1);
		positionTracking = false;
    	$('#locator').addClass('black');
    	$('#locator').removeClass('green');
	});

	//Modal Buttons
	$(document).on('click touchstart', '#modalButton', function() {
		modalActive = null;
		var curwalkid = 0;

		loadPageContent(curwalkid, modalid);
	});

	$(document).on('click touchstart', '#modalDenyButton', function() {
		modalActive = null;
	});

	$(document).on('click touchstart', '.to-home', function() {
		modalActive = 1;
	});

	$(document).on('click touchstart', '.toMapView', function() {
		modalActive = null;
	});

	//Sidebar Button
	$(document).on('click touchstart', '.sidebartoggle', function() {
		//alert("Button Pressed ( Sidebar Toggled )");
		if(menuShowing == false) {
			$.fn.fullpage.moveTo(3, 0);
			menuShowing = true;
			$('#mapid').on('click touchstart', function() {
				$.fn.fullpage.moveTo(3, 1);
				menuShowing = false;
				$('#mapid').off('click touchstart');
				$('#mapid').removeClass("fadedBlack");
				//console.log("Hiding sidebar");
			});
			$('#mapid').addClass("fadedBlack");
		} else {
			$.fn.fullpage.moveTo(3, 1);
			menuShowing = false;
			$('#mapid').removeClass("fadedBlack");
		}
	});

    $(document).on('click touchstart', '.videoOptionButton', function() {
    	//console.log('videoOptionButtons pressed');
    	$.fn.fullpage.moveTo(3);
    });

    $('#backToMapButton').on('click touchstart', function() {
    	document.body.style.overflow = "hidden";
    	//console.log('backToMapButton pressed');
    	$.fn.fullpage.moveTo(2);

    });

    $('.modalReset').on('click touchstart', function() {
    	modalActive = null;
    	console.log(modalActive);
    });

    $(document).on('tap', '.sidebarPin', function() {

    	loadPageContent($(this).attr('data-walkId'), $(this).attr('data-pinId'));

    });

    /*$('#startButton').on('click touchstart', function() {
    	$.fn.fullpage.destroy('all');
		initFullpage();
    	//console.log("Button Pressed ( -> Map View #" + $(this).attr('data-map') + ")");
		//Set Map to use the correct positioning and pins
		mapRouting = PageManager.updateMapRouting(mapRouting, myMap, 0);
		var pins = walkManager.getWalk(0).getPins();
		//console.log(walkManager.getWalk($(this).attr('data-map')).getPins());
		//Add pins to sidebar
		PageManager.mapPagePins(pins, 0);
		//Move to map page
		$('#mapid').removeClass("fadedBlack");
		$.fn.fullpage.moveTo(2);
		menuShowing = false;
		//Load content pages
		PageManager.addPageImport(pins);
		//$('#walkPage .ui.sidebar').sidebar('show');
		var myVar = setInterval(function() {
			DistanceCheck(pins);
		}, 30000);

		setTimeout(function() {
			myMap.panTo(new L.latLng(pins[0].getLat(), pins[0].getLng()));
		}, 500);
    });*/

    $('#infoButton').on('tap', function() {
    	$.fn.fullpage.moveTo(1, 1);
    });

    $('.to-instructions').on('click touchstart', function() {
    	$.fn.fullpage.moveTo(1, 1);
    });

    $('#getStartedButton, .to-home').on('click touchstart', function() {
    	$.fn.fullpage.moveTo(1, 0);
    });

    // $(document).on('tap touchend', '.continue, .back', function() {
    // 	$.fn.fullpage.moveTo(2);
    // });

    $('#helpButton, .open-help').on('click touchstart', function() {
    	$('.ui.modal.helpModal').modal('show');
    });

    $('#helpModalClose').on('click touchstart', function() {
    	$('.ui.modal.helpModal').modal('hide');
    });

    $('#reloadLink').on('click touchstart', function() {
    	location.reload(true);
    });

    $('#emailLink').on('click touchstart', function() {
    	window.location = "mailto:community@wycombe.gov.uk?subject=Heritage%20App%20Bug%20Report";
    });

	$('.back-to-content').on('click touchstart', function() {
		$.fn.fullpage.moveTo(3);
	});

	$(document).on('click touchstart', '#closeModalButton', function() {
		$('#nearbyModal').modal('hide');
		modalActive = null;
	});

	$(document).on('click touchstart', '#viewContentModalButton', function() {
		$('#nearbyModal').modal('hide');
		modalActive = null;
		var curwalkid = 0;

		loadPageContent(curwalkid, $('#nearbyModal').attr('data-pinId'));
	});

});
