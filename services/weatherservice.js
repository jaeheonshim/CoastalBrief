const WeatherData = require("../model/WeatherData");
const Beach = require("../model/Beach");

const weatherapi = require("./weatherapi");

const maxHistorical = 10 * 60

/**
 * Gets the weather data for a certain beach. If > 10 minutes since last 
 * update, we will make API call.
 * @param {Number} beachId 
 */
const getBeachWeather = async (beachId) => {
    const historicalData = await WeatherData.findOne({ beachId: beachId }).exec();
    const beach = await Beach.findById(beachId).exec();
    const location = beach.location.coordinates;

    if(!beach) {
        throw "Beach not found!";
    }

    if(!historicalData) {
        const recentData = await getWeatherModelGeo(beachId, location[1], location[0]);
        const weatherData = new WeatherData(recentData);

        weatherData.save();
        
        return recentData;
    } else if((new Date().getTime() - historicalData.updatedAt.getTime()) > maxHistorical) {
        const recentData = await getWeatherModelGeo(beachId, location[1], location[0]);
        WeatherData.updateOne({ _id: historicalData._id }, recentData);

        return recentData;
    } else {
        return historicalData;
    }
}

/**
 * Gets the weather data model for a certain set of coordinates
 */
const getWeatherModelGeo = async (beachId, latitude, longitude) => {
    const apiData = await weatherapi.getWeatherGeo(latitude, longitude);

    return {
        beachId: beachId,
        coord: apiData.coord,
        weather: apiData.weather[0],
        base: apiData.base,
        main: apiData.main,
        visibility: apiData.visibility,
        wind: apiData.wind,
        clouds: apiData.clouds,
        dt: apiData.dt,
        sys: apiData.sys,
        timezone: apiData.timezone,
        id: apiData.id,
        name: apiData.name,
        cod: apiData.cod,
        advice: {
            swimming: getSwimmingAdvice(apiData),
            surfing: getSurfingAdvice(apiData)
        }
    };
}

// https://www.ncei.noaa.gov/access/coastal-water-temperature-guide/faqs.html
// 70 - 78 degrees Fahrenheit
const swimmingTempRange = [294.261, 298.706];

// If winds are too fast the waves will be too choppy for swimming
const swimmingWindMax = 5.14;

// https://surflearner.com/wind-for-surfing-explained/
// less than 10 knots
const surfingWindRange = [0, 5.14444];

const getSwimmingAdvice = (weatherData) => {
    const conditionCode = weatherData.weather.id;
    const temperature = weatherData.main.temp;
    const windSpeed = weatherData.wind.speed;

    if(Math.floor(conditionCode / 100) == 2) {
        return [false, "There is a thunderstorm - you should not swim!"];
    } else if(temperature > swimmingTempRange[1]) {
        return [false, "It's a little too hot for swimming"];
    } else if(temperature < swimmingTempRange[0]) {
        return [false, "It's a little too cold for swimming"];
    } else if(windSpeed > swimmingWindMax) {
        return [false, "It might be too windy to swim"];
    } else {
        return [true, "It's an excellent day for swimming!"];
    }
}

const getSurfingAdvice = (weatherData) => {
    const conditionCode = weatherData.weather.id;
    const conditionDigit = Math.floor(conditionCode / 100);
    const windSpeed = weatherData.wind.speed; 

    if(conditionDigit == 2) {
        return [false, "There is a thunderstorm - you should not surf!"];
    } else if(conditionDigit == 6) {
        return [false, "It is snowing - you should not swim!"];
    } else if(conditionDigit == 5) {
        return [false, "It might be too rainy to surf"];
    } else if(windSpeed > surfingWindRange[1]) {
        return [false, "It's too windy to surf"];
    } else {
        return [true, "It's an excellent day for surfing!"];
    }
}

exports.getBeachWeather = getBeachWeather;