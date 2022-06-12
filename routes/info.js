const dbservice = require("../services/dbservice");
const weatherService = require("../services/weatherservice");

const Review = require("../model/Review");

exports.getInfo = async (req, res) => {
    const beachInfo = await dbservice.getInfo(req.params.id);
    if(!beachInfo) {
        res.status(404).send("Not Found");
        return;
    }

    const weatherData = await weatherService.getBeachWeather(req.params.id);

    let userReview = null;

    if(req.session.passport) {
        const userId = req.session.passport.user.id;
        userReview = await Review.findOne({userId: userId});
    }

    const reviews = await Review.find({beachId: beachInfo._id});
    
    res.render("pages/info", {info: beachInfo, weather: weatherData, MAPS_API_KEY: process.env.GOOGLE_MAPS_KEY, userReview: userReview, reviews: reviews });
}