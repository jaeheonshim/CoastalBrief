const Beach = require("../model/Beach");
const coastalapi = require("./coastalapi");

const updateLocations = async () => {
    console.log("Retrieving all locations from API")
    const apiData = await coastalapi.getLocations();

    let updateCount = 0;
    const promises = [];
    
    for(const apiLocation of apiData) {
        const id = apiLocation.ID;

        const dbLocation = new Beach({
            _id: id,
            name: apiLocation.NameMobileWeb,
            location: {
                type: "Point",
                coordinates: [ apiLocation.LONGITUDE, apiLocation.LATITUDE ]
            }
        });

        const upsertData = dbLocation.toObject();
        delete upsertData._id;

        try {
            promises.push(Beach.updateOne(
                { _id: id},
                upsertData,
                { upsert: true },
            ));
        } catch(error) {
            console.error(error);
        }

        ++updateCount;
    }

    Promise.all(promises).then(() => {
        console.log(`Successfully retrieved and saved/updated ${updateCount} entries.`);
    });
}

const findNearest = async (latitude, longitude) => {
    Beach.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [ longitude, latitude ]
                }
            }
        }
    }).limit(5).find((error, results) => {
        if(error) console.error(error);
        console.log(results);
    });
}

exports.updateLocations = updateLocations;
exports.findNearest = findNearest;