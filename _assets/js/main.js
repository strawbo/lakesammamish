document.addEventListener("DOMContentLoaded", function () {
  // Fetch the tab-delimited data
  fetch("https://green2.kingcounty.gov/lake-buoy/Data.aspx")
    .then((response) => response.text())
    .then((data) => {
      // Parse the tab-delimited data
      const parsedData = parseTabDelimitedData(data);

      // Filter the data based on Depth < 1.5
      const filteredData = parsedData.filter((row) => row["Depth (m)"] < 1.5);

      // Extract Date and Temperature fields for charting
      const dates = filteredData.map((row) => row["Date"]);
      const temperatures = filteredData.map((row) => row["Temperature (°C)"]);

      // Create the chart
      createChart(dates, temperatures);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function parseTabDelimitedData(data) {
  const rows = data.trim().split("\n");
  const headers = rows.shift().split("\t");
  return rows.map((row) => {
    const values = row.split("\t");
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = values[index];
    });
    return rowData;
  });
}

function createChart(dates, temperatures) {
  // Create a line chart using Chart.js
  const ctx = document.getElementById("chart-container").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

