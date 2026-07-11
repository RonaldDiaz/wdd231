const navButton = document.querySelector("#menuBtn");
const navBar = document.querySelector("#mainNav");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("open");
    navBar.classList.toggle("open");
    const isOpen = navButton.classList.contains("open");
    navButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
})