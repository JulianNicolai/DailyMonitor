var fetch_time_location = "http://worldtimeapi.org/api/ip"
//var fetch_time_location = "json/time.json"

//var fetch_accuweather_location = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/55487?apikey=WEclqK4SZiwIMCdHSgAm5PG9iGB34eHS&details=true&metric=true";
var fetch_accuweather_location = "json/accuweather.json";

var numOfDayImgs = 42;
var numOfNightImgs = 28; 

function call_time_data(){
	
	document.addEventListener("DOMContentLoaded", function(event) { 
	
	fetch(fetch_time_location)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
		
			main_time(data);

		})
		.catch(function(err) {
			console.log("ERROR (Time):", err);
		})

	});
}

function call_accuweather_data(){
	
	document.addEventListener("DOMContentLoaded", function(event) { 
	
	fetch(fetch_accuweather_location)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
		
			main_accuweather(data);

		})
		.catch(function(err) {
			console.log("ERROR (Weather):", err);
		})

	});
}

if (call_time_data()) {
	window.location.reload();
}

if (call_accuweather_data()) {
	window.location.reload();
}

window.onload = function () {

    main_bg(numOfDayImgs, numOfNightImgs);

    setInterval(function () {

        main_bg(numOfDayImgs, numOfNightImgs);

    }, 20000)
}
