const dashboardData = {
  stats: {
    totalThisMonth: 284,
    percentChange: -12,
    treesEquivalent: 13,
    goalProgress: 68,
    lastUpdated: "Sep 16, 2026"
  },

  trend: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    values: [340, 322, 355, 310, 298, 284]
  },

  categories: {
    labels: ["Transport", "Energy", "Food", "Waste"],
    values: [98, 112, 54, 20]
  },

  comparison: {
    labels: ["Transport", "Energy", "Food", "Waste"],
    lastMonth: [105, 120, 58, 15],
    thisMonth: [98, 112, 54, 20]
  },

  tips: [
    "Switch one car trip a week to walking or cycling.",
    "Unplug devices on standby to cut phantom energy use.",
    "Try one plant-based meal per day this month.",
    "Set your thermostat 1°C lower, big yearly savings."
  ],

  yearlyHistory: {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    values: [365, 358, 372, 350, 340, 330, 340, 322, 355, 310, 298, 284]
  },

  goal: {
    targetPercent: 30,
    currentPercent: 68,
    targetDate: "2026-12-31",
    baselineMonth: "Oct 2025",
    baselineValue: 372
  }
};