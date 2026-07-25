import { setDates } from './date.mjs';
import { setNavigation } from './navigation.mjs';

setNavigation();
setDates();

const resultsContainer = document.getElementById('results');

const getString = window.location.search;
const myInfo = new URLSearchParams(getString);

if (getString === "") {
    resultsContainer.innerHTML = `<p>No application data was found. Please submit the <a href="join.html">membership form</a>.</p>`;
} else {
    const getValue = (field) => {
        return myInfo.get(field) || "Not provided";
    };

    resultsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${getValue('first_name')}</p>
        <p><strong>Last Name:</strong> ${getValue('last_name')}</p>
        <p><strong>Email:</strong> ${getValue('email')}</p>
        <p><strong>Mobile Phone:</strong> ${getValue('phone')}</p>
        <p><strong>Business Name:</strong> ${getValue('organization')}</p>
        <p><strong>Application Date:</strong> ${getValue('timestamp')}</p>
    `;
}