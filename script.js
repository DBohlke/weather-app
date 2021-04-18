let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSubmit);

function showWeather(response) {
  document.querySelector("#city-state").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + "mph";
  document.querySelector("#real-feel").innerHTML =
    "Feels like: " + Math.round(response.data.main.feels_like);

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let myApiKey = "18646baba3751e0ddacc065cb85e47a6";
  let myApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}&units=imperial`;
  axios.get(myApiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function searchPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "18646baba3751e0ddacc065cb85e47a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

let now = new Date();

let date = document.querySelector("#date");
let time = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let ampm = "am";
if (hours > 12) {
  hours -= 12;
  ampm = "pm";
}

date.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;
time.innerHTML = `${hours}:${minutes}${ampm}`;

let temperatureInFahrenheit = null;
let temperatureInCelsius = null;

let maxInFahrenheit = [];
let minInFahrenheit = [];

let maxInCelsius = [];
let minInCelsius = [];

let realFeelFahrenheit = null;
let realFeelCelsius = null;

let maxTemperatureElement = "";
let minTemperatureElement = "";

let maxUnitElement = "";
let minUnitElement = "";

function changeUnit(event) {
  event.preventDefault();
  let currentUnit = document.querySelector("#unit");
  if (currentUnit.innerHTML === "°F") {
    let celsiusTemperature = Math.round(
      ((temperatureInFahrenheit - 32) * 5) / 9
    );
    let celsiusTemperatureElement = document.querySelector("#temperature");
    let maxTemperature = Math.round(((maxInFahrenheit - 32) * 5) / 9);
    let maxTemperatureElement = document.querySelector("#max-temp");
    let minTemperature = Math.round(((minInFahrenheit - 32) * 5) / 9);
    let minTemperatureElement = document.querySelector("#min-temp");
    let realFeelTemperature = Math.round(((realFeelFahrenheit - 32) * 5) / 9);
    let realFeelTemperatureElement = document.querySelector("#real-feel");
    let unitElement = document.querySelector("#unit");
    let maxUnitElement = document.querySelector("#max-unit");
    let minUnitElement = document.querySelector("#min-unit");
    let unitConvertElement = document.querySelector("#unit-link");
    let realFeelUnitElement = document.querySelector("#real-feel-unit");

    temperatureInCelcius = celsiusTemperature;
    maxInCelsius = maxTemperature;
    minInCelsius = minTemperature;
    realFeelCelsius = realFeelTemperature;
    celsiusTemperatureElement.innerHTML = celsiusTemperature;
    maxTemperatureElement.innerHTML = maxTemperature;
    minTemperatureElement.innerHTML = minTemperature;
    realFeelTemperatureElement.innerHTML = realFeelTemperature;

    unitElement.innerHTML = "°C";
    maxUnitElement.innerHTML = "°C";
    minUnitElement.innerHTML = "°C";
    unitConvertElement.innerHTML = "°F";
    realFeelUnitElement.innerHTML = "°C";

  }else{

        let fahrenheitTemperature = Math.round(
          ((temperatureInCelcius * 9) / 5) + 32
        );
        let fahrenheitTemperatureElement = document.querySelector("#temperature");
        let maxTemperature = Math.round(((maxInCelsius * 9) / 5) + 32);
        let maxTemperatureElement = document.querySelector("#max-temp");
        let minTemperature = Math.round(((minInCelsius * 9) / 5) + 32);
        let minTemperatureElement = document.querySelector("#min-temp");
        let realFeelTemperature = Math.round(((realFeelCelsius * 9) / 5) + 32);
        let realFeelTemperatureElement = document.querySelector("#real-feel");
        let unitElement = document.querySelector("#unit");
        let maxUnitElement = document.querySelector("#max-unit");
        let minUnitElement = document.querySelector("#min-unit");
        let unitConvertElement = document.querySelector("#unit-link");
        let realFeelUnitElement = document.querySelector("#real-feel-unit");

        fahrenheitTemperatureElement.innerHTML = fahrenheitTemperature;
        maxTemperatureElement.innerHTML = maxTemperature;
        minTemperatureElement.innerHTML = minTemperature;
        realFeelTemperatureElement.innerHTML = realFeelTemperature;

        unitElement.innerHTML = "°F";
        maxUnitElement.innerHTML = "°F";
        minUnitElement.innerHTML = "°F";
        unitConvertElement.innerHTML = "°C";
        realFeelUnitElement.innerHTML = "°F";
  }
}

let unitElement = document.querySelector("#unit-convert");
unitElement.addEventListener("click", changeUnit);

searchCity("55901");
