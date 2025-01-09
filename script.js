let map, infoWindow, autocomplete;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -25.7479, lng: 28.2293 },
        zoom: 10,
    });

    infoWindow = new google.maps.InfoWindow();

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-box'));
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function () {
        infoWindow.close();
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        }

        createMarker(place.geometry.location, place.name);
    });

    map.addListener('click', function (event) {
        const latLng = event.latLng;
        createMarker(latLng, 'Selected Location');
        infoWindow.setContent('Latitude: ' + latLng.lat() + '<br>Longitude: ' + latLng.lng());
        infoWindow.open(map);
    });
}

function createMarker(position, title) {
    const marker = new google.maps.Marker({
        position,
        map,
        title,
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(title);
        infoWindow.open(map, marker);
    });
}

window.onload = initMap;

