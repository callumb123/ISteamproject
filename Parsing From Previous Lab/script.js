$(document).ready(function(){
    $("button").click(function(){
        $("p").toggle();
    });
	
	$(".question").on({
		mouseenter: function(){
			$(this).css("color", "white");
		},
		mouseleave: function(){
			$(this).css("color", "black");
		},
    }); 

	$.ajax({
		url: "Lugano.gpx",
		method: "GET",
		success: parseResult,
		dataType: "xml"
	});
	
});  
  
function parseResult(xml) {
	document.getElementById("track").innerHTML =
	xml.getElementsByTagName("name")[0].childNodes[0].nodeValue;
}