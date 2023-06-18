// API endpoint and parameters
const url = "http://api.openweathermap.org/data/2.5/weather";
const params = {
  q: "srinagar",
  appid: "21489ccbd2b7252b4b77ff5d744f5d38",
  units: "metric",
};

// Function to fetch current weather data and display it
function fetchCurrentWeather() {
  fetch(url + "?" + new URLSearchParams(params))
    .then((response) => response.json())
    .then((data) => {
      const currentWeatherContainer =
        document.getElementById("current-weather");

      // Extract relevant weather data
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

      // Create HTML markup for current weather data
      const currentWeatherHTML = `
                                                                                  <h6>Current Weather</h6>
                                                                                <img class="weather-icon" src="${iconUrl}" alt="${description}">
                                                                                <p>${temperature}°C</p>
                                                                                <p>${description}</p>
                                                                              `;

      // Set the HTML markup in the current weather container
      currentWeatherContainer.innerHTML = currentWeatherHTML;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Function to fetch forecast data and display it
function fetchForecast() {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=srinagar&appid=21489ccbd2b7252b4b77ff5d744f5d38"
  )
    .then((response) => response.json())
    .then((data) => {
      // Extract forecast data for the next 5 days (unique dates only)
      const forecastData = data.list.reduce((acc, forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        if (!acc[date]) {
          acc[date] = {
            temperature: forecast.main.temp,
            description: forecast.weather[0].description,
            icon: forecast.weather[0].icon,
          };
        }
        return acc;
      }, {});

      // Create forecast cards and display information
      const forecastContainer = document.getElementById("forecast-container");
      Object.entries(forecastData).forEach(([date, forecast]) => {
        // Create a forecast card
        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");

        // Construct the weather icon URL
        const iconUrl = `http://openweathermap.org/img/w/${forecast.icon}.png`;

        // Populate the forecast card with information
        forecastCard.innerHTML = `
                                                                                  <h3>${date}</h3>
                                                                                  <img class="weather-icon" src="${iconUrl}" alt="${forecast.description}">
                                                                                  <p>${forecast.temperature}°C</p>
                                                                                  <p>${forecast.description}</p>
                                                                                `;

        // Append the forecast card to the forecast container
        forecastContainer.appendChild(forecastCard);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Function to toggle the display of the forecast section
function toggleForecast() {
  const forecastContainer = document.getElementById("forecast-container");
  const toggleButton = document.querySelector(".toggle-button");

  if (forecastContainer.style.display === "none") {
    forecastContainer.style.display = "flex";
    toggleButton.textContent = "Hide Weather Forecast";
  } else {
    forecastContainer.style.display = "none";
    toggleButton.textContent = "See Upcoming Days Weather Forecast";
  }
}

// Call the fetchCurrentWeather and fetchForecast functions to display the current weather and forecast
fetchCurrentWeather();
fetchForecast();
