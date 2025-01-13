// map.js
let map;
let marker;
const infoWindow = new google.maps.InfoWindow();

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

    // Add click event listener to the map
    map.addListener("click", (event) => {
        // Get the clicked location
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

// Function to get place details using reverse geocoding
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

// Initialize the map
window.onload = initMap;