// Timbuktu coordinates
const LATITUDE = 16.7769;
const LONGITUDE = -3.0039;
const API_KEY = '44b87d1411406ee4957748c0d2847b36'; 
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

async function loadWeatherData() {
    try {
        const response = await fetch(WEATHER_URL);
        const data = await response.json();
        
        // Display current weather
        const currentWeather = data.list[0];
        displayCurrentWeather(currentWeather, data.city);
        
        // Display forecast (every 8th item is 24 hours apart)
        const forecastDays = [data.list[0], data.list[8], data.list[16]];
        displayForecast(forecastDays);
        
    } catch (error) {
        console.error('Error loading weather data:', error);
        displayWeatherError();
    }
}

function displayCurrentWeather(weather, city) {
    const weatherInfo = document.getElementById('weather-info');
    
    const temp = Math.round(weather.main.temp);
    const description = weather.weather[0].main;
    const humidity = weather.main.humidity;
    const windSpeed = Math.round(weather.wind.speed * 3.6); // Convert m/s to km/h
    
    weatherInfo.innerHTML = `
        <div style="font-size: 1.2rem; margin-bottom: 1rem;">
            <strong>${city.name}, ${city.country}</strong>
        </div>
        <div style="font-size: 2.5rem; font-weight: bold; color: var(--primary-color); margin: 1rem 0;">
            ${temp}°C
        </div>
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">
            <strong>Condition:</strong> ${description}
        </p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
    `;
}

function displayForecast(forecastDays) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    
    forecastDays.forEach(day => {
        const date = new Date(day.dt * 1000);
        const temp = Math.round(day.main.temp);
        const description = day.weather[0].main;
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <h4>${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h4>
            <div class="temp">${temp}°C</div>
            <p>${description}</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

function displayWeatherError() {
    const weatherInfo = document.getElementById('weather-info');
    const forecastContainer = document.getElementById('forecast-container');
    
    weatherInfo.innerHTML = '<p class="loading">Unable to load weather data. Please try again later.</p>';
    forecastContainer.innerHTML = '<p class="loading">Unable to load forecast data.</p>';
}

// Load weather data when page loads
document.addEventListener('DOMContentLoaded', loadWeatherData);

// Refresh weather data every 30 minutes
setInterval(loadWeatherData, 30 * 60 * 1000);