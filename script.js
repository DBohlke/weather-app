let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSubmit);

function showWeather(response) {
  document.querySelector("#city-state").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + "°F";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + "mph";
  document.querySelector("#real-feel").innerHTML =
    "Feels like: " + Math.round(response.data.main.feels_like) + "°F";
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
  ampm = "am";
}

date.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;
time.innerHTML = `${hours}:${minutes}${ampm}`;

searchCity("55901");
