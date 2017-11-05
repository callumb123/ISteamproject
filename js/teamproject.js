$(document).ready(function(){
  var locations = []
  $.ajax({
    url: "xml/running.gpx",
    dataType: "xml",
    success: function(data){
	var name = $(data).find('trk name').text();
  	$("#name").append(name);
	$(data).find('trk trkseg trkpt').each(function() {
		var currentLat = $(this).attr("lat");
		var currentLon = $(this).attr("lon");
		locations.push({latitude: currentLat,
                  longitude: currentLon
                  });
		var currentElevation = $(this).find('ele').text();
		var currentTime = $(this).find('time').text();

		$('#lat ul').append(
			$('<li />', {
				text: currentLat
			})
		);

		$('#lon ul').append(
			$('<li />', {
				text: currentLon
			})
		);

		$('#elevation ul').append(
			$('<li />', {
				text: currentElevation
			})
		);

		$('#time ul').append(
			$('<li />', {
				text: currentTime
			})
		);
	});
    },
    error: function(){
	$('#name').text("Failed");
    }

  });

});



