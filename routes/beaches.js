const dbservice = require("../services/dbservice");

exports.geoFind = async (req, res) => {
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;

    const searchResult = await dbservice.findNearest(latitude, longitude);
    res.send(searchResult);
}

exports.nameSearch = async (req, res) => {
    const query = req.params.query;
    const searchResult = await dbservice.searchName(query);
    res.send(searchResult);
}

exports.getInfo = async (req, res) => {
    const id = req.params.id;
    const searchResult = await dbservice.getInfo(id);
    res.send(searchResult);
}