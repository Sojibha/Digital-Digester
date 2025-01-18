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
        label: "Pressure (PPM)",
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
        y: { title: { display: true, text: "Pressure (PPM)", color: "#fff" }}
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
    // Create a notification element
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

    // Remove the notification after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  function fetchData() {
    fetch("http://192.168.0.114")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        const now = new Date();
        const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        // Update displays
        temperatureDisplay.textContent = `Temperature: ${data.temperature.toFixed(2)} °C`;
        humidityDisplay.textContent = `Humidity: ${data.humidity.toFixed(2)} %`;
        pressureDisplay.textContent = `Pressure: ${data.pressure.toFixed(2)} PPM`;

        // Check temperature thresholds and show notifications
        if (data.temperature > 40) {
          showNotification("Temperature is too high! (Above 40°C). Please use a cooler to bring it to 30-40°C.");
        } else if (data.temperature < 30) {
          showNotification("Temperature is too low! (Below 30°C). Please use a heater to bring it to 30-40°C.");
        }

        // Update data history
        dataHistory.time.push(timeLabel);
        dataHistory.temperature.push(data.temperature);
        dataHistory.humidity.push(data.humidity);
        dataHistory.pressure.push(data.pressure);

        // Limit data to 30-minute window
        const maxEntries = 180; // 30 minutes, assuming updates every 10 seconds
        if (dataHistory.time.length > maxEntries) {
          dataHistory.time.shift();
          dataHistory.temperature.shift();
          dataHistory.humidity.shift();
          dataHistory.pressure.shift();
        }

        // Update each chart
        temperatureChart.data.labels = dataHistory.time;
        temperatureChart.data.datasets[0].data = dataHistory.temperature;
        temperatureChart.update();

        humidityChart.data.labels = dataHistory.time;
        humidityChart.data.datasets[0].data = dataHistory.humidity;
        humidityChart.update();

        pressureChart.data.labels = dataHistory.time;
        pressureChart.data.datasets[0].data = dataHistory.pressure;
        pressureChart.update();
      })
      .catch((error) => {
        console.error("Unable to get data:", error.message);
      });
  }

  // Fetch data every 10 seconds
  setInterval(fetchData, 10000);
  fetchData(); // Initial fetch
});
