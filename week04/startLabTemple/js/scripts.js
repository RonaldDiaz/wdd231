import { temples, url } from "../data/temples.js";

const imagesContainer = document.querySelector("#showHere");
const dialog = document.querySelector("#myDialog");
const templeName = document.querySelector("#myDialog h2");
const closeButton = document.querySelector("#myDialog button");
const templeInformation = document.querySelector("#myDialog p");

closeButton.addEventListener("click", () => 
    dialog.close()
);

displayTemples();

function displayTemples() {
    temples.forEach(temple => {
        const image = document.createElement("img");
        image.src = `${url}${temple.path}`;
        image.alt = temple.name;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;
        image.addEventListener("click", () => showTempleInfo(temple));

        imagesContainer.appendChild(image);
    })
}

function showTempleInfo(temple) {
    templeName.textContent = temple.name;
    templeInformation.innerHTML = `
        <strong>Dedicated: </strong>${temple.dedicated}<br>
        <strong>Person: </strong>${temple.person}<br>    
    `
    dialog.showModal();
}
