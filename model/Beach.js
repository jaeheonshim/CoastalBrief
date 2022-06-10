const mongoose = require("mongoose");

const beachSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    location: {
        type: { type: "String" },
        coordinates: []
    }
});

beachSchema.index({ location: "2dsphere" });

const Beach = mongoose.model("Beach", beachSchema);

module.exports = Beach;