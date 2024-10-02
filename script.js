document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('city').value;

  fetch(`/.netlify/functions/fetch-weather?city=${city}`)
    .then(response => response.json())
    .then(data => {
      const weatherDiv = document.getElementById('weather');
      if (data.error) {
        weatherDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      } else {
        weatherDiv.innerHTML = `
          <p>Location: ${data.name}</p>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Weather: ${data.weather[0].description}</p>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
});
