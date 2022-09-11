let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

let currentDay = document.querySelector("#day");
currentDay.innerHTML = day;

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
let month = months[now.getMonth()];
let date = now.getDate();
if (date === 1 || date === 21 || date === 31) {
  date = `${date}st`;
} else {
  if (date === 2 || date === 22) {
    date = `${date}nd`;
  } else {
    if (date === 3 || date === 23) {
      date = `${date}rd`;
    } else {
      date = `${date}th`;
    }
  }
}
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${month}, ${date}`;

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentHour = document.querySelector("#hour");
currentHour.innerHTML = `${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png"
     alt="" width="42"/>
  <div class="weather-forecast-temp">
   <span class="weather-forecast-temp-max"> 
     ${Math.round(forecastDay.temp.max)}°
   </span> 
   <span class="weather-forecast-temp-min">
     ${Math.round(forecastDay.temp.min)}°
    </span> 
  </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "3cfbe117a0a2b535314cc626699c0963";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3cfbe117a0a2b535314cc626699c0963";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  cityInputElement.value = "";
}

//function convertFahr(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//temperatureElement.innerHTML = Math.round(fahrenheitTemperature);}

//function convertCels(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = Math.round(celsiusTemperature);}

//let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//let fahrLink = document.querySelector("#fahrenheit");
//fahrLink.addEventListener("click", convertFahr);

//let celsiusLink = document.querySelector("#celsius");
//celsiusLink.addEventListener("click", convertCels);
search("Kyiv");
