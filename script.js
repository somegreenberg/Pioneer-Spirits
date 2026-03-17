/* 
Adam Aouassar, Sam Greenberg
ITI 418
Spring 2026
script.js
*/

// Initiate Map
let map = L.map("map").setView([41.219, -73.2423303], 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  maxZoom: 20,
  minZoom: 13,
  tileSize: 512,
  zoomOffset: -1,
  zoomDelta: .175
}).addTo(map);

let iconOption = {
  iconUrl: "./assets/location-marker.svg",
  iconSize: [30, 30],
};
let ourCustomIcon = L.icon(iconOption);

document.querySelector(".map-zoom-out-btn").addEventListener("click", () => {
  map.flyTo([41.215, -73.2423303], 14);
});


// Geolocation: https://leafletjs.com/examples/mobile/
map.locate();
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point");

    L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);
