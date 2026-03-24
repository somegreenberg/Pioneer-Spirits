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

function Location(name, long, lat) {
  this.name = name;
  this.long = long;
  this.lat = lat;
}

// West Campus
const martireArena = new Location("Martier Family Arena", 41.217369776796986, -73.25326789091186);
const alliance = new Location("Alliance Americas", 41.21428933599361, -73.25366284622137);

// Main Campus
const campusField = new Location("Campus Field", 41.219912297862244, -73.24597648139546);
const pioneerPark = new Location("Pioneer Park", 41.221602957703645, -73.24640027042267);
const multiField = new Location("Multi-Sport Turf Field", 41.2256125257203, -73.24481729418737);
const martireCenter = new Location("Martire Business and Communications Center", 41.2251307569504, -73.24385404597102);

locations = [martireArena, alliance, campusField, pioneerPark, multiField, martireCenter];

for(i=0; i<locations.length; i++) {
    L.marker([locations[i].long, locations[i].lat]).addTo(map)
    .bindPopup(locations[i].name)
    .openPopup();
}

let iconOption = {
  iconUrl: "./assets/location-marker.svg",
  iconSize: [30, 30],
};
let ourCustomIcon = L.icon(iconOption);

// Button to center on SHU
document.querySelector(".map-zoom-out-btn").addEventListener("click", () => {
  map.flyTo([41.215, -73.2423303], 15);
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
