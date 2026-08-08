import { setDates } from './date.mjs';
import { setNavigation } from './navigation.mjs';

setNavigation();
setDates();

const resultsContainer = document.querySelector("#results");
const getString = window.location.search;
const urlParams = new URLSearchParams(getString);
    
if (getString === "") {
    resultsContainer.innerHTML = `<p>No application data was found. Please submit the <a href="contact.html">inquiry form</a>.</p>`;
} else {
    const getValue = (field) => {
        return urlParams.get(field) || "Not provided";
    };

    resultsContainer.innerHTML = `
        <p><strong>Full Name:</strong> ${getValue('name')}</p>
        <p><strong>Email:</strong> ${getValue('email')}</p>
        <p><strong>Subject:</strong> ${getValue('subject')}</p>
        <p><strong>Message:</strong> ${getValue('message')}</p>
    `;
}

    