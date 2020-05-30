function main_accuweather(data){
	
}

function main_openweather(data){

}

//var fetch_accuweather_location = "http://api.openweathermap.org/data/2.5/forecast?id=6094817&appid=3abe64cd479975f5e36a719f2181af52&units=metric";
//var fetch_openweather_location = "http://api.openweathermap.org/data/2.5/forecast?id=6094817&appid=3abe64cd479975f5e36a719f2181af52&units=metric";
var fetch_accuweather_location = "json/accuweather.json";
var fetch_openweather_location = "json/openweather.json";

function call_accuweather_data(){
	
	document.addEventListener("DOMContentLoaded", function(event) { 
	
	fetch(fetch_accuweather_location)
		.then(function(response) {
			return response.json();
		})
		.then(function(accu_data) {
		
			main_accuweather(accu_data);

		})
		.catch(function(err) {
			document.write("Error: Weather server unavailable<br>", err);
		})

	});
}

function call_openweather_data(){
	
	document.addEventListener("DOMContentLoaded", function(event) { 
	
	fetch(fetch_openweather_location)
		.then(function(response) {
			return response.json();
		})
		.then(function(open_data) {
		
			main_openweather(open_data);

		})
		.catch(function(err) {
			document.write("Error: Weather server unavailable<br>", err);
		})

	});
}

if (call_accuweather_data()) {
	window.location.reload();
}

if (call_openweather_data()) {
	window.location.reload();
}