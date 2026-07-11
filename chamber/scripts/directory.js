const membersContainer = document.querySelector("#membersContainer");
const btnGrid = document.getElementById('btn-grid');
const btnList = document.getElementById('btn-list');

btnGrid.addEventListener("click", () => {
    btnGrid.classList.add("active");
    btnList.classList.remove("active");
    membersContainer.classList.remove("list-view");
    membersContainer.classList.add("grid-view");
})

btnList.addEventListener("click", () => {
    btnGrid.classList.remove("active");
    btnList.classList.add("active");
    membersContainer.classList.remove("grid-view");
    membersContainer.classList.add("list-view");
})

const url = "data/members.json";
getMembersData();

async function getMembersData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }    
}

const displayMembers = (members) => {
    const fragment = document.createDocumentFragment();
    members.forEach(member => {
        let card = document.createElement("section");
        card.setAttribute("class", "card");

        let companyName = document.createElement("h2");
        companyName.textContent = `${member.companyName}`;

        let companyTagline = document.createElement("p");
        companyTagline.setAttribute("class", "company-tagline");
        companyTagline.textContent = `${member.otherInformation.productiveSector}`;

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let companyLogo = document.createElement("img");
        companyLogo.setAttribute("src", `images/${member.image}`);
        companyLogo.setAttribute("alt", `${member.companyName} company logo`);
        companyLogo.setAttribute("loading", "lazy");
        companyLogo.setAttribute("height", "240");
        companyLogo.setAttribute("width", "240");

        let infoContainer = document.createElement("div");
        infoContainer.setAttribute("class", "company-info");

        let phone = document.createElement("p");
        phone.textContent = `${member.companyPhoneNumber}`;

        let email = document.createElement("p");
        email.textContent = `${member.companyMail}`;

        let urlElement = document.createElement("p");
        urlElement.textContent = `${member.companyWebsiteUrl}`;

        infoContainer.appendChild(email);
        infoContainer.appendChild(phone);
        infoContainer.appendChild(urlElement);

        cardBody.appendChild(companyLogo);
        cardBody.appendChild(infoContainer);

        card.appendChild(companyName);
        card.appendChild(companyTagline);
        card.appendChild(cardBody);

        fragment.appendChild(card);        
    });
    membersContainer.appendChild(fragment);
}