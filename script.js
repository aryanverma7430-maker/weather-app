async function getWeather() {

    let city = document.getElementById("city").value.trim();

    let result = document.getElementById("result");

    if (city === "") {
        alert("Please enter city name!");
        return;
    }

    result.innerHTML = "Loading...";

    try {

        // Find city location
        let geoResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name="
            + encodeURIComponent(city) + "&count=1"
        );

        let geoData = await geoResponse.json();

        if (!geoData.results) {
            result.innerHTML = "City not found!";
            return;
        }

        let latitude = geoData.results[0].latitude;
        let longitude = geoData.results[0].longitude;
        let cityName = geoData.results[0].name;

        // Get weather details
        let response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude="
            + latitude + "&longitude=" + longitude
            + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );

        let data = await response.json();

        let weather = data.current;

        result.innerHTML = `
            <h2>${cityName}</h2>

            <div class="weather-info">
                <h2>${weather.temperature_2m} °C</h2>
                <p>Temperature</p>
            </div>

            <div class="weather-info">
                <h3>${weather.relative_humidity_2m}%</h3>
                <p>Humidity</p>
            </div>

            <div class="weather-info">
                <h3>${weather.wind_speed_10m} km/h</h3>
                <p>Wind Speed</p>
            </div>
        `;

    }

    catch (error) {
        result.innerHTML = "Unable to get weather!";
    }
}
