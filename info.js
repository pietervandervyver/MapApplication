// info.js
function showInfoWindow(place) {
    const content = `<div><strong>${place.name}</strong><br>${place.formatted_address}</div>`;
    infoWindow.setContent(content);
    infoWindow.open(map, marker);

    // Display additional info in the info section
    displayInfo(place);
}

function displayInfo(place) {
    const infoDiv = document.getElementById("info");
    infoDiv.innerHTML = `<h3>Location Details:</h3>
                         <p><strong>Name:</strong> ${place.name}</p>
                         <p><strong>Address:</strong> ${place.formatted_address}</p>
                         <p><strong>Rating:</strong> ${place.rating ? place.rating : 'N/A'}</p>`;
