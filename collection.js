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
  for(let i = 0; i <ca.length; i++) {
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
    
    locations = Papa.parse(text, { header: true });
    locations.data.forEach(function(row) {
	if (getCookie(row.Page) === "1") {
	    render.innerHTML +=
	    `<h3>
	    You havve visited ${row.Title}
	    </h3>`;
	}
	
    });
    
};
render_spirits();

