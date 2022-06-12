const mongoose = require("mongoose");

const supplementalSchema = new mongoose.Schema({
    beachId: Number,
    extendedDescription: String,
    background: String,
});

const SupplementalInfo = mongoose.model("SupplementalInfo", supplementalSchema);

module.exports = SupplementalInfo;