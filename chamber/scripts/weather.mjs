const apiKey = "2b9371c098d7d97c93ac2fe2411f46f7";
const latitude = 10.6433; 
const longitude = -71.6251;
const units = "metric";
const forecastDays = 24;

const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&cnt=${forecastDays}&appid=${apiKey}`

export async function getWeather() {
    try {
        const response = await fetch(urlWeather);
        if (!response.ok) {
            throw new Error(`Error loading data: ${response.text}`);
        }
        const data = await response.json();         
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function getForecast() {
    try {
        const response = await fetch(urlForecast);
        if (!response.ok) {
            throw new Error(`Error loading data: ${response.text()}`);
        }
        const data = await response.json();         
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }    
}