const dbservice = require("../services/dbservice");

exports.geoFind = async (req, res) => {
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;

    const searchResult = await dbservice.findNearest(latitude, longitude);
    res.send(searchResult);
}