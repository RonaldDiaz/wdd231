const getString = window.location.search;
console.log(getString);

const myInfo = new URLSearchParams(getString);
console.log(myInfo);

const firstName = myInfo.get("first");
const lastName = myInfo.get("last");
const phone = myInfo.get("phone");
const ordinance = myInfo.get("ordinance");
const date = myInfo.get("date");
const locationField = myInfo.get("location");
const email = myInfo.get("email");

const results = document.querySelector("#results");
results.innerHTML = `
    <p>Appoinment for: ${firstName} ${lastName}</p>
    <p>Proxy ${ordinance} on ${date} in the ${locationField}</p>
    <p>Your Phone: ${phone}</p>
    <p>Your email is ${email}</p>    
`


