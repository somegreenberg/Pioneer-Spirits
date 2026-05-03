/* 
Adam Aouassar, Sam Greenberg
ITI 418
Spring 2026
script.js
*/

// Initiate Map
let map = L.map("map").setView([41.219709, -73.248758], 15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  maxZoom: 20,
  minZoom: 13,
  tileSize: 512,
  zoomOffset: -1,
  zoomDelta: .175
}).addTo(map);

let locations = [];

const customIcon = L.icon({
    iconUrl: 'favicon.png',
    iconSize: [64, 64],
    iconAnchor: [32, 56]
});

async function loadCSV() {
    const response = await fetch('locationList.csv');
    const text = await response.text();
  
    locations = Papa.parse(text, { header: true });
    locations.data.forEach(function(row) {
	console.log(row.Title, row.Page);
	L.marker([parseFloat(row.Latitude), parseFloat(row.Longitude)],
	    { icon: customIcon }
	)
	.on('click', function(e) {
	    markerOnClick(e, row);
	})
	.addTo(map)
	.bindPopup(row.Title);
    });
}
loadCSV();

var userLocation = null;

function markerOnClick(e, row)
{
  // alert(e.latlng);
  // alert("LatLng("+locations[0].long+", "+locations[0].lat+")");
  const chosenSpotName = row.Title;
  const chosenHTML = row.Page;
  const chosenSpotDist = map.distance(userLocation.latlng, e.latlng);
  
  alert(chosenSpotName + " is " + Math.round(chosenSpotDist) + " meters away.");
  
  // window.open("pages/" + chosenHTML, '_self').focus();
  if(chosenSpotDist <= 200) { // 200 is for testing, final product should be 50
    // alert("Close Enough");
    // Update Cookies
    document.cookie = chosenHTML +"=1; path=/";
    window.open("pages/" + chosenHTML, '_self').focus();
  } else {
    //alert("Too far away");
  }
}

let iconOption = {
  iconUrl: "./assets/location-marker.svg",
  iconSize: [30, 30],
};
let ourCustomIcon = L.icon(iconOption);

// Button to center on SHU
document.querySelector(".home-btn").addEventListener("click", () => {
  map.flyTo([41.219709, -73.248758], 15);
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
