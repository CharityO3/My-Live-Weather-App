
// Function to get current weather data (temp, wind, humidity & condition) for the city entered by the users.

  function showTemperature(response) {
    let data = response.data;
    let currentCity = document.querySelector("#current-city");
    let temperatureElement = document.querySelector("#temperature-value");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector("#temperature-icon");
    let timeElement = document.querySelector("#current-date-info")
    let date = new Date(response.data.time * 1000);
    
    timeElement.innerHTML = formatDate(date); //Calling the function to display the current date.
    currentCity.innerHTML = data.city;
    temperatureElement.innerHTML = Math.round(data.temperature.current);
    humidityElement.innerHTML = `${data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(data.wind.speed)} km/h`;
    descriptionElement.innerHTML = data.condition.description;
    iconElement.setAttribute("src", data.condition.icon_url);

    getForecast(response.data.city);
} 


// Function to fetch and display weather data for a specific city and retrieve current weather information from the API using Axios.

  function getWeatherData(city){
    let apiKey = "b125a59f9afa4ebc141352te1ao60a9c";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }


// Function to update the displayed city based on user input and prevent page refresh.
  
  function updateCity(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-city");
    let city = searchInput.value;
    getWeatherData(city); //Fetch weather data for the city entered by the users.
  }


// Function to format and display the current date and time.

  function formatDate(date){

    let day = date.getDay();  

    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let newDay = days[day];
  
    let hours = date.getHours();
    if (hours < 10){
      hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10){
      minutes = `0${minutes}`;
    }

    return `${newDay} ${hours}:${minutes}`;

  }

  function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    return days[date.getDay()];
  }

  function getForecast(city){
    let apiKey = "b125a59f9afa4ebc141352te1ao60a9c";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    
  }


  function displayForecast(response){
    let forecastHtml = "";

    response.data.daily.forEach (function (day, index){
      if (index > 0 && index < 6){

        forecastHtml = forecastHtml + 
        `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src = "${day.condition.icon_url}" class="weather-forecast-icon">
            <div class="weather-forecast-temperatures">
                <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
                <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>       
            </div>
          </div>  
        `;
      }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }



// Event listener to update the city with user input and display current weather info.

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", updateCity);
getWeatherData("Poznan"); // Calling function to display current weather data for the default city.
