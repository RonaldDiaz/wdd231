import { setDates } from "./date.mjs";
import { setNavigation } from "./navigation.mjs";
import { places } from "../data/places.mjs";

setNavigation();
setDates();

const cardsContainer = document.querySelector('#discoverContainer');
const modal = document.querySelector("#infoModal");
const closeModalBtn = document.querySelector("#closeModal");
const modalTitle = document.querySelector("#modalTitle");
const modalAddress = document.querySelector("#modalAddress");
const modalBody = document.querySelector("#modalBody");

const displayCards = (places) => {
    const fragment = document.createDocumentFragment();
    places.forEach((place, index) => {
        let card = document.createElement("section");
        card.setAttribute("class", `card discover-card ${place.gridArea}`);

        let placeName = document.createElement("h2");
		placeName.textContent = `${place.name}`;
		
		let placeFigure = document.createElement("figure");
		let placeImage = document.createElement("img");
		placeImage.setAttribute("width", "300");
		placeImage.setAttribute("height", "200");
		placeImage.setAttribute("loading", `${index < 2 ? "eager" : "lazy"}`);
		placeImage.setAttribute("src", `${place.image}`);
		placeImage.setAttribute("alt", `${place.alt}`);
		placeFigure.appendChild(placeImage); 

        let placeAddress = document.createElement("address");
		placeAddress.textContent = `${place.address}`;
		
		let placeDescription = document.createElement("p");
		placeDescription.textContent = `${place.description}`;

		let learnMoreButton = document.createElement("button");
		learnMoreButton.setAttribute("type", "button");
		learnMoreButton.setAttribute("class", "open-modal-btn")
		learnMoreButton.textContent = "Learn More";

		learnMoreButton.addEventListener("click", () => {
			modalTitle.textContent = place.name;
			modalAddress.textContent = place.address;
			modalBody.innerHTML = `
				<p>${place.description}</p>
				<p><strong>Additional Info:</strong> ${place.extraInfo}</p>
			`;
			modal.showModal();
    	});

        card.appendChild(placeName);
        card.appendChild(placeFigure);
        card.appendChild(placeAddress);
        card.appendChild(placeDescription);
        card.appendChild(learnMoreButton);

        fragment.appendChild(card);        
    });
    
	cardsContainer.appendChild(fragment);
}

displayCards(places);

closeModalBtn.addEventListener("click", () => modal.close());

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

const toast = document.querySelector("#visitToast");
const toastMessage = document.querySelector("#toastMessage");
const closeBtn = document.querySelector("#closeToast");

const currentVisit = Date.now();
const lastVisit = localStorage.getItem("lastVisitDate");

if (!lastVisit) {
	toastMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
	const timeDifference = currentVisit - Number(lastVisit);
	const daysDifference = Math.floor(timeDifference / 86400000);

	if (daysDifference < 1) {
		toastMessage.textContent = "Back so soon! Awesome!";
	} else if (daysDifference === 1) {
		toastMessage.textContent = "You last visited 1 day ago.";
	} else {
		toastMessage.textContent = `You last visited ${daysDifference} days ago.`;
	}
}

localStorage.setItem("lastVisitDate", currentVisit);

setTimeout(() => {
	toast.style.display = "flex";
	setTimeout(() => {
		toast.classList.add("show");
	}, 20);
}, 400);

let autoCloseTimer;

const dismissToast = () => {
	toast.classList.remove("show");
	if (autoCloseTimer) {
		clearTimeout(autoCloseTimer);
	}
	setTimeout(() => {
        toast.style.display = "none";
    }, 400);
};

closeBtn.addEventListener("click", dismissToast);

autoCloseTimer = setTimeout(dismissToast, 6400);
