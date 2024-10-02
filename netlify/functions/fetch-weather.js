// netlify/functions/fetch-weather.js

const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const city = event.queryStringParameters.city || 'New York';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
