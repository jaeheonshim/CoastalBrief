require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cron = require("node-cron")

// MIDDLEWARES
const session = require("express-session");

// SERVICES
const dbservice = require("./services/dbservice");
const weatherService = require("./services/weatherservice");
const randomgreeting = require("./util/randomgreeting");

// ROUTES
const beaches = require("./routes/beaches");
const weather = require("./routes/weather");

const port = process.env.PORT || 8080;
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"
}));

app.use((req, res, next) => {
    if(req.session.passport) {
        const displayName = req.session.passport.user.displayName;
        const photos = req.session.passport.user.photos;
        
        if(photos.length > 0) {
            res.locals.profilePhoto = photos[0].value;
        }

        res.locals.displayName = displayName;
    }

    next();
});

async function main() {
    await mongoose.connect(process.env.MONGODB_ATLAS);

    app.listen(port, () => {
        console.log(`CoastalHacks app running on port ${port}!`);
    });

    scheduleCron();
}

function scheduleCron() {
    cron.schedule("0 * * * *", () => {
        dbservice.updateLocations();
    })
}

main().catch(err => console.error(err));

app.post("/find/geo/:latitude/:longitude", beaches.geoFind);
app.post("/find/name/:query", beaches.nameSearch);
app.post("/info/:id", beaches.getInfo);

app.post("/weather/:id", weather.getWeather);

app.get("/session", function(req, res) {
    res.send(req.session);
});

app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        if(err) console.error(err);
        res.redirect("/");
    });
});

app.get("/", (req, res) => res.render("pages/index"));

app.get("/find", (req, res) => {
    res.render("pages/find", {greeting: randomgreeting()});
});

app.get("/info/:id", async (req, res) => {
    const beachInfo = await dbservice.getInfo(req.params.id);
    const weatherData = await weatherService.getBeachWeather(req.params.id);

    res.render("pages/info", {info: beachInfo, weather: weatherData});
});

/* PASSPORT OAUTH */

const GOOGLE_CLIENT_ID = process.env.GOOGLE_OAUTH_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_OAUTH_SECRET;

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"]}));
app.get("/auth/google/callback", 
    passport.authenticate("google", 
    { failureRedirect: "/error"}),
    function(req, res) {
        res.redirect("/find");
    }
);