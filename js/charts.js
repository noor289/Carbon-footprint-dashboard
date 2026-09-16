document.addEventListener("DOMContentLoaded", () => {

  const formatNumber = (num) => num.toLocaleString("en-US");

  const isEmpty = (arr) => !arr || arr.length === 0;

  const showEmptyState = (canvasEl, message = "No data available yet.") => {
    const container = canvasEl.parentElement;
    canvasEl.style.display = "none";

    const emptyDiv = document.createElement("div");
    emptyDiv.className = "flex items-center justify-center h-40 text-sm text-text/50";
    emptyDiv.textContent = message;

    container.appendChild(emptyDiv);
  };

  document.getElementById("stat-total").textContent =
    `${formatNumber(dashboardData.stats.totalThisMonth)} kg CO₂e`;

  const change = dashboardData.stats.percentChange;
  const changeEl = document.getElementById("stat-change");
  const arrow = change < 0 ? "↓" : "↑";

  changeEl.textContent = `${arrow} ${formatNumber(Math.abs(change))}%`;
  changeEl.classList.add(change < 0 ? "text-accent" : "text-warm");

  document.getElementById("stat-trees").textContent =
    `${formatNumber(dashboardData.stats.treesEquivalent)} trees`;

  document.getElementById("stat-goal").textContent =
    `${formatNumber(dashboardData.stats.goalProgress)}%`;

  document.getElementById("last-updated").textContent =
    dashboardData.stats.lastUpdated;

  const tipsList = document.getElementById("tips-list");
  tipsList.innerHTML = "";

  if (isEmpty(dashboardData.tips)) {
    tipsList.innerHTML = `
      <li class="flex gap-2 items-start text-text/50">
        <svg class="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21c-4-1-7-5-7-10 0-3 2-6 7-8 5 2 7 5 7 8 0 5-3 9-7 10z" />
          <path stroke-linecap="round" d="M12 21V9" />
        </svg>
        <span>No tips available right now.</span>
      </li>
    `;
  } else {
    dashboardData.tips.forEach(tip => {
      const li = document.createElement("li");
      li.className = "flex gap-2 items-start";
      li.innerHTML = `
        <svg class="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21c-4-1-7-5-7-10 0-3 2-6 7-8 5 2 7 5 7 8 0 5-3 9-7 10z" />
          <path stroke-linecap="round" d="M12 21V9" />
        </svg>
        <span>${tip}</span>
      `;
      tipsList.appendChild(li);
    });
  }

  Chart.defaults.font.family = "Manrope, DM Sans, sans-serif";
  Chart.defaults.color = "#555B55";

  const trendCanvas = document.getElementById("trendChart");

  if (isEmpty(dashboardData.trend.values)) {
    showEmptyState(trendCanvas, "No trend data available yet.");
  } else {
    new Chart(trendCanvas, {
      type: "line",
      data: {
        labels: dashboardData.trend.labels,
        datasets: [{
          label: "CO₂ (kg)",
          data: dashboardData.trend.values,
          borderColor: "#4C9141",
          backgroundColor: "rgba(76, 145, 65, 0.1)",
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#4C9141",
          pointRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#E5E3DB" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  const categoryCanvas = document.getElementById("categoryChart");

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
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 16
            }
          }
        },
        cutout: "65%"
      }
    });
  }

  const comparisonCanvas = document.getElementById("comparisonChart");

  if (isEmpty(dashboardData.comparison.thisMonth)) {
    showEmptyState(comparisonCanvas, "No comparison data available yet.");
  } else {
    new Chart(comparisonCanvas, {
      type: "bar",
      data: {
        labels: dashboardData.comparison.labels,
        datasets: [
          {
            label: "Last Month",
            data: dashboardData.comparison.lastMonth,
            backgroundColor: "#739072",
            borderRadius: 6,
          },
          {
            label: "This Month",
            data: dashboardData.comparison.thisMonth,
            backgroundColor: "#354C3C",
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 16
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#E5E3DB" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

});