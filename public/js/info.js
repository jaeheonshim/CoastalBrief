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

    const reviewForm = $("#review_form");
    const getReviewRating = () => $("#new_review .rating input[name='stars']:checked").val();
    const reviewContent = document.getElementById("editor");

    const reviewError = $("#review_error");

    reviewForm.submit(function(event) {
        event.preventDefault();
        if(!getReviewRating()) {
            alert("Please give this review a rating!");
            return;
        }
        
        API.submitReview(getReviewRating(), reviewContent.value).then((data) => {
            location.reload(); 
        }).catch((error) => {
            reviewError.text(error.responseText);
        });
    });

    $("#delete_review").click(() => {
        API.deleteReview().then(() => {
            location.reload();
        }).catch((error) => {
            alert(error);
        });
    });
})();