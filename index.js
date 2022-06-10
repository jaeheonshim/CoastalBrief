require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cron = require("node-cron")

const dbservice = require("./services/dbservice");

const port = process.env.PORT || 8080;
const app = express();

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