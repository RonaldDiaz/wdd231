const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector("#cards");

async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        //console.table(data.prophets);
        displayProphets(data.prophets);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getProphetData();

const displayProphets = (prophets) => {
    const fragment = document.createDocumentFragment();
    prophets.forEach(prophet => {
        let card = document.createElement("section");
        let prophetName = document.createElement("h2");
        let portrait = document.createElement("img");
        let date = document.createElement("p");
        let place = document.createElement("p");
        
        date.innerHTML = `<span class="label">Date of Birth:</span> ${prophet.birthdate}`;
        place.innerHTML = `<span class="label">Place of Birth:</span> ${prophet.birthplace}`;

        prophetName.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("heigth", "440");
        place.setAttribute("class", "place");

        card.setAttribute("class", "card");

        card.appendChild(prophetName);
        card.appendChild(date);
        card.appendChild(place);
        card.appendChild(portrait);

        fragment.appendChild(card);        
    });

    cards.appendChild(fragment); //By using a fragment at the end, we avoid redrawing the page for each prophet added.
}