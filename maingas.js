document.addEventListener("DOMContentLoaded", function () {
  const temperatureDisplay = document.getElementById("temperature-display");
  const humidityDisplay = document.getElementById("humidity-display");
  const pressureDisplay = document.getElementById("pressure-display");

  // Initialize chart instances
  const temperatureCtx = document.getElementById("temperature-chart").getContext("2d");
  const humidityCtx = document.getElementById("humidity-chart").getContext("2d");
  const pressureCtx = document.getElementById("pressure-chart").getContext("2d");

  const temperatureChart = new Chart(temperatureCtx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Temperature (°C)",
        data: [],
        borderColor: "red",
        borderWidth: 2,
        fill: false,
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Time", color: "#fff" }},
        y: { title: { display: true, text: "Temperature (°C)", color: "#fff" }}
      }
    }
  });

  const humidityChart = new Chart(humidityCtx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Humidity (%)",
        data: [],
        borderColor: "yellow",
        borderWidth: 2,
        fill: false,
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Time", color: "#fff" }},
        y: { title: { display: true, text: "Humidity (%)", color: "#fff" }}
      }
    }
  });

  const pressureChart = new Chart(pressureCtx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Pressure (kPa)",
        data: [],
        borderColor: "green",
        borderWidth: 2,
        fill: false,
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Time", color: "#fff" }},
        y: { title: { display: true, text: "Pressure (kPa)", color: "#fff" }}
      }
    }
  });

  // Data history for each parameter
  let dataHistory = {
    time: [],
    temperature: [],
    humidity: [],
    pressure: [],
  };

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.padding = "15px 20px";
    notification.style.backgroundColor = "#ff4c4c";
    notification.style.color = "#fff";
    notification.style.borderRadius = "5px";
    notification.style.fontWeight = "bold";
    notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    notification.style.zIndex = "1000";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  async function fetchData() {
    const channelID = "2812999"; // Replace with your ThingSpeak channel ID
    const readAPIKey = "UGC13Z4WE14XTA80"; // Replace with your ThingSpeak read API key
    const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}&results=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (data.feeds.length > 0) {
        const latestFeed = data.feeds[0];
        const now = new Date(latestFeed.created_at);
        const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        const temperature = parseFloat(latestFeed.field1);
        const humidity = parseFloat(latestFeed.field2);
        const pressure = parseFloat(latestFeed.field3);

        // Update displays
        temperatureDisplay.textContent = `Temperature: ${temperature.toFixed(2)} °C`;
        humidityDisplay.textContent = `Humidity: ${humidity.toFixed(2)} %`;
        pressureDisplay.textContent = `Pressure: ${pressure.toFixed(2)} Pa`;

        // Check temperature thresholds and show notifications
        if (temperature > 40) {
          showNotification("Temperature is too high! (Above 40°C). Please use a cooler to bring it to 30-40°C.");
        } else if (temperature < 30) {
          showNotification("Temperature is too low! (Below 30°C). Please use a heater to bring it to 30-40°C.");
        }

        // Update data history
        dataHistory.time.push(timeLabel);
        dataHistory.temperature.push(temperature);
        dataHistory.humidity.push(humidity);
        dataHistory.pressure.push(pressure);

        const maxEntries = 180;
        if (dataHistory.time.length > maxEntries) {
          dataHistory.time.shift();
          dataHistory.temperature.shift();
          dataHistory.humidity.shift();
          dataHistory.pressure.shift();
        }

        // Update charts
        temperatureChart.data.labels = dataHistory.time;
        temperatureChart.data.datasets[0].data = dataHistory.temperature;
        temperatureChart.update();

        humidityChart.data.labels = dataHistory.time;
        humidityChart.data.datasets[0].data = dataHistory.humidity;
        humidityChart.update();

        pressureChart.data.labels = dataHistory.time;
        pressureChart.data.datasets[0].data = dataHistory.pressure;
        pressureChart.update();
      }
    } catch (error) {
      console.error("Unable to fetch data:", error.message);
    }
  }

  // Fetch data every 10 seconds
  setInterval(fetchData, 10000);
  fetchData(); // Initial fetch
});
