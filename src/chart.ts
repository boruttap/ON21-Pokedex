import Chart from 'chart.js/auto';

export const chart = new Chart<"line">(chartCanvas, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{ 
          data: [],
          label: "Infizierte nach x Tagen",
          borderColor: "#3e95cd",
          fill: false
        },
      ]
    },
  });