// Select the HTML element to manipulate
const today1 = document.querySelector('#today1');
const today2 = document.querySelector('#today2');
const message = document.querySelector('aside');

// Varibles for activity use
let citynames = ["New York","Sacramento","Cleveland","South Bend","Tampa Bay","Corpus Christi"];
let volume = 409;

function getCelsius(fahrenheit) {
	return (fahrenheit - 32) * (5/9);
}

// Set up the Date format object parameter for toLocaleDateString method.
const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	};

// Question #1
today1.innerHTML = new Date().toLocaleDateString("en-US", options);

// Question #2
// today2.innerHTML = "<strong>Volume</strong>: " + volume + " liters"; // Volume: 409 liters
today2.innerHTML = `<strong>Volume</strong>: ${volume} liters`;

// Question #3
const quantity = document.querySelector("#q").value;

// Question #4
const firstAside = document.querySelector("aside");
firstAside.innerHTML = "Welcome to <em>our</em> neighborhood!"

// Question #5
const tempInput = document.querySelector("#temp");
tempInput.setAttribute("value", getCelsius(33).toFixed(2));

// Question #6
const divs = document.querySelectorAll("div").length
document.querySelector("#divs").innerHTML = divs;

// Question #7
const filterC = citynames.filter(city => city.charAt(0) === "C");
document.querySelector("#c-names").textContent = filterC;