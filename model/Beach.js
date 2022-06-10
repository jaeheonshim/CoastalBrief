const mongoose = require("mongoose");

const beachSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    latitude: Number,
    longitude: Number
});

const Beach = mongoose.model("Beach", beachSchema);

module.exports = Beach;