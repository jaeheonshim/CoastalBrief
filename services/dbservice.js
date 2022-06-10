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
            latitude: apiLocation.LATITUDE,
            longitude: apiLocation.LONGITUDE
        });

        try {
            if(await Beach.exists({_id: id})) {
                promises.push(dbLocation.updateOne({ _id: id }));
            } else {
                promises.push(dbLocation.save());
            }
        } catch(error) {
            console.error(error);
        }

        ++updateCount;
    }

    Promise.all(promises).then(() => {
        console.log(`Successfully retrieved and saved/updated ${updateCount} entries.`);
    });
}

exports.updateLocations = updateLocations;