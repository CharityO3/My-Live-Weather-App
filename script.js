
// Function to get current weather data (temp, wind, humidity & condition) for the city entered by the users.

  function showTemperature(response) {
    let data = response.data;
    let currentCity = document.querySelector("#current-city");
    let temperatureElement = document.querySelector("#temperature-value");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector("#temperature-icon");
    
    currentCity.innerHTML = data.city;
    temperatureElement.innerHTML = Math.round(data.temperature.current);
    humidityElement.innerHTML = `${data.temperature.humidity}%`;
    windElement.innerHTML = `${Math.round(data.wind.speed)} km/h`;
    descriptionElement.innerHTML = data.condition.description;
    iconElement.setAttribute("src", data.condition.icon_url);
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



// Event listener to update the city with user input and display current weather info.

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", updateCity);
getWeatherData("Poznan"); // Calling function to display current weather data for the default city.



//Calling the function to display the current date.

let currentUpdatedDate = document.querySelector("#current-date-info");
let currentDate = new Date();
currentUpdatedDate.innerHTML = formatDate(currentDate); 