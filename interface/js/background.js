function later_time(time1, time2) {
    // Is time1 later than time2? Format of time vars:
    // time1 = "12:01:56"
    // time2 = "13:04:52"
    let later;

    let t1Hr = parseInt(time1.substring(0,2));
    let t1Min = parseInt(time1.substring(3,5));
    let t1Sec = parseInt(time1.substring(6,8));

    let t2Hr = parseInt(time2.substring(0,2));
    let t2Min = parseInt(time2.substring(3,5));
    let t2Sec = parseInt(time2.substring(6,8));

    if (t1Hr > t2Hr) {
        later = true;
    } else if (t1Hr == t2Hr) {
        if (t1Min > t2Min) {
            later = true;
        } else if (t1Min == t2Min) {
            if (t1Sec >= t2Sec) {
                later = true;
            } else {
                later = false;
            }
        } else {
            later = false;
        }
    } else {
        later = false;
    }

    return later;
}

function make_url(numOfDayImgs, numOfNightImgs) {

    let sunriseTime = localStorage.getItem("todaySunrise");
    let sunsetTime = localStorage.getItem("todaySunset");

    let prefix;
    let night;

    let currentTime = localStorage.getItem("currTime");

    if ((later_time(currentTime, '00:00:00') && later_time(sunriseTime, currentTime)) || later_time(currentTime, sunsetTime)) {
        night = true;
    } else {
        night = false;
    }

    localStorage.setItem("night", night);

    if (night == true) {
        numOfImgs = numOfNightImgs;
        prefix = 'n';
        folder = 'night';
    } else {
        numOfImgs = numOfDayImgs;
        prefix = 'd';
        folder = 'day';
    }

    imgNum = Math.floor(Math.random() * (numOfImgs - 1));

    make_filename(imgNum, prefix);

    console.log("now: " + currentTime);
    console.log("sr: " + sunriseTime);
    console.log("ss: " + sunsetTime);

    return imgNumStr;
}

function make_filename(imgNum, prefix) {

    if (imgNum < 1000) {
        if (imgNum < 100) {
            if (imgNum < 10) {
                imgNumStr = prefix + '000' + String(imgNum) + '.jpg';
            } else {
                imgNumStr = prefix + '00' + String(imgNum) + '.jpg';
            }
        } else {
            imgNumStr = prefix + '0' + String(imgNum) + '.jpg';
        }
    } else {
        imgNumStr = prefix + String(imgNum) + '.jpg';
    }

    return imgNumStr;
}

function main_bg(numOfDayImgs, numOfNightImgs) {

    imgNumStr = make_url(numOfDayImgs, numOfNightImgs);

    $('div.bg').addClass('bgFadeOut').one('animationend', function () {
        document.querySelector("body > div.bg").style.opacity = '0';
        url = "url('img/" + folder + "/" + imgNumStr + "')";
        document.querySelector("body > div.bg").style.background = url;
        document.querySelector("body > div.bg").style.backgroundSize = 'cover';
        console.log(url);
        $('div.bg').removeClass('bgFadeOut');
        setTimeout(function() {
            document.querySelector("body > div.bg").style.opacity = '1';
            $('div.bg').addClass('bgFadeIn').one('animationend', function () {
                $('div.bg').removeClass('bgFadeIn');
            });
        }, 1000);
    });
}
