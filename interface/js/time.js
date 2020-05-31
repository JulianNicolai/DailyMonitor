function update_clock(strSec, strMin, strHr, ampm, weekday, month, day) {
	document.getElementsByClassName("time-ss")[0].innerHTML = strSec;
	document.getElementsByClassName("time")[0].childNodes[0].nodeValue = strHr + ":" + strMin;
	document.getElementsByClassName("time-ampm")[0].innerHTML = ampm;
	document.getElementsByClassName("weekday")[0].innerHTML = weekday;
	document.getElementsByClassName("date-mm-dd")[0].innerHTML = month + " " + String(day);
}

function add_zeros(hour, minute, second) {
	if (second < 10) {
		strSec = "0" + String(second);
	} else {
		strSec = String(second);
	}

	if (minute < 10) {
		strMin = "0" + String(minute);
	} else {
		strMin = String(minute);
	}

	if (hour < 10) {
		strHr = "0" + String(hour);
	} else {
		strHr = String(hour);
	}

	return [strSec, strMin, strHr]
}

function hour12_adjust(second, minute, hour, hour24, ampm){
	
	var strSec;
	var strMin;
	var strHr;
	
	if (hour24 > 12) {
		hour = hour24 - 12;
		ampm = "PM";
	} else if (0 < hour24 && hour24 < 12) {
		hour = hour24;
		ampm = "AM";
	} else if (hour24 == 12) {
		hour = 12;
		ampm = "PM";
	} else if (hour24 == 0) {
		hour = 12;
		ampm = "AM";
	}
	
	timeArr = add_zeros(hour, minute, second);
	
	return [timeArr[0], timeArr[1], timeArr[2], ampm]
}

function clock_change(second, minute, hour24){
	second++
	// console.log(second)
	if (second >= 60) {
		second = 0;
		minute++
	} 

	if (minute >= 60) {
		minute = 0;
		hour24++
	}

	if (hour24 >= 24) {
		hour24 = 0;
		// console.log("New Day!")
	}
	
	return [second, minute, hour24]
}

function main_time(data) {
	var timeDate = data.datetime;
	var weekday = data.day_of_week;

//	var year = parseInt(timeDate.substring(0,4));
	var month = parseInt(timeDate.substring(5,7)) - 1;
	var day = parseInt(timeDate.substring(8,10));
	var hour24 = parseInt(timeDate.substring(11,13));
	var hour;
	var minute = parseInt(timeDate.substring(14,16));
	var second = parseInt(timeDate.substring(17,19));
	var millisecond = parseInt(timeDate.substring(20,23));
	var offset = 1000 - millisecond;
	var ampm = "";

	var strSec;
	var strMin;
	var strHr;
//	var strDay = String(day);
//	var strMonth = String(month);

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septmeber", "October", "November", "December"];
	var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	
	var clock;
	
	month = months[month];
	weekday = weekdays[weekday];

	var time = clock_change(second, minute, hour24)

	second = time[0];
	minute = time[1];
	hour24 = time[2];

	var hour12time = hour12_adjust(second, minute, hour, hour24, ampm);

	strSec = hour12time[0];
	strMin = hour12time[1];
	strHr = hour12time[2];
	ampm = hour12time[3];

	localStorage.setItem("currentSec", strSec);
	localStorage.setItem("currentMin", strMin);
	localStorage.setItem("currentHr", add_zeros(hour24, minute, second)[2]);

	update_clock(strSec, strMin, strHr, ampm, weekday, month, day)
	
	setTimeout(function() {
		clock = setInterval(function() {
			
			time = clock_change(second, minute, hour24);
			
			second = time[0];
			minute = time[1];
			hour24 = time[2];
			
			hour12time = hour12_adjust(second, minute, hour, hour24, ampm);
			
			strSec = hour12time[0];
			strMin = hour12time[1];
			strHr = hour12time[2];
			ampm = hour12time[3];
			
			time = add_zeros(hour24, minute, second)[2] + ":" + strMin + ":" + strSec
			localStorage.setItem("currTime", time);

			update_clock(strSec, strMin, strHr, ampm, weekday, month, day);
			
			if (strHr == '12' && strMin == '00' && strSec == '00' && ampm == "AM") {
				location.reload();
				// clearInterval(clock)
			}

		}, 1000);
	}, offset);
}

// var fetch_location = "http://worldtimeapi.org/api/ip"
var fetch_location = "json/time.json"

function call_time_data(){
	
	document.addEventListener("DOMContentLoaded", function(event) { 
	
	fetch(fetch_location)
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

if (call_time_data()) {
	window.location.reload();
}


