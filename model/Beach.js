const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
    fee: Boolean,
    parking: Boolean,
    disabled_access: Boolean,
    restrooms: Boolean,
    dog_friendly: Boolean,
    picnic_area: Boolean,
    campground: Boolean,
    dunes: Boolean,
    fishing: Boolean,
    boating: Boolean,
    photo1: String,
    photo2: String,
    photo3: String,
    photo4: String
}, {_id: false });

const beachSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    district: String,
    county: String,
    description: String,

    details: {
        type: detailsSchema,
        select: false
    },
    
    location: {
        type: { type: "String" },
        coordinates: []
    }
});

beachSchema.index({ location: "2dsphere" });
beachSchema.index({ name: "text" });

const Beach = mongoose.model("Beach", beachSchema);

module.exports = Beach;