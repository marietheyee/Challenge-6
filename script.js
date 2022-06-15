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
    var apiUrl = dailyWeatherApiStarts + searchCityName + "&" + personalAPIKey + "&" + unit;
    fetch(apiUrl).then (function (response) {
        if (response.ok) {
            return response.json().then(function (response) {
                $(#cityName).html(response.name);
                var unixTime = response.dt;
                var date = moment.unix(unixTime).format("MM/DD/YY");
                $("#currentdate").html(date);
                var weatherIncoUrl = "http//openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
                $("#weatherIconToday").attr("src", weatherInoUrl);
                $("#tempToday").html(response.main.temp + "\u00B0f");
                $("#humidityToday").html(response.main.humidity + "%");
                $("#windSpeedToday").html(response.wind.speed + "MPH");

                var lat = response.coord.lat;
                var lon = response.coord.lon;
            });

        }else {
            alert("Please provide a valid city name.")
        }
    }
)};

var getUVIndex = function (lat, lon) {
    var apiUrl =
    dailyUVIndexAPIStarts + personalAPIKey + "&lat=" + lat + "&lon=" + lon + "&" + unit;
    fetch(apiUrl).then (function (response) {
        return response.json():
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
            $("#tempDay" + i).html.(temp);
            var humidity = response.daily[i].humidity;
            $("#humidityDay" + i).html(humidity + "%");

        }  
     });
};

