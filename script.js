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

const locations = [];

// West Campus
locations.push(new Location("Martire Family Arena", 41.217369, -73.253267)); //41.217369776796986, -73.25326789091186
locations.push(new Location("Alliance Americas", 41.214289, -73.253662)); //41.21428933599361, -73.25366284622137

// Main Campus
locations.push(new Location("Campus Field", 41.219912, -73.245976)); //41.219912297862244, -73.24597648139546
locations.push(new Location("Pioneer Park", 41.221602, -73.246400)); //41.221602957703645, -73.24640027042267
locations.push(new Location("Multi-Sport Turf Field", 41.225612, -73.244817)); //41.2256125257203, -73.24481729418737
locations.push(new Location("Martire Business and Communications Center", 41.225130, -73.243854)); //41.2251307569504, -73.24385404597102

for(i=0; i<locations.length; i++) {
    L.marker([locations[i].long, locations[i].lat]).on('click', markerOnClick).addTo(map)
    .bindPopup(locations[i].name);
    //.openPopup();
}

var userLocation = null;

function markerOnClick(e)
{
  // alert(e.latlng);
  // alert("LatLng("+locations[0].long+", "+locations[0].lat+")");
  chosenSpotName = "Not Found";
  chosenSpotDist = 0;
  for(i=0; i<locations.length; i++) {
    if("LatLng(" + locations[i].long + ", " + locations[i].lat + ")" == e.latlng) {
      chosenSpotName = locations[i].name;
      chosenSpotDist = map.distance(userLocation.latlng, e.latlng);
    }
  }
  alert(chosenSpotName + " is " + Math.round(chosenSpotDist) + " meters away.");
}

let iconOption = {
  iconUrl: "./assets/location-marker.svg",
  iconSize: [30, 30],
};
let ourCustomIcon = L.icon(iconOption);

// Button to center on SHU
document.querySelector(".home-btn").addEventListener("click", () => {
  map.flyTo([41.215, -73.2423303], 15);
});

// Geolocation: https://leafletjs.com/examples/mobile/
map.locate();
function onLocationFound(e) {
    var radius = e.accuracy;
    if(radius > 100){radius = 100;}
    if(radius < 25){radius = 25;}
    
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point");

    L.circle(e.latlng, radius).addTo(map);
    userLocation = e;
}
map.on('locationfound', onLocationFound);
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

/*
function onClick(e) {
  alert("Hello, you clicked me");
  alert(e.name);
  console.log(e.name);
}
*/