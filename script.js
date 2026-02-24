let map = L.map("mymap").setView([41.219, -73.2423303], 15);
let ourData = [];

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

fetch("./assets/location-data.json")
  .then((response) => response.json())
  .then((data) => {
    ourData = data;
    for (let i = 0; i < data.length; i++) {
      let option = document.createElement("option");
      option.value = i + 1;
      option.text = data[i].title;
      document.querySelector(".select-dropdown").appendChild(option);

      let marker = L.marker([data[i].latitude, data[i].longitude], {
        icon: ourCustomIcon,
      })
        .bindPopup(
          `<h3> ${data[i].title} </h3> 
<p> ${data[i].description} </p>
`
        )
        .on("click", () => {
          map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
        })
        .addTo(map);
    }
  })
  .catch((error) => alert(error));

document.querySelector(".map-zoom-out-btn").addEventListener("click", () => {
  map.flyTo([41.215, -73.2423303], 14);
});

document.querySelector(".search-btn").addEventListener("click", () => {
  let select = document.querySelector(".select-dropdown");
  let value = select.options[select.selectedIndex].value;
  map.flyTo(
    [ourData[value - 1].latitude, ourData[value - 1].longitude],
    ourData[value - 1].zoomLevel
  );
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
