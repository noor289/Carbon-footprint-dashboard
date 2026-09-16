document.addEventListener("DOMContentLoaded", () => {
  const goal = dashboardData.goal;
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };
  document.getElementById("goalTargetLabel").textContent = `Target: ${goal.targetPercent}% reduction`;
  document.getElementById("goalBaseline").textContent = `${goal.baselineMonth} (${goal.baselineValue} kg CO₂e)`;
  document.getElementById("goalTargetDate").textContent = formatDate(goal.targetDate);
  document.getElementById("goalProgressLabel").textContent = `${goal.currentPercent}% complete`;
  const progressBar = document.getElementById("goalProgressBar");
  requestAnimationFrame(() => {
    setTimeout(() => {
      progressBar.style.width = `${goal.currentPercent}%`;
    }, 100);
  });
  const submitBtn = document.getElementById("goalSubmitBtn");
  const messageEl = document.getElementById("goalFormMessage");
  const percentInput = document.getElementById("goalPercentInput");
  const dateInput = document.getElementById("goalDateInput");
  submitBtn.addEventListener("click", () => {
    const newPercent = parseFloat(percentInput.value);
    const newDate = dateInput.value;
    if (!newPercent || newPercent <= 0 || newPercent > 100) {
      messageEl.textContent = "Please enter a valid target percentage (1–100).";
      messageEl.classList.remove("text-accent", "hidden");
      messageEl.classList.add("text-warm");
      return;
    }
    document.getElementById("goalTargetLabel").textContent = `Target: ${newPercent}% reduction`;
    if (newDate) {
      document.getElementById("goalTargetDate").textContent = formatDate(newDate);
    }
    const actualReductionSoFar = (goal.currentPercent / 100) * goal.targetPercent;
    const newProgressPercent = Math.min(100, Math.round((actualReductionSoFar / newPercent) * 100));
    progressBar.style.width = `${newProgressPercent}%`;
    document.getElementById("goalProgressLabel").textContent = `${newProgressPercent}% complete`;
    messageEl.textContent = "Goal updated!";
    messageEl.classList.remove("text-warm", "hidden");
    messageEl.classList.add("text-accent");
    percentInput.value = "";
    dateInput.value = "";
  });
});