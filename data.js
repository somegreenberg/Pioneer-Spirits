/* 
 Adam Aouassar, Sam Greenberg
 ITI 418
 Spring 2026
 data.js
 */

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
	let c = ca[i];
	while (c.charAt(0) === ' ') {
	    c = c.substring(1);
	}
	if (c.indexOf(name) === 0) {
	    return c.substring(name.length, c.length);
	}
    }
    return "";
}

async function reset() {
    const response = await fetch('locationList.csv');
    const text = await response.text();
    
    locations = Papa.parse(text, {header: true});
    locations.data.forEach(function (row) {
	document.cookie = row.Page +"=0; path=/";
    });
    document.getElementById("output").innerHTML = "Save was reset"
}

async function load() {
    const response = await fetch('locationList.csv');
    const text = await response.text();
    const input = document.getElementById("input").value.split("1");
    console.log(input);
    
    document.getElementById("output").innerHTML = ""
    await reset();
    
    locations = Papa.parse(text, {header: true});
    let qty = 0
    locations.data.forEach(function (row) {
	let short = row.Page.split(".")[0];
	if ( input.includes(short) ){
	    document.cookie = row.Page +"=1; path=/";
	    qty++;
	}
    });
    document.getElementById("output").innerHTML = `Loaded your ${qty} spirits` 
};

async function copy() {
    const response = await fetch('locationList.csv');
    const text = await response.text();
    let saveString = "";
    
    locations = Papa.parse(text, {header: true});
    locations.data.forEach(function (row) {
	let short = row.Page.split(".")[0];
	if (getCookie(row.Page) === "1") {
	    saveString += short+"1"
	}
    });
    document.getElementById("output").innerHTML = saveString+" copied to clipboard"
    navigator.clipboard.writeText(saveString);
}

