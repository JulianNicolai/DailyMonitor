function main_weather(data){

}

//var fetch_location = "http://api.openweathermap.org/data/2.5/forecast?id=6094817&appid=3abe64cd479975f5e36a719f2181af52&units=metric"
var fetch_location = "json/forecast.json"

function call_weather_data(){
	
	document.addEventListener("DOMContentLoaded", function(event) { 
	
	fetch(fetch_location)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
		
			main_weather(data);

		})
		.catch(function(err) {
			document.write("Error: Weather server unavailable<br>", err);
		})

	});
}

if (call_weather_data()) {
	window.location.reload();
}