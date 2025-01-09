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

    map.addListener("click", (event) => {
        dropPin(event.latLng);
        getPlaceDetails(event.latLng);
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
    const content = `<div><strong>${place.name}</strong><br>${place.formatted_address}</div>`;
    infoWindow.setContent(content);
    infoWindow.open(map, marker);
}

function getPlaceDetails(location) {
    const service = new google.maps.places.PlacesService(map);
    service.getDetails({ location: location }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            dropPin(location);
            showInfoWindow(place);
        }
    });
}

window.onload = initMap;
