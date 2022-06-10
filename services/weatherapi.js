const axios = require('axios');

const API_KEY = process.env.WEATHER_API;
const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather"

const getWeatherGeo = async (latitude, longitude) => {
    console.log(API_KEY);
    try {
        return (await axios.get(API_ENDPOINT + `?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)).data;
    } catch (error) {
        console.error(error);
    }
}