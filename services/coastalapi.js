const axios = require('axios');

const LOCATIONS_URI = "https://api.coastal.ca.gov/access/v1/locations";

const getLocations = async () => {
    try {
        return (await axios.get(LOCATIONS_URI)).data;
    } catch (error) {
        console.error(error);
    }
}

exports.getLocations = getLocations;