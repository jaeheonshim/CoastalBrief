const axios = require('axios');

const PLACES_URI = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

const getNearbyPlaces = async (latitude, longitude) => {
    try {
        return (await axios.get(`${PLACES_URI}?location=${latitude}%2C${longitude}&radius=1000&rankby=prominence&key=${process.env.GOOGLE_MAPS_KEY}`)).data.results;
    } catch (error) {
        console.error(error);
    }
}

const getPlaceDetails = async (placeId) => {
    try {
        return (await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_KEY}`)).data.result;
    } catch (error) {
        console.error(error);
    }
}

exports.getNearbyPlaces = getNearbyPlaces;
exports.getPlaceDetails = getPlaceDetails;