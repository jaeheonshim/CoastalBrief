const mongoose = require("mongoose");

const beachSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number
});

const Beach = mongoose.model("Beach", beachSchema);

module.exports = Beach;