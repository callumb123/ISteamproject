google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawDistanceGraph);
google.setOnLoadCallback(drawTimeGraph);
google.setOnLoadCallback(drawSpeedGraph);

function drawDistanceGraph(){

      var distanceData = new google.visualization.DataTable();
      distanceData.addColumn('date', 'Date');
      distanceData.addColumn('number', 'Distance');

      distanceData.addRows([
		   	[new Date(2017, 0, 1), 11],
			[new Date(2017, 0, 8), 13],
			[new Date(2017, 0, 15), 18],
			[new Date(2017, 0, 22), 15],
			[new Date(2017, 0, 29), 18],
			[new Date(2017, 1, 5), 29],
      ]);

      	var distanceOptions = {
		title: 'Distance covered',
		hAxis: {
	  	title: 'Date'
		},
		vAxis: {
	  	title: 'Distance (Miles)'
		},
		backgroundColor: 'white'
      	};

      var distanceChart = new google.visualization.LineChart(document.getElementById('distanceChart'));
      distanceChart.draw(distanceData, distanceOptions);
};

function drawTimeGraph(){

      var timeData = new google.visualization.DataTable();
      timeData.addColumn('date', 'Date');
      timeData.addColumn('number', 'Time');

      timeData.addRows([
		   	[new Date(2017, 0, 1), 2.25],
			[new Date(2017, 0, 8), 2.66],
			[new Date(2017, 0, 15), 3.7],
			[new Date(2017, 0, 22), 3.1],
			[new Date(2017, 0, 29), 3.7],
			[new Date(2017, 1, 5), 5.9],
      ]);

      	var timeOptions = {
		title: 'Total Time Run',
		hAxis: {
	  	title: 'Date'
		},
		vAxis: {
	  	title: 'Time (hours)'
		},
		backgroundColor: 'white'
      	};

      var timeChart = new google.visualization.LineChart(document.getElementById('timeChart'));
      timeChart.draw(timeData, timeOptions);
};

function drawSpeedGraph(){

      var speedData = new google.visualization.DataTable();
      speedData.addColumn('date', 'Date');
      speedData.addColumn('number', 'Speed');

      speedData.addRows([
		   	[new Date(2017, 0, 1), 3.8],
			[new Date(2017, 0, 8), 3.9],
			[new Date(2017, 0, 15), 4.5],
			[new Date(2017, 0, 22), 5.3],
			[new Date(2017, 0, 29), 5.7],
			[new Date(2017, 1, 5), 6.4],
      ]);

      	var speedOptions = {
		title: 'Average Speed',
		hAxis: {
	  	title: 'Date'
		},
		vAxis: {
	  	title: 'Speed (mph)'
		},
		backgroundColor: 'white'
      	};

      var speedChart = new google.visualization.LineChart(document.getElementById('speedChart'));
      speedChart.draw(speedData, speedOptions);
};

