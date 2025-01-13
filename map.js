let map;
let marker;
const infoWindow = new google.maps.InfoWindow();
const infoDiv = document.getElementById("info");

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"));
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        map.setCenter(place.geometry.location);
        map.setZoom(15);
        dropPin(place.geometry.location);
        showInfoWindow(place);
    });

    map.addListener("click", (event) => {
        const clickedLocation = event.latLng;
        dropPin(clickedLocation);
        getPlaceDetails(clickedLocation);
    });
}

function dropPin(location) {
    if (marker) {
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function showInfoWindow(place) {
    const contentString = `
        <div>
            <h2>${place.name || 'Location'}</h2>
            <p>${place.formatted_address || 'No address available'}</p>
        </div>
    `;
    infoWindow.setContent(contentString);
    infoWindow.open(map, marker);

    infoDiv.innerHTML = contentString;
}

function getPlaceDetails(location) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
        if (status === 'OK') {
            if (results[0]) {
                const place = results[0];
                dropPin(location);
                showInfoWindow(place);
            } else {
                console.log('No results found');
            }
        } else {
            console.error('Geocoder failed due to: ' + status);
        }
    });
}

window.onload = initMap;
