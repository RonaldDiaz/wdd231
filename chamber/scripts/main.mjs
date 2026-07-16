import { setDates } from './date.mjs';
import { getMembersData } from './members.mjs';
import { setNavigation } from './navigation.mjs';
import { getForecast, getWeather } from './weather.mjs';

setNavigation();
setDates();

async function initSpotlights() {
    const members = await getMembersData();
    
    if (members.length === 0) return;

    const eligibleMembers = members.filter(member => member.membershipLevel > 1);
    const selectedMembers = getRandomMembers(eligibleMembers, 2);

    displaySpotlights(selectedMembers);
}

function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displaySpotlights(members) {
    const container = document.querySelector('#spotlightGrid');
    const fragment = document.createDocumentFragment();
    members.forEach(member => {
        let card = document.createElement("div");
        card.setAttribute("class", "spotlight card");

        let companyLogo = document.createElement("img");
        companyLogo.setAttribute("src", `images/${member.image}`);
        companyLogo.setAttribute("alt", `${member.companyName} company logo`);
        companyLogo.setAttribute("loading", "lazy");
        companyLogo.setAttribute("height", "240");
        companyLogo.setAttribute("width", "240");

        let membership = document.createElement("p");
        const membershipText = `${member.membershipLevel === 3? "gold":"silver"}`
        membership.setAttribute("class", `membership ${membershipText}`);
        membership.textContent = `${membershipText} Member`;
        let name = document.createElement("h3");
        name.textContent = member.companyName;

        let tag = document.createElement("p");
        tag.setAttribute("class", "tag");
        tag.textContent = member.otherInformation.productiveSector;

        let spotlight = document.createElement("p");
        spotlight.setAttribute("class", "spot-info");
        spotlight.textContent = member.otherInformation.spotlight;

        let address = document.createElement("p");
        address.setAttribute("class", "inlo-line");
        address.innerHTML = `<strong>Address: </strong>${member.companyAddress.street}. ${member.companyAddress.sector}, ${member.companyAddress.parish} Parish.`

        let phone = document.createElement("p");
        phone.setAttribute("class", "inlo-line");
        phone.innerHTML = `<strong>Phone Number: </strong>${member.companyPhoneNumber}`;

        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("target", "_blank");
        link.setAttribute("class", "card-link");
        link.textContent = `${member.companyWebsiteUrl}`;

        card.appendChild(companyLogo);
        card.appendChild(membership);
        card.appendChild(name);
        card.appendChild(tag);
        card.appendChild(spotlight);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(link);

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

initSpotlights();

async function initWeather() {
    const weatherData = await getWeather();
    const forecastData = await getForecast();
    displayWeather(weatherData, forecastData);
}

const displayWeather = (weather, forecast) => {
    const weatherInfo = document.querySelector("#weatherInfo");

    let temperature = document.createElement("p");
    temperature.setAttribute("class", "weather-temp");
    temperature.innerHTML = `${Math.round(weather.main.temp)} &deg;C`

    let weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class", "weather-icon");
    weatherIcon.setAttribute("src", `https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`);
    weatherIcon.setAttribute("alt", weather.weather[0].description);

    let weatherDescription = document.createElement("p");
    weatherDescription.setAttribute("class", "weather-desc");
    weatherDescription.textContent = weather.weather[0].description;

    let weatherDetail = document.createElement("p");
    weatherDetail.setAttribute("class", "weather-detail");
    weatherDetail.textContent = `Humidity: ${weather.main.humidity}% | Wind: ${weather.wind.speed} km/h`;

    weatherInfo.appendChild(temperature);
    weatherInfo.appendChild(weatherIcon);
    weatherInfo.appendChild(weatherDescription);
    weatherInfo.appendChild(weatherDetail);

    let divider = document.createElement("hr");
    divider.setAttribute("class", "weather-divider");
    weatherInfo.appendChild(divider);

    let forecastContainer = document.createElement("div");
    forecastContainer.setAttribute("class", "forecast-container");

    const dailyForecasts = forecast.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(dayData => {
        let dayColumn = document.createElement("div");
        dayColumn.setAttribute("class", "forecast-day");

        const date = new Date(dayData.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        let dayTitle = document.createElement("span");
        dayTitle.setAttribute("class", "forecast-day-name");
        dayTitle.textContent = dayName;

        let dayIcon = document.createElement("img");
        dayIcon.setAttribute("class", "forecast-icon");
        dayIcon.setAttribute("src", `https://openweathermap.org/payload/api/media/file/${dayData.weather[0].icon}.png`);
        dayIcon.setAttribute("alt", dayData.weather[0].description);

        let dayTemp = document.createElement("span");
        dayTemp.setAttribute("class", "forecast-temp");
        dayTemp.innerHTML = `${Math.round(dayData.main.temp)}&deg;C`;

        dayColumn.appendChild(dayTitle);
        dayColumn.appendChild(dayIcon);
        dayColumn.appendChild(dayTemp);

        forecastContainer.appendChild(dayColumn);
    });

    weatherInfo.appendChild(forecastContainer);
}

initWeather();