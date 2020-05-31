function main_accuweather(data){
	var deg = "\xB0"
	var imgPath = "img/weather_icons/"

	var weekday;
	var highTemp;
	var lowTemp;
	var dayWeekIcon;
	var precip;

	var todayHighTemp = String(Math.round(data.DailyForecasts[0].Temperature.Maximum.Value));
	var todayDayIcon = imgPath + String(data.DailyForecasts[0].Day.Icon) + ".svg";
	var todayNightIcon = imgPath + String(data.DailyForecasts[0].Night.Icon) + ".svg";
	var todayEpochSunrise = data.DailyForecasts[0].Sun.EpochRise;
	var todayEpochSunset = data.DailyForecasts[0].Sun.EpochSet;
	var todayDayWind = String(Math.round(data.DailyForecasts[0].Day.Wind.Speed.Value)) + " " + data.DailyForecasts[0].Day.Wind.Speed.Unit + " " + data.DailyForecasts[0].Day.Wind.Direction.English;
	var todayNightWind = String(Math.round(data.DailyForecasts[0].Night.Wind.Speed.Value)) + " " + data.DailyForecasts[0].Night.Wind.Speed.Unit + " " + data.DailyForecasts[0].Night.Wind.Direction.English;

	var time = localStorage.getItem("currTime");
	var srTime = String(new Date(todayEpochSunrise * 1000)).substring(16,24);
	var ssTime = String(new Date(todayEpochSunset * 1000)).substring(16,24);	

	if (String(new Date(todayEpochSunrise * 1000)).substring(16,18) >= "12") {
		var srHr = parseInt(srTime.substring(0,2)) - 12;
		var srMin = parseInt(srTime.substring(3,5));
		var srStr = srHr + ":" + srMin + " PM";
	} else {
		var srHr = parseInt(srTime.substring(0,2));
		var srMin = parseInt(srTime.substring(3,5));
		var srStr = srHr + ":" + srMin + " AM";
	}

	if (String(new Date(todayEpochSunset * 1000)).substring(16,18) >= "12") {
		var ssHr = parseInt(ssTime.substring(0,2)) - 12;
		var ssMin = parseInt(ssTime.substring(3,5));
		var ssStr = ssHr + ":" + ssMin + " PM";
	} else {
		var ssHr = parseInt(ssTime.substring(0,2));
		var ssMin = parseInt(ssTime.substring(3,5));
		var ssStr = ssHr + ":" + ssMin + " AM";
	}

	document.getElementById("today").childNodes[3].childNodes[3].childNodes[1].childNodes[3].innerHTML = srStr
	document.getElementById("today").childNodes[3].childNodes[3].childNodes[3].childNodes[3].innerHTML = ssStr

	if ((later_time(time, '00:00:00') && later_time(srTime, time)) || later_time(time, ssTime)) {
		document.getElementById("today").childNodes[5].childNodes[3].src = todayNightIcon
		document.getElementById("today").childNodes[1].childNodes[3].innerHTML = todayNightWind
    } else {
		document.getElementById("today").childNodes[5].childNodes[3].src = todayDayIcon
		document.getElementById("today").childNodes[1].childNodes[3].innerHTML = todayDayWind
    }

	localStorage.setItem("todaySunrise", srTime);
	localStorage.setItem("todaySunset", ssTime);

	document.getElementById("today").childNodes[5].childNodes[1].innerHTML = todayHighTemp + deg;

	for (day = 0; day < 5; day++) {
		weekday = String(new Date(parseInt(data.DailyForecasts[day].EpochDate) * 1000)).substring(0, 3).toUpperCase();
		highTemp = Math.round(data.DailyForecasts[day].Temperature.Maximum.Value);
		lowTemp = Math.round(data.DailyForecasts[day].Temperature.Minimum.Value);
		dayWeekIcon = imgPath + String(data.DailyForecasts[day].Day.Icon) + ".svg";
		uvIndex = "UV " + String(data.DailyForecasts[day].AirAndPollen[5].Value)
		precip = "0 mm";
		
		if (data.DailyForecasts[day].Day.HasPrecipitation) {
			if (data.DailyForecasts[day].Day.PrecipitationType == "Rain") {
				precip = data.DailyForecasts[day].Day.Rain.Value + " " + data.DailyForecasts[day].Day.Rain.Unit;
			} else if (data.DailyForecasts[day].Day.PrecipitationType == "Snow") {
				precip = data.DailyForecasts[day].Day.Snow.Value + " " + data.DailyForecasts[day].Day.Snow.Unit;
			} else if (data.DailyForecasts[day].Day.PrecipitationType == "Ice") {
				precip = data.DailyForecasts[day].Day.Ice.Value + " " + data.DailyForecasts[day].Day.Ice.Unit;
			}
		}
		
		elementId = "d" + String(day)
		document.getElementById(elementId).childNodes[1].innerHTML = weekday;
		document.getElementById(elementId + "ht").innerHTML = highTemp + deg;
		document.getElementById(elementId + "lt").innerHTML = lowTemp + deg;
		document.getElementById(elementId + "ico").src = dayWeekIcon
		document.getElementById(elementId + "precip").innerHTML = precip;
		document.getElementById(elementId + "uv").innerHTML = uvIndex;

		if (highTemp < 10) {
			document.getElementById(elementId + "ht").style.marginRight = "16%"
		} else if (lowTemp < 10) {
			document.getElementById(elementId + "lt").style.marginLeft = "16%"
		}

		document.getElementById("d0").childNodes[1].innerHTML = "TODAY";
	}
}

