const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {type: String, index: true},
    beachId: Number,
    displayName: String,
    picture: String,
    rating: Number,
    content: String
}, {
    timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;