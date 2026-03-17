class Location {
    constructor(name, longitude, lattitude) {
        this.name = name;
        this.longitude = longitude;
        this.lattitude = lattitude;
        this.visited = false;
    }

    isVisited() {
        return this.visited;
    }

    markVisited() {
        this.visited = true;
    }

    distance(long, lat) {
        longDist = long - this.longitude;
        latDist = lat - this.lattitude;
        return Math.sqrt((longDist*longDist) + (latDist*latDist));
    }
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

// console.log(locations);