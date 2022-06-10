const weatherService = require("../services/weatherservice");

exports.getWeather = async (req, res) => {
    const beachId = req.params.id;

    const weatherData = await weatherService.getBeachWeather(beachId);
    const advice = {
        swimming: getSwimmingAdvice(weatherData),
        surfing: getSurfingAdvice(weatherData)
    }

    weatherData["advice"] = advice;

    res.send(weatherData);
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