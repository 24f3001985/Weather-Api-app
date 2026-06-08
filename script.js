const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const apiKey = document.getElementById("apiKey").value.trim();
    const city = document.getElementById("cityInput").value.trim();

    const error = document.getElementById("error");
    const weatherCard = document.getElementById("weatherCard");

    error.textContent = "";

    if (!apiKey) {
        error.textContent = "Please enter your WeatherAPI key.";
        return;
    }

    if (!city) {
        error.textContent = "Please enter a city name.";
        return;
    }

    try {

        const url =
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            error.textContent = data.error.message;
            weatherCard.style.display = "none";
            return;
        }

        document.getElementById("city").textContent =
            `${data.location.name}, ${data.location.country}`;

        document.getElementById("temp").textContent =
            `${data.current.temp_c}°C`;

        document.getElementById("condition").textContent =
            data.current.condition.text;

        document.getElementById("humidity").textContent =
            data.current.humidity;

        document.getElementById("wind").textContent =
            data.current.wind_kph;

        document.getElementById("icon").src =
            "https:" + data.current.condition.icon;

        weatherCard.style.display = "block";

    } catch (err) {
        error.textContent = "Failed to fetch weather data.";
    }
}