<!doctype html>

<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="msapplication-tap-highlight" content="no" />

	<title>History Walk | World War I</title>

	<!-- CSS Scripts -->
	<link rel="stylesheet" href="dep/SemanticUI/semantic.min.css">
	<link rel="stylesheet" href="css/index.css">
	<!-- FullPageJS Stylesheets -->
	<link rel="stylesheet" href="dep/fullPagejs/jquery.fullPage.css">
	<!-- LeafletJS Stylesheets -->
	<link rel="stylesheet" href="dep/leafletjs/leaflet.css">
	<link rel="stylesheet" href="dep/leafletjs-pulse-icon/src/L.Icon.Pulse.css">
	<link rel="stylesheet" href="dep/leafletjs-routing-machine/dist/leaflet-routing-machine.css">
	<link rel="stylesheet" href="dep/leafletjs-ExtraMarkers/dist/css/leaflet.extra-markers.min.css">

</head>

<body>
	<div id="fullpage">
		<div id="walkPicker" class="section active">
			<div id="ww1Slide" class="slide">
				<div class="pageTitle">
				World War One
				</div>

				<div class="pageButton">
					<a href="#" slide="World War One" class="circular ui icon button blue tapable toMapView">
	  					<i class="arrow down icon"></i>
					</a>
				</div>
			</div>
			<div id="endSlide" class="slide">
				<div class="pageTitle">
				Settings
				</div>
			</div>
		</div>

		<div id="walkPage" class="section">

			<div id="pinNavigationSidebar" class="ui wide left vertical inverted labeled icon sidebar menu">
				<a class="item tapable toHome">
					<i class="arrow up icon"></i>
					Home
				</a>
				<div class="item">
					<div class="ui grid">
						<a id="sortDistanceButton" class="eight wide column sortButtons">
							<i class="compress icon"></i>
							Order By Distance
						</a>
						<a id="sortDefaultButton" class="eight wide column sortButtons">
							<i class="sort numeric ascending icon"></i>
							Default Order
						</a>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="1" class="item pin visitedPin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">1.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Tourist Information Centre</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big check circle outline green icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 100 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="2" class="item pin atPin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">2.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">'Hen &amp; Chickens' site of tailors</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big check circle outline green icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 70 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="3" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">3.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">War memorial and Youens Commemorative Stone</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 50 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="4" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">4.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Guildhall stained glass window</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 275 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="5" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">5.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Hospital and Tom Burts Hill</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 40 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="6" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">6.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Wycombe Abbey</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 380 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="7" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">7.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">War Office Railings</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 50 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="8" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">8.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Across The Rye</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 290 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="9" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">9.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Boy's Grammar School</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 320 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="10" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">10.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Station &amp; recruitment office</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 20 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="11" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">11.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Mary Christie's boarding house</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 60 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="12" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">12.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Museum</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 110 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="13" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">13.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">Cemetery</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>

				<div class="item distance">
					<div class="ui grid">
						<div class="centered row pinDistance">
							<div class="three wide column">
								<i class="clockwise rotated level up icon"></i>
							</div>
							<div class="ten wide column">
								Distance: 90 meters
							</div>
							<div class="three wide column">
								<i class="level down icon"></i>
							</div>
						</div>
					</div>
				</div>

				<!-- Pins -->
				<div pinID="14" class="item pin">
					<div class="ui grid">
						<div class="row pinInfo">
							<div class="two wide column pinInfoColumn">
								<span class="pinInfoContent">14.</span>
							</div>
							<div class="ten wide column pinInfoColumn">
								<span class="pinInfoContent">VAD Hospital site</span>
							</div>
							<div class="four wide column pinInfoColumn">
								<span class="pinInfoContent"><i class="big radio icon"></i></span>
							</div>
						</div>
					</div>
				</div>




			</div>
			<div class="pusher">


				<!--<div class="ui floating compact visible message">
					<i class="arrow circle outline down icon"></i>
					</br>
					<span>'Hen &amp; Chickens' site of tailors</span>
				</div>-->

				<div id="mapid"></div>

				<a href="#" class="ui black big launch right attached button sidebartoggle">
			        <i class="icon pin nomargin"></i>
        		</a>

			</div>
			
		</div>

		<div id="walkContent" class="section">
			<div class="contentSlide">
				<div>Content 1</div>
			</div>
			<div class="contentSlide">
				<div>Content 2</div>
			</div>
			<div class="contentSlide">
				<div>Content 3</div>
			</div>
			<div class="contentSlide">
				<div>Content 4</div>
			</div>
		</div>
	</div>
	




	<!-- Javascript Scripts -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="dep/SemanticUI/semantic.min.js"></script>
	<script src="dep/fullPagejs/jquery.fullPage.min.js"></script>

	<!-- Touch Gestures Scripts -->
	<script src="js/hammer.min.js"></script>
	<script src="js/hammer-time.min.js"></script>

	<!-- Leaflet Scripts -->
	<script src="dep/leafletjs/leaflet.js"></script>
	<script src="dep/leafletjs-pulse-icon/src/L.Icon.Pulse.js"></script>
	<script src="dep/leafletjs-routing-machine/dist/leaflet-routing-machine.min.js"></script>
	<script src="dep/leafletjs-ExtraMarkers/dist/js/leaflet.extra-markers.min.js"></script>

	<script src="js/index.js"></script>
</body>
</html>