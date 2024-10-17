  
//Function to update current city with the city entered by the users and to prevent the browser from refreshing the page.  
  
  function updateCity(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-city");
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = searchInput.value;
    console.log(searchInput.value);
  }


//Updating the date to current date
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



//Calling the function to update the city to the city entered by the user
let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", updateCity);



//Calling the function to show the current date
let currentUpdatedDate = document.querySelector("#current-date-info");
let currentDate = new Date();
currentUpdatedDate.innerHTML = formatDate(currentDate); 