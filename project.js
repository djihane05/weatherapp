document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("get-weather");
  const cityInput = document.getElementById("city-input");
  const weatherInfo = document.getElementById("weather-info");
  const sunImage = document.getElementById("sun-image");
  const moonImage = document.getElementById("moon-image");
  const cloudyImage = document.getElementById("cloudy-image");
  const rainImage = document.getElementById("rain-image");
  const cityName = document.getElementById("city-name");
  const skyCondition = document.getElementById("sky-condition");
  const temperature = document.getElementById("temperature");
  const windSpeed = document.getElementById("wind-speed");
  const humidity = document.getElementById("humidity");

  button.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (city) {
      try {
        const apiKey = "766a300f83b04f953fddb53cbec0cba4";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        if (data.main) {
          const weatherDescription = data.weather[0].description.toLowerCase();
          const sunrise = data.sys.sunrise * 1000; // Convert to milliseconds
          const sunset = data.sys.sunset * 1000; // Convert to milliseconds
          const now = new Date().getTime(); // Current time in milliseconds

          // Update weather info
          temperature.textContent = `Temperature: ${data.main.temp} °C`;
          windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
          humidity.textContent = `Humidity: ${data.main.humidity}%`;

          // Clear previous content
          cityName.textContent = city;
          skyCondition.textContent = "";
          sunImage.classList.remove("visible");
          moonImage.classList.remove("visible");
          cloudyImage.classList.remove("visible");
          rainImage.classList.remove("visible");

          // Determine which image to show
          if (weatherDescription.includes("clear sky")) {
            if (now >= sunrise && now <= sunset) {
              // Daytime
              sunImage.classList.add("visible");
              skyCondition.textContent = "The sky is clear and it's daytime!";
            } else {
              // Nighttime
              moonImage.classList.add("visible");
              skyCondition.textContent = "The sky is clear and it's nighttime!";
            }
          } else if (weatherDescription.includes("clouds")) {
            // Cloudy weather
            cloudyImage.classList.add("visible");
            skyCondition.textContent = `Current weather is ${weatherDescription}.`;
          } else if (weatherDescription.includes("rain")) {
            // Rainy weather
            rainImage.classList.add("visible");
            skyCondition.textContent = `Current weather is ${weatherDescription}.`;
          } else {
            skyCondition.textContent = `Current weather is ${weatherDescription}.`;
          }
        } else {
          // Handle case where data.main is not present
          temperature.textContent = "";
          windSpeed.textContent = "";
          humidity.textContent = "";
          cityName.textContent = "";
          skyCondition.textContent = "City not found.";
          sunImage.classList.remove("visible");
          moonImage.classList.remove("visible");
          cloudyImage.classList.remove("visible");
          rainImage.classList.remove("visible");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  });
});
