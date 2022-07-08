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

	return [strSec, strMin, strHr];
}

function hour12_adjust(second, minute, hour, hour24, ampm) {
	
	let strSec;
	let strMin;
	let strHr;
	
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
	
	return [timeArr[0], timeArr[1], timeArr[2], ampm];
}

function clock_change(second, minute, hour24) {
	second++;
	// console.log(second)
	if (second >= 60) {
		second = 0;
		minute++;
	} 

	if (minute >= 60) {
		minute = 0;
		hour24++;
	}

	if (hour24 >= 24) {
		hour24 = 0;
		// console.log("New Day!")
	}
	
	return [second, minute, hour24];
}

function main_time(data) {
	let timeDate = data.datetime;
	let weekday = data.day_of_week;

//	let year = parseInt(timeDate.substring(0,4));
	let month = parseInt(timeDate.substring(5,7)) - 1;
	let day = parseInt(timeDate.substring(8,10));
	let hour24 = parseInt(timeDate.substring(11,13));
	let hour;
	let minute = parseInt(timeDate.substring(14,16));
	let second = parseInt(timeDate.substring(17,19));
	let millisecond = parseInt(timeDate.substring(20,23));
	let offset = 1000 - millisecond;
	let ampm = "";

	let strSec;
	let strMin;
	let strHr;
//	let strDay = String(day);
//	let strMonth = String(month);

	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septmeber", "October", "November", "December"];
	let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	let clock;
	
	month = months[month];
	weekday = weekdays[weekday];

	let time = clock_change(second, minute, hour24);

	second = time[0];
	minute = time[1];
	hour24 = time[2];

	let hour12time = hour12_adjust(second, minute, hour, hour24, ampm);

	strSec = hour12time[0];
	strMin = hour12time[1];
	strHr = hour12time[2];
	ampm = hour12time[3];

	localStorage.setItem("currentSec", strSec);
	localStorage.setItem("currentMin", strMin);
	localStorage.setItem("currentHr", add_zeros(hour24, minute, second)[2]);

	update_clock(strSec, strMin, strHr, ampm, weekday, month, day);
	
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
			
			time = add_zeros(hour24, minute, second)[2] + ":" + strMin + ":" + strSec;
			localStorage.setItem("currTime", time);

			update_clock(strSec, strMin, strHr, ampm, weekday, month, day);
			
			if (strHr == '12' && strMin == '00' && strSec == '00' && ampm == "AM") {
				location.reload();
				// clearInterval(clock)
			}

		}, 1000);
	}, offset);
}


