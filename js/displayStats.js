// Displays the highest, lowest and average heartrate from the data
function displayHeartrate(allHeartrates, totalHeartrate){
	$("#highestHeartrate").append(Math.max(...allHeartrates).toFixed(0) + " beats per minute");
	$("#lowestHeartrate").append(Math.min(...allHeartrates).toFixed(0) + " beats per minute");
	$("#averageHeartrate").append((totalHeartrate/allHeartrates.length).toFixed(0) + " beats per minute");
}

// Displays the total distance covered
function displayDistance(totalDistance){
	$("#distanceTravelled").append(totalDistance.toFixed(2) + " miles");
}

// Displays the highest, lowest and average elevation from the current circuit
function displayElevation(elevations, totalElevation){
	$("#highestPoint").append(Math.max(...elevations).toFixed(2) + " feet");
	$("#lowestPoint").append(Math.min(...elevations).toFixed(2) + " feet");
	$("#averageElevation").append((totalElevation/elevations.length).toFixed(2) + " feet");
}


// Displays the highest and average cadence from the gpx file
function displayCadence(allCadence, totalCadence){
	$("#highestCadence").append(Math.max(...allCadence).toFixed(0) + " steps per minute");
	$("#averageCadence").append((totalCadence/allCadence.length).toFixed(0) + " steps per minute");
}


// Caculates and displays the speed given a time and total distance covered
function displaySpeed(hh, mm, ss, totalDistance){
	var numberOfMinutes = parseFloat(ss/60) + mm;
	var numberOfHours = numberOfMinutes/60 + hh;
	$("#averageSpeed").append((parseFloat(totalDistance)/parseFloat(numberOfHours)).toFixed(2) + " mph");
}


/* Function creates Date objects from dates and times as strings.
   Calculates the difference between these times and displays this.
   Also returns a list of the time to be used in other functions.
*/
function calculateTimes(allDates, allTimes){
	var timeStart = new Date(allDates[0] + " " + allTimes[0]);
	var timeEnd = new Date(allDates[allDates.length-1] + " " + allTimes[allTimes.length-1]);
	var timeTaken = timeEnd.getTime() -timeStart.getTime();

	var msec = timeTaken;
	var hh = Math.floor(msec / 1000 / 60 / 60);
	msec -= hh * 1000 * 60 * 60;
	var mm = Math.floor(msec / 1000 / 60);
	msec -= mm * 1000 * 60;
	var ss = Math.floor(msec / 1000);
	msec -= ss * 1000;

	$("#startTime").append(allTimes[0] + " (" + allDates[0] + ")");
	$("#endTime").append(allTimes[allDates.length-1] + " (" + allDates[allDates.length-1] + ")");
	$("#timeTaken").append(hh + ":" + mm + ":" + ss);
	return [hh, mm, ss];
}



// Function calculates the distance between 2 points given their lat and lon coordinates
function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	return dist
}

