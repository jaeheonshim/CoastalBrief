const Review = require("../model/Review");

const dbservice = require("../services/dbservice");

const stripJs = require("strip-js");

exports.newReview = async (req, res) => {
    if(!req.session.passport) {
        res.status(401).send("Unauthorized");
        return;
    }

    const beachId = req.params.beachId;
    if(!(await dbservice.exists(beachId))) {
        res.status(404).send("Beach not found");
        return;
    }

    
    const userId = req.session.passport.user.id;
    if(await Review.exists({userId: userId})) {
        res.status(400).send("Review already exists");
        return;
    }
    
    const displayName = req.session.passport.user.displayName;
    const picture = req.session.passport.user.photos[0].value;

    const rating = parseInt(body.rating);
    const content = stripJs(body.content);

    const newReview = new Review({
        userId: userId,
        displayName: displayName,
        picture: picture,
        rating: rating,
        content: content
    });

    await newReview.save();

    res.status(200).send();
}