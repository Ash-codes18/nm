const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with a valid OpenWeatherMap API Key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const errorDisplay = document.getElementById('error');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        errorDisplay.textContent = '';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (err) {
        weatherResult.style.display = 'none';
        errorDisplay.textContent = err.message;
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('condition').textContent = data.weather[0].main;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;
    
    weatherResult.style.display = 'block';
}