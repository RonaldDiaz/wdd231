const navButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navBar.classList.toggle("show");
})

const year = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
year.innerHTML = currentYear;
document.getElementById("lastModified").innerHTML = document.lastModified;


