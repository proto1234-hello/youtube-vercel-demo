const apiKey = '175bac234c8f73edd905eb8b3cfefe67';
const weatherDisplay = document.getElementById('weather-display');

document.getElementById('fetch-weather').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
      fetchWeather(city);
    } else {
      alert('Please enter a city name.');
    }
  });
  function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    document.getElementById("weather-display").innerHTML = "Loading...";
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
        document.getElementById("weather-display").innerHTML = `<p>Error: ${error.message}</p>`;
    });
        
    
}
function displayWeather(data) {
    const current = data.list[0];
    const forecast = data.list.filter((_, index) => index % 8 === 0).slice(1, 4);
  
    const currentWeatherHtml = `
      <div>
        <h2>${data.city.name}</h2>
        <p><strong>Condition:</strong> ${current.weather[0].description}</p>
        <p><strong>Temperature:</strong> ${current.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${current.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${current.wind.speed} m/s</p>
      </div>
    `;
  
    const forecastHtml = forecast
      .map(
        (day) => `
      <div style="margin-top: 10px;">
        <p><strong>${new Date(day.dt_txt).toDateString()}</strong></p>
        <p>Condition: ${day.weather[0].description}</p>
        <p>High: ${day.main.temp_max}°C, Low: ${day.main.temp_min}°C</p>
      </div>
    `
      )
      .join("");
  
    document.getElementById("weather-display").innerHTML = `
      <div>${currentWeatherHtml}</div>
      <h3>3-Day Forecast</h3>
      <div>${forecastHtml}</div>
    `;
  }
  

 
    
    


