document.addEventListener("DOMContentLoaded", () => {

  const formatNumber = (num) => num.toLocaleString("en-US");

  const isEmpty = (arr) => !arr || arr.length === 0;

  const showEmptyState = (canvasEl, message = "No data available yet.") => {
    const container = canvasEl.parentElement;
    canvasEl.style.display = "none";
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "flex items-center justify-center h-40 text-sm text-muted";
    emptyDiv.textContent = message;
    container.appendChild(emptyDiv);
  };

  Chart.defaults.font.family = "Manrope, DM Sans, sans-serif";
  Chart.defaults.color = "#555B55";

  const yearlyCanvas = document.getElementById("yearlyTrendChart");
  if (isEmpty(dashboardData.yearlyHistory.values)) {
    showEmptyState(yearlyCanvas, "No yearly data available yet.");
  } else {
    new Chart(yearlyCanvas, {
      type: "line",
      data: {
        labels: dashboardData.yearlyHistory.labels,
        datasets: [{
          label: "CO₂ (kg)",
          data: dashboardData.yearlyHistory.values,
          borderColor: "#4C9141",
          backgroundColor: "rgba(76, 145, 65, 0.1)",
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#4C9141",
          pointRadius: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: "#E5E3DB" } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  const categoryCanvas = document.getElementById("reportsCategoryChart");
  if (isEmpty(dashboardData.categories.values)) {
    showEmptyState(categoryCanvas, "No category data available yet.");
  } else {
    new Chart(categoryCanvas, {
      type: "doughnut",
      data: {
        labels: dashboardData.categories.labels,
        datasets: [{
          data: dashboardData.categories.values,
          backgroundColor: ["#354C3C", "#739072", "#5FAF9B", "#9A5435"],
          borderColor: "#F7F7F2",
          borderWidth: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, padding: 16 } }
        },
        cutout: "65%"
      }
    });
  }

  const tableBody = document.getElementById("reportsTableBody");
  const { labels, values } = dashboardData.yearlyHistory;

  if (isEmpty(values)) {
    tableBody.innerHTML = `<tr><td colspan="3" class="py-4 text-muted">No history available yet.</td></tr>`;
  } else {
    tableBody.innerHTML = "";
    values.forEach((value, i) => {
      const prevValue = i > 0 ? values[i - 1] : null;
      let changeText = "—";
      let changeClass = "text-muted";

      if (prevValue !== null) {
        const change = ((value - prevValue) / prevValue) * 100;
        const rounded = Math.round(change * 10) / 10;
        const arrow = rounded < 0 ? "↓" : rounded > 0 ? "↑" : "→";
        changeText = `${arrow} ${Math.abs(rounded)}%`;
        changeClass = rounded < 0 ? "text-accent" : rounded > 0 ? "text-warm" : "text-muted";
      }

      const row = document.createElement("tr");
      row.className = "border-b border-black/5 last:border-0";
      row.innerHTML = `
        <td class="py-3 pr-4">${labels[i]}</td>
        <td class="py-3 pr-4 font-medium text-primary">${formatNumber(value)}</td>
        <td class="py-3 pr-4 ${changeClass}">${changeText}</td>
      `;
      tableBody.appendChild(row);
    });
  }

});