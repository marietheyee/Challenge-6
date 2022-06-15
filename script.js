var citiesListArr = [];
var numOfCities = 9;
var personalAPIKey = a10d92e052ee966e8c7f9cd67b31b867;
var unit = "units=Imperial";
var dailyWeatherAPIStarts = "https://api.openweathermap.org/data/2.5/weather?lat=&lon=&appid=";
var forecastWeatherAPIStarts = "https://api.openweathermap.org/data/2.5/forecast?lat=&lon=&appid=";
//city "search engine"
var searchCityForm = $("#searchCityForm");
var searchedCities = $("#searchedCityLi");

var getCityWeather = function (searchCityName){
    var apiUrl = dailyWeatherAPIStarts + searchCityName + "&" + personalAPIKey + "&" + unit;
    fetch(apiUrl).then (async function (response) {
        if (response.ok) {
            const response_1 = await response.json();
            $("#cityName").html(response_1.name);
            var unixTime = response_1.dt;
            var date = moment.unix(unixTime).format("MM/DD/YY");
            $("#currentdate").html(date);
            var weatherIncoUrl = "http//openweathermap.org/img/wn/" + response_1.weather[0].icon + "@2x.png";
            $("#weatherIconToday").attr("src", weatherInoUrl);
            $("#tempToday").html(response_1.main.temp + "\u00B0f");
            $("#humidityToday").html(response_1.main.humidity + "%");
            $("#windSpeedToday").html(response_1.wind.speed + "MPH");
            var lat = response_1.coord.lat;
            var lon = response_1.coord.lon;

        }else {
            alert("Please provide a valid city name.")
        }
    }
)};

var getUVIndex = function (lat, lon) {
    var apiUrl =
    dailyUVIndexAPIStarts + personalAPIKey + "&lat=" + lat + "&lon=" + lon + "&" + unit;
    fetch(apiUrl).then (function (response) {
        return response.json();
    })
    .then(function(response){
        $("#UVIndexToday").removeClass();
        $("#UVIndexToday").html(response.value);
        if (response.value < 3) {
            $("#UVIndexToday").addClass("p-1 rounded bg-success text-white");
        }else if (response.value < 8) {
            $("#UVIndexToday").addClass("p-1 rounded bg-warning text-white");
        }else {
            $("#UVIndexToday").addClass("p-1 rounded bg-danger text-white")
        }
        });
};

var getForecast = function (lat, lon) {
    var apiUrl = forecastWeatherApiStarts + "lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly" + "&" + personalAPIKey + "&" + unit;
    fetch(apiUrl).then (function(response) {
        for (var i=1; i < 6; i++){
            var unixTime = response.daily [i].dt;
            var date = moment.unix(unixTime).format("MM/DD/YY");
            $("#Date" + i).html(date);
            var weatherIncoUrl = "http//openweathermap.org/img/wn/" + response.daily [i].weather[0].icon + "@2x.png";
            $("#weatherIconDay" + i).html(temp);
            var temp = response.daily[i].temp.day + " \U00B0F";
            $("#tempDay" + i).html(temp);
            var humidity = response.daily[i].humidity;
            $("#humidityDay" + i).html(humidity + "%");

        }  
     });
};

var createBtn = function (btnText) {
    var btn = $("<button>")
    .text(btnText)
    .addClass("list-group-item list-group-item-action")
    .attr("type", "submit");
    return btn;
}

var loadSavedCity = function(){
    citiesListArr = JSON.parse(localStorage.getItem("weatherInfo"));
    if (citiesListArr == null) {
        citiesListArr = [];
    }
    for (var i=0; i < citiesListArr.length; i++) {
        var cityNameBtn = createBtn(citiesListArr[i]);
        searchedCities.append(cityNameBtn);
    }
};

var saveCityName = function (searchCityName) {
    var newCity = 0;
    citiesListArr = JSON.parse(localStorage.getItem("weatherInfo"));
    if (citiesListArr == null) {
        citiesListArr = [];
        citiesListArr.unshift(searchCityName);
    } else {
        for (var i=0; i < citiesListArr.length; i++) {
            if (searchCityName.toLowerCase() ==citiesListArr[i].tolowercase()) {
                return newCity;
            }
        }
        if(citiesListArr.length = numOfCities) {
            citiesListArr.unshift(searchCityName);
        }
    }
    localStorage.setItem("weatherInfo", JSON.stringify(citiesListArr));
    newCity = 1;
    return newCity;
};

var createCityNameBtn = function (searchCityName) {
    var saveCities = JSON.parse(localStorage.getItem("weatherInfo"));
    if (saveCities.length == 1) {
        var cityNameBtn = createBtn(searchCityName);
    }
}

