const endpoint = "http://localhost:8080";

const API = (function () {
    const searchByLocation = (latitude, longitude) => {
        return new Promise((resolve) => {
            $.post(`${endpoint}/find/geo/${latitude}/${longitude}`, function (data) {
                for (const row of data) {
                    const coords = row.location.coordinates;
                    row.distance = getDistanceFromLatLonInKm(latitude, longitude, coords[1], coords[0]).toFixed(1);
                }

                resolve(data);
            });
        });
    }

    const submitReview = (rating, content) => {
        const id = apiInfo._id;
        return new Promise((resolve) => {
            $.ajax({
                url: `${endpoint}/review/${id}/new`,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    rating: rating,
                    content: content
                }),
                success: function(response) {
                    console.log(response);
                }
            });
        })
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    return {
        searchByLocation: searchByLocation,
        getDistanceFromLatLonInKm: getDistanceFromLatLonInKm,
        submitReview: submitReview
    }
})();