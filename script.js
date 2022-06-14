var citiesListArr = [];
var numOfCities = 9;
var personalAPIKey = a10d92e052ee966e8c7f9cd67b31b867;
var unit = "units=Imperial";
var dailyWeatherAPIStarts = "https://api.openweathermap.org/data/2.5/weather?lat=&lon=&appid=";
var forecastWeatherAPIStarts = "https://api.openweathermap.org/data/2.5/forecast?lat=&lon=&appid=";
//city "search engine"
var searchCityForm = $("#searchCityForm");
var searchedCities = $("#searchedCityLi");

var getCityWeather = function (searchCityName) {
    var apiURL = dailyWeatherAPIStarts + searchCityName + "&" + personalAPIKey + "&"
    fetch(apiURL).then(function (response) {
        if (response.ok) {
            return response.json().then(function(response) {
                $("#cityName").html(response.name);
            }
    )}
    }
)};

var unixTime = response.dt;
var date = moment.unix(unixTime).format("MM/DD/YYYY");
$("#currentdate").html(date);


//get images for weather conditions
var weatherIncURL = "http//openweathermap.org/img/wn/" + response.weather[0].icon +@2x.png";
