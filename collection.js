/* 
 Adam Aouassar, Sam Greenberg
 ITI 418
 Spring 2026
 collection.js
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

async function render_spirits() {
    const response = await fetch('locationList.csv');
    const text = await response.text();
    const render = document.getElementById("spirits");
    
    locations = Papa.parse(text, {header: true});
    locations.data.forEach(function (row) {
	let short = row.Page.split(".")[0];
	let visited = "Not Visited";
	if (getCookie(row.Page) === "1") {
	    visited = "Collected!";
	}
	render.innerHTML += `
	    <a href="pages/${row.Page}"><h2>
	    ${row.Title}
	    </h2></a><p>
	    ${visited}
	    </p>
	`;
	if (visited === "Collected!") {
	    render.innerHTML += `<img src="pages/images/${short}.jpg">`;
	} else {
	    render.innerHTML += `
		<img src="pages/images/${short}.jpg" class="locked">`;
	}
	
	render.innerHTML += "_____<br>";
    });
};
render_spirits();
