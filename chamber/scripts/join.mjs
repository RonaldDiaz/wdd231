import { setDates } from './date.mjs';
import { setNavigation } from './navigation.mjs';

setNavigation();
setDates();

const timestampField = document.getElementById("timestamp");
timestampField.value = new Date().toLocaleString();

const modalButtons = document.querySelectorAll(".open-modal-btn");
const closeButtons = document.querySelectorAll(".close-modal-btn");

modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const modal = e.target.closest("dialog");
        modal.close();
    });
});
