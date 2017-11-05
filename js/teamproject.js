function initMap(){
  var uluru = {lat: 46.003257147967815399169921875, lng: 8.95168307237327098846435546875};
  var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: uluru
		});
  $.ajax({
    url: "xml/running.gpx",
    dataType: "xml",
    success: function(data){
	var name = $(data).find('trk name').text();
  	$("#name").append(name);
	$(data).find('trk trkseg trkpt').each(function() {
		var currentLat = $(this).attr("lat");
		var currentLon = $(this).attr("lon");
		var point = {lat: parseFloat(currentLat), lng: parseFloat(currentLon)};
		var marker = new google.maps.Marker({
				position: point,
				map: map
				});
		marker.setMap(map);
		var currentElevation = $(this).find('ele').text();
		var currentTime = $(this).find('time').text();
	});
    },
    error: function(){
	$('#name').text("Failed");
    }

  });

};



