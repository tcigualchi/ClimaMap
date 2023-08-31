// Elementos do DOM
import Config from './config.js';

const apiKey = Config.apiKey;
const apiCountryURL = "https://flagsapi.com/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const weatherConditionClasses = {
  Clear: 'weather-clear',
  Clouds: 'weather-clouds',
  Rain: 'weather-rain',
  Snow: 'weather-snow',
};

// Funções
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute(
    "src",
    `https://www.countryflagicons.com/SHINY/64/${data.sys.country}.png`
  );
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
  applyWeatherAnimation(data.weather[0].main);
};

const applyWeatherAnimation = (weatherCondition) => {
  const body = document.querySelector("body");
  const conditionClass = weatherConditionClasses[weatherCondition];

  if (conditionClass) {
    // Remova todas as classes de condições climáticas anteriores
    for (const className of Object.values(weatherConditionClasses)) {
      body.classList.remove(className);
    }

    // Adicione a classe de condição climática atual
    body.classList.add(conditionClass);
  }
};

// Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
  }
});
