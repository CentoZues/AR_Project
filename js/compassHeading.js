if (window.DeviceOrientationEvent) {

	//var compassHeading = 0;

	window.addEventListener('deviceorientation', function(e) {

		//console.log(e);

		if(event.webkitCompassHeading) {

			compassHeading = e.webkitCompassHeading;

		} else {

			if (e.alpha != null) {

				compassHeading = e.alpha;

			}

		}

	});

} else {

	alert("Compass direction not supported");

}