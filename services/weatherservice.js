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

    if(!historicalData) {
        const beach = await Beach.findById(beachId).exec();
        const location = beach.location;

        const recentData = await getWeatherModelGeo(location[1], location[0]);
        const weatherData = new WeatherData(recentData);

        weatherData.save();
        
        return recentData;
    } else if((new Date().getTime() - historicalData.updatedAt.getTime()) > maxHistorical) {
        const beach = await Beach.findById(beachId).exec();
        const location = beach.location;

        const recentData = await getWeatherModelGeo(location[1], location[0]);
        WeatherData.updateOne({ _id: historicalData._id }, recentData);

        return recentData;
    } else {
        return historicalData;
    }
}

/**
 * Gets the weather data model for a certain set of coordinates
 */
const getWeatherModelGeo = async (latitude, longitude) => {
    // const beach = await Beach.findById(beachId).exec();
    // const location = beach.location;

    const apiData = await weatherapi.getWeatherGeo(longitude, latitude);

    return {
        beachId: beach._id,
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
        cod: apiData.cod
    };
}

exports.getBeachWeather = getBeachWeather;