// Replace these values with your actual ThingSpeak Channel ID and Read API Key
const CHANNEL_ID = "2795575"; // Your ThingSpeak Channel ID (remove < >)
const READ_API_KEY = "9MZM5ODHVPO3BWRE"; // Your ThingSpeak Read API Key (remove < >)

// Define the API endpoint for fetching data from ThingSpeak
const THINGSPEAK_API_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=1`;

// Variables to store previous temperature and humidity values
let previousTemperature = null;
let previousHumidity = null;

// Function to fetch data from ThingSpeak
async function fetchData() {
    try {
        console.log("Fetching data from ThingSpeak...");
        const response = await fetch(THINGSPEAK_API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched data successfully:", data); // Debugging log
        updateUI(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        updateStatus("Error fetching data", true);
    }
}

// Function to update the displayed values on the page
function updateUI(data) {
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const temperatureBox = document.querySelector('.temperature-box');
    const humidityBox = document.querySelector('.humidity-box');

    // Ensure data exists
    if (!data.feeds || data.feeds.length === 0) {
        console.error("No data found in ThingSpeak response.");
        updateStatus("No data available", true);
        return;
    }

    // Extract the latest data from ThingSpeak
    const latestData = data.feeds[0];  // Get the most recent data entry
    const temperature = parseFloat(latestData.field1);  // Assuming temperature is stored in field1
    const humidity = parseFloat(latestData.field2);  // Assuming humidity is stored in field2

    // Update the temperature and humidity on the page
    temperatureElement.textContent = temperature ? `${temperature} °C` : "N/A";
    humidityElement.textContent = humidity ? `${humidity} %` : "N/A";

    // Check if temperature increased
    if (previousTemperature !== null && temperature > previousTemperature) {
        temperatureBox.classList.add('increase');
        setTimeout(() => temperatureBox.classList.remove('increase'), 10000); // Reset color after 1 second
    }

    // Check if humidity increased
    if (previousHumidity !== null && humidity > previousHumidity) {
        humidityBox.classList.add('increase');
        setTimeout(() => humidityBox.classList.remove('increase'), 10000); // Reset color after 1 second
    }

    // Update previous values
    previousTemperature = temperature;
    previousHumidity = humidity;

    // Update the status message
    updateStatus("Data updated successfully!", false);
}

// Function to update the status message
function updateStatus(message, isError = false) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    statusElement.classList.toggle('error', isError);
}

// Fetch data every 5 seconds
setInterval(fetchData, 5000); // Adjust interval as needed

// Initial data fetch
fetchData();
