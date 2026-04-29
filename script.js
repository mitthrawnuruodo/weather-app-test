document.getElementById('getWeather').addEventListener('click', async () => {
  const city = document.getElementById('city').value.trim();
  const weatherDiv = document.getElementById('weather');

  if (!city) {
    weatherDiv.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  try {
    const response = await fetch(`/.netlify/functions/fetch-weather?city=${city}`);

    if (!response.ok) {
      weatherDiv.innerHTML = `<p>Error: ${response.status} ${response.statusText}</p>`;
      return;
    }

    const data = await response.json();
    //console.log(data);
    const { name, main: { temp }, sys: { country }, weather: [{description}] } = data;

    weatherDiv.innerHTML = `
      <p>Location: ${name} (${country})</p>
      <p>Temperature: ${temp}°C</p>
      <p>Weather: ${description}</p>
    `;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherDiv.innerHTML = '<p>Something went wrong. Please try again.</p>';
  }
});