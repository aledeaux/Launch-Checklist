// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   //  Here is the HTML formatting for our mission target div.
   let missionDestination = 
    "           <h2>Mission Destination</h2>"+
    "           <ol>"+
    "                <li>Name: " + name + " </li>"+
    "                <li>Diameter: " + diameter + " </li>"+
    "                <li>Star: " + star + "</li>"+
    "                <li>Distance from Earth: " + distance + " </li>"+
    "                <li>Number of Moons: " + moons + " </li>"+
    "            </ol>"+
    "           <img src=\"" + imageUrl + "\">";
    document.getElementById("missionTarget").innerHTML = missionDestination;
}

function validateInput(testInput) {
   if (testInput === "") {
       return "Empty";
   }    else if (isNaN(testInput)===true){
       return "Not a Number";
   }    else if (isNaN(testInput)===false){
    return "Is a Number";
   }    else {
       return "All Entries Validated";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    
   if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
       window.alert("All fields are required.");
       
   }    else if (validateInput(pilot) === "Is a Number"){
       window.alert("input for the pilot cannot be a number.");
   }    else if (validateInput(copilot) === "Is a Number"){
        window.alert("input for the copilot cannot be a number.");
    }   else if (validateInput(fuelLevel) === "Not a Number"){
        window.alert("input for the fuel level must be a number.");
    }   else if (validateInput(cargoMass) === "Not a Number"){
        window.alert("input for the cargo mass must be a number.");
    }
    else {
        list.style.visibility = "visible";
        
        document.getElementById("pilotStatus").innerText = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerText = `Co-pilot ${copilot} is ready for launch`;

        let launchStatus = document.getElementById("launchStatus");
        let cargoStatus = document.getElementById("cargoStatus");
        let fuelStatus = document.getElementById("fuelStatus");

        if (fuelLevel < 10000 && cargoMass <= 10000){
            fuelStatus.innerText = "Fuel level too low for launch";
            cargoStatus.innerText = "Cargo mass low enough for launch";
            launchStatus.innerText = "Shuttle not ready for launch";
            launchStatus.style.color = "rgb(199,37,78)";
        }
        
        if (fuelLevel < 10000 && cargoMass > 10000){
            fuelStatus.innerText = "Fuel level too low for launch";
            cargoStatus.innerText = "Cargo mass too heavy for launch";
            launchStatus.innerText = "Shuttle not ready for launch";
            launchStatus.style.color = "rgb(199,37,78)";
        }

        if (fuelLevel >= 10000 && cargoMass <= 10000){
            fuelStatus.innerText = "Fuel level high enough for launch";
            cargoStatus.innerText = "Cargo mass low enough for launch";
            launchStatus.innerText = "Shuttle Is Ready For Launch";
            launchStatus.style.color = "rgb(65,159,106)";
        }

        if (fuelLevel >= 10000 && cargoMass > 10000){
            fuelStatus.innerText = "Fuel level high enough for launch";
            cargoStatus.innerText = "Cargo mass too heavy for launch";
            launchStatus.innerText = "Shuttle not ready for launch";
            launchStatus.style.color = "rgb(199,37,78)";
        }
    }
}

async function myFetch() {
 
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        console.log("response");
        console.log(response);
        return response.json();   
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    console.log(planets);
    let randomInt = Math.floor(Math.random() * planets.length);
    return planets[randomInt];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
