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
            district: apiLocation.DISTRICT,
            county: apiLocation.COUNTY,
            description: apiLocation.DescriptionMobileWeb,

            details: {
                fee: ynBool(apiLocation.FEE),
                parking: ynBool(apiLocation.PARKING),
                disabled_access: ynBool(apiLocation.DSABLDACSS),
                restrooms: ynBool(apiLocation.RESTROOMS),
                dog_friendly: ynBool(apiLocation.DOG_FRIENDLY),
                picnic_area: ynBool(apiLocation.PCNC_AREA),
                campground: ynBool(apiLocation.CAMPGROUND),
                dunes: ynBool(apiLocation.DUNES),
                fishing: ynBool(apiLocation.FISHING),
                boating: ynBool(apiLocation.BOATING),
                photo1: apiLocation["Photo_1"],
                photo2: apiLocation["Photo_2"],
                photo3: apiLocation["Photo_3"],
                photo4: apiLocation["Photo_4"]
            },
            
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

const findNearest = (latitude, longitude) => {
    return new Promise((resolve) => {
        Beach.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [ longitude, latitude ]
                    }
                }
            }
        }).limit(10).find((error, results) => {
            if(error) console.error(error);
            else resolve(results);
        });
    });
}

const searchName = async (query) => {
    return await Beach.find({$text: {$search: query}}).limit(10).exec();
}

const getInfo = async (id) => {
    return await Beach.findById(id).select("+details").exec();
}

const exists = async (id) => {
    return await Beach.exists({_id: id});
}

function ynBool(yn) {
    return yn === "Yes";
}

exports.updateLocations = updateLocations;
exports.findNearest = findNearest;
exports.searchName = searchName;
exports.getInfo = getInfo;
exports.exists = exists;