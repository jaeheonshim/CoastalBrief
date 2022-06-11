(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    function initMap() {
        const coords = apiInfo.location.coordinates;
        const beachLocation = { lat: coords[1], lng: coords[0] };

        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: beachLocation,
        });

        const marker = new google.maps.Marker({
            position: beachLocation,
            map: map,
        });
    }

    window.initMap = initMap;
})();