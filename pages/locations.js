/* 
 Adam Aouassar, Sam Greenberg
 ITI 418
 Spring 2026
 locations.js
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

let fileName = location.pathname.split("/").slice(-1)[0];
console.log( fileName );

const render = document.getElementById("collected");
if (getCookie(fileName) === "1") {
	    render.innerHTML =
	    "Collected!";
	}