const apiKey = '8596ad6899cd2d84abad2eadef4426e4';
    function fetchWeather() {
    const API_KEY = "your_api_key"; 
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const cityInput = document.getElementById("city-input");
    const searchBtn = document.getElementById("search-btn");
    const locationBtn = document.getElementById("location-btn");
    const cityNameElem = document.getElementById("city-name");
    const tempElem = document.getElementById("temperature");
    const descElem = document.getElementById("description");
    const humidityElem = document.getElementById("humidity");
    const weatherIconElem = document.getElementById("weather-icon");
    const loadingSpinner = document.getElementById("loading-spinner");
    function fakeWeatherData() {
        return {
            name: "Metropolis",
            main: { temp: 25, humidity: 45 },
            weather: [{ description: "clear sky", icon: "01d" }],
        };
    }
    async function getWeatherData(city) {
        loadingSpinner.classList.remove("hidden");
        setTimeout(() => {
            const data = fakeWeatherData();
            displayWeather(data);
            loadingSpinner.classList.add("hidden");
        }, 2000); // Simulate API response time
    }
    function displayWeather(data) {
        cityNameElem.textContent = `City: ${data.name}`;
        tempElem.textContent = `Temperature: ${data.main.temp}°C`;
        descElem.textContent = `Weather: ${data.weather[0].description}`;
        humidityElem.textContent = `Humidity: ${data.main.humidity}%`;
        weatherIconElem.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    }
    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) getWeatherData(city);
    });
    const location = document.getElementById('location-input').value;
    if (!location) {
        alert('Please enter a city name');
        return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Location not found');
            return response.json();
        })
        .then(data => {
            document.getElementById('weather-location').textContent = `Location: ${data.name}`;
            document.getElementById('weather-temp').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('weather-desc').textContent = `Description: ${data.weather[0].description}`;
            document.getElementById('weather-humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById('weather-wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            alert(error.message);
        });
}
function fetchWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Location not found');
                    return response.json();
                })
                .then(data => {
                    document.getElementById('weather-location').textContent = `Location: ${data.name}`;
                    document.getElementById('weather-temp').textContent = `Temperature: ${data.main.temp}°C`;
                    document.getElementById('weather-desc').textContent = `Description: ${data.weather[0].description}`;
                    document.getElementById('weather-humidity').textContent = `Humidity: ${data.main.humidity}%`;
                    document.getElementById('weather-wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}
window.onload = fetchWeatherByGeolocation;
