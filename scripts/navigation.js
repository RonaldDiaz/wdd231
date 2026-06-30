const navButton = document.querySelector("#menu");
const navBar = document.querySelector("#nav-bar");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("open");
    navBar.classList.toggle("open");
    const isOpen = navButton.classList.contains("open");
    navButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
})