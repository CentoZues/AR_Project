if(window.webkitCompassHeading) {
	window.alert('webkitCompassHeading is supported');
} else {
	if(window.DeviceOrientationEvent) {
		window.alert('DeviceOrientationEvent is supported');
	} else {
		window.alert('Compass data is NOT supported');
	}
}