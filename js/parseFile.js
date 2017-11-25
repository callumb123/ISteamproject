$(document).ready(function(){
	parseFile("xml/running.gpx");

});

// Parses the given file and extracts the information needed
function parseFile(file){
  var totalDistance = 0;
  var totalElevation = 0;
  var totalHeartrate = 0;
  var totalCadence = 0;
  var elevations = [];
  var allDates = [];
  var allTimes = [];
  var allPoints = [];
  var allHeartrates = [];
  var allCadence = [];
  $.ajax({
    url: file,
    dataType: "xml",
    success: function(data){
	var name = $(data).find('trk name').text();
  	$("#name").append('<u><b>' + name + '</b></u>');
	var pointNumber = 1;
	var previousLat;
	var previousLon;
	$(data).find('trk trkseg trkpt').each(function() {
		var currentLat = $(this).attr("lat");
		var currentLon = $(this).attr("lon");
		currentLat = parseFloat(currentLat);
		currentLon = parseFloat(currentLon);
		var point = {lat: currentLat, lng: currentLon};
		allPoints.push(point);
		if(pointNumber > 1){
			totalDistance += distance(currentLat, currentLon, previousLat, previousLon);
		}
		if($(this).find('extensions').length > 0){
			var extension = $(this).find('extensions').text();
			var heartrate = extension.match(/[-+]?(\d*\.?\d+)/g)[0];
			var cadence = extension.match(/[-+]?(\d*\.?\d+)/g)[1];

			totalHeartrate += parseInt(heartrate);
			totalCadence += parseInt(cadence);

			allHeartrates.push(heartrate);
			allCadence.push(cadence);
		}

		previousLat = currentLat;
		previousLon = currentLon;

		pointNumber++;

		var currentElevation = $(this).find('ele').text();
		elevations.push(currentElevation);
		totalElevation += parseInt(currentElevation);


		var currentTime = $(this).find('time').text();
		var date = currentTime.substring(0,10);
		allDates.push(date);
		var actualTime = currentTime.substring(11,19);
		allTimes.push(actualTime);
	});

	displayHeartrate(allHeartrates, totalHeartrate);
	displayDistance(totalDistance);
	displayElevation(elevations, totalElevation)
	displayCadence(allCadence, totalCadence)
	var time = calculateTimes(allDates, allTimes)
	displaySpeed(time[0], time[1], time[2], totalDistance);
	initMap(allPoints);

    },
    error: function(){
	$('#name').text("Failed");
    }

  });
}


/* Creates the map to display the given route (via the points passed to the function).
   Centres the map on the starting position of the route,
    and plots markers for the start and end.
*/
function initMap(allPoints){
	var uluru = {lat: allPoints[0]["lat"], lng: allPoints[0]["lng"]};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: uluru
		});

	for(var i = 0; i < allPoints.length; i++){
		if(i == 0){
			var label = "Start";
			var color = "green";
		}
		else{
			var label = "End";
			var color = "red";
		}
		var marker = new google.maps.Marker({
				position: allPoints[i],
				icon: {
        				path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
					fillColor: color,
					fillOpacity: 1,
        				strokeColor: "black",
					strokeWeight: 2,
        				scale: 4
    				},
				label: label,
				map: map
				});

		marker.setMap(map);
		i += (allPoints.length-2);
	}

	var runningPath = new google.maps.Polyline({
	  path: allPoints,
	  geodesic: true,
	  strokeColor: '#FF0000',
	  strokeOpacity: 1.0,
	  strokeWeight: 2
	});
	runningPath.setMap(map);
}
