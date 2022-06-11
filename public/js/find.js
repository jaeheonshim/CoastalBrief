(function() {
    const geo = navigator.geolocation;

    const searchLoc = $("#search_location_btn");
    const searchName = $("#search_name_btn");
    
    const enableLocation = $("#enable_location_btn");
    const locationLoading = $("#location_loading");

    const dataTable = $("#data_table");

    function populateData(data) {
        $("#data_table tbody tr").remove();
        const table = dataTable.get(0);

        for(const dataRow of data) {
            const row = table.insertRow();

            const name = document.createElement("td");
            name.innerText = dataRow.name;
            row.appendChild(name);

            const description = document.createElement("td");
            description.innerText = dataRow.description;
            row.appendChild(description);

            const distance = document.createElement("td");
            distance.innerText = dataRow.distance;
            row.appendChild(distance);
        }
    }
    
    function setBtnSelected(btn, select) {
        if(select) {
            btn.addClass("btn-primary");
            btn.removeClass("btn-outline-primary");
        } else {
            btn.addClass("btn-outline-primary");
            btn.removeClass("btn-primary");
            btn.blur();
        }
    }

    function setLocationProgress(progress) {
        const locationBar = $("#location_bar");
        locationBar.attr("aria-valuenow", progress);
        locationBar.css("width", `${progress}%`);
    }

    searchLoc.click(() => {
        setBtnSelected(searchLoc, true);
        setBtnSelected(searchName, false);
    });

    searchName.click(() => {
        setBtnSelected(searchName, true);
        setBtnSelected(searchLoc, false);
    });

    enableLocation.click(() => {
        setLocationProgress(20);
        locationLoading.show();

        geo.getCurrentPosition((location) => {
            setLocationProgress(60);

            API.searchByLocation(location.coords.latitude, location.coords.longitude).then(data => {
                setLocationProgress(100);
                populateData(data);
            });
        }, (error) => {
            alert("Sorry, but there was an error retrieving your location. Please reload and try again.");
            console.error("Error retrieving location");
        });
    });
})();