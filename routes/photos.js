const placesAPI = require("../services/placesapi");

exports.getPhoto = async (req, res) => {
    const referenceId = req.params.referenceId;

    res.send(await placesAPI.getPhoto(referenceId));
}