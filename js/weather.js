const weather = document.querySelector(".js-weather");

const API_KEY = "d1ff3e3e8da93bf49415ec9bd76ffc25";
const COORDS = 'coords';

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`).then(function(response){
    return response.json()
  }).then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    const humidity = json.main.humidity;
    const iconWeather = json.weather[0].icon; 

    const tempTtitle = document.createElement("span");
    tempTtitle.append("temperature");
    const humTitle = document.createElement("span");
    humTitle.append("humidity");
    const windTitle = document.createElement("span");
    windTitle.append("wind-speed");

    const div = document.createElement("div");
    div.setAttribute("class", "infoWeather")

    const imgWeather = document.createElement("img");
    const spanTemp = document.createElement("span");
    const spanHumidity = document.createElement("span");
    const spanPlace = document.createElement("span");
    const spanWind = document.createElement("span");
    imgWeather.setAttribute("src", `http://openweathermap.org/img/wn/${iconWeather}@2x.png`);
    // imgWeather.setAttribute("class","imgWwather");
    spanTemp.append(`${temperature}℃`);
    spanHumidity.append(`${humidity}%`);
    spanWind.append(`${json.wind.speed}m/s`);
    spanPlace.append(`@${place}`);

    div.append(tempTtitle);
    div.append(spanTemp);
    div.append(humTitle);
    div.append(spanHumidity);
    div.append(windTitle);
    div.append(spanWind);
    
    weather.append(imgWeather);
    weather.append(div);
    weather.append(spanPlace);
    
  });
}

function savecoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  savecoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  const errormessage = document.createElement("span");
  errormessage.append("Cant acces geo location");
  weather.append(errormessage);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords  === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();