const lampo = document.getElementById("lampo");
const tuuli = document.getElementById("tuuli");
const suunta = document.getElementById("suunta");
const kuvaus = document.getElementById("kuvaus");
const icon = document.querySelector("img");

const url = "https://api.openweathermap.org/data/2.5/weather?";
const iconURL = "http://openweathermap.org/img/wn/";
const avain = "";

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      document.getElementById("lat").innerHTML = position.coords.latitude.toFixed(3) + ", ";
      document.getElementById("lng").innerHTML = position.coords.longitude.toFixed(3);
      getWeather(position.coords.latitude, position.coords.longitude);
    }),
      (error) => {
        alert(error);
      };
  } else {
    alert("Your browser does not support geolocation");
  }
};

const getWeather = (lat, lng) => {
  const address = url + "lat=" + lat + "&lon=" + lng + "&units=metric" + "&appid=" + avain;
  axios
    .get(address)
    .then((response) => {
      const json = response.data;
      lampo.innerHTML = json.main.temp + "&#8451;";
      tuuli.innerHTML = json.wind.speed + " m/s";
      suunta.innerHTML = json.wind.deg + "&#176;";
      kuvaus.innerHTML = json.weather[0].description;
      const kuva = iconURL + json.weather[0].icon + "@2x.png";
      icon.src = kuva;
    })
    .catch((error) => {
      alert(error);
    });
};

getLocation();
