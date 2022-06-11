const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {type: String, index: true},
    displayName: String,
    picture: String,
    rating: Number,
    content: String
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;