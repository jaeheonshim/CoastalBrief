const dbservice = require("../services/dbservice");
const weatherService = require("../services/weatherservice");
const placesAPI = require("../services/placesapi");

const Review = require("../model/Review");
const SupplementalInfo = require("../model/SupplementalInfo");

exports.getInfo = async (req, res) => {
    const beachInfo = await dbservice.getInfo(req.params.id);
    if(!beachInfo) {
        res.status(404).send("Not Found");
        return;
    }

    const weatherData = await weatherService.getBeachWeather(req.params.id);
    const supplementalInfo = await SupplementalInfo.findOne({beachId: beachInfo._id});

    let userReview = null;

    if(req.session.passport) {
        const userId = req.session.passport.user.id;
        userReview = await Review.findOne({userId: userId, beachId: beachInfo._id});
    }

    const reviews = await Review.find({beachId: beachInfo._id}).sort({"createdAt": "desc"});
    let nearbyPlaces = await placesAPI.getNearbyPlaces(beachInfo.location.coordinates[1], beachInfo.location.coordinates[0]);
    nearbyPlaces = nearbyPlaces.filter(place => place.business_status == "OPERATIONAL").slice(0, 7);

    for(const place of nearbyPlaces) {
        const details = await placesAPI.getPlaceDetails(place.place_id);

        place.details = details;
    }

    res.render("pages/info", {info: beachInfo, nearbyPlaces: nearbyPlaces, weather: weatherData, MAPS_API_KEY: process.env.GOOGLE_MAPS_KEY, userReview: userReview, reviews: reviews, supplemental: supplementalInfo });
}