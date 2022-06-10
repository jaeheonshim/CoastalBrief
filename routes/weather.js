const weatherService = require("../services/weatherservice");

exports.getWeather = async (req, res) => {
    const beachId = req.params.id;

    const weatherData = await weatherService.getBeachWeather(beachId);
    res.send(weatherData);
}