const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const apiKey = "2b9371c098d7d97c93ac2fe2411f46f7";
const latitude = 49.7496;
const longitude = 6.6370;

const url = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);            
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

getWeather();

const displayResults = (data) => {
    currentTemp.innerHTML = `${Math.round(data.main.temp)} &deg;C`;
    captionDesc.textContent = data.weather[0].description;
    weatherIcon.setAttribute("src", `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute("alt", data.weather[0].description);
}