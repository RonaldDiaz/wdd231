import { setDates } from './date.mjs';
import { setNavigation } from './navigation.mjs';

setNavigation();
setDates();

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
    root: null,
    rootMargin: "-100px 0px -40% 0px", 
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            
            navLinks.forEach((link) => link.classList.remove("current"));
            
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("current");
        }
    });
}, observerOptions);

sections.forEach((section) => observer.observe(section));