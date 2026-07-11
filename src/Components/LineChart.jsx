import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ChartContainer from "./ui/ChartContainer";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#201822",
      bodyColor: "#FF5FA2",
      borderColor: "#F5D8E6",
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      titleFont: { family: "Fredoka", weight: "bold", size: 13 },
      bodyFont: { family: "Nunito", size: 12 },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#FF7DB6", font: { family: "Nunito", size: 11 } },
    },
    y: {
      grid: { color: "rgba(245, 216, 230, 0.4)" },
      ticks: { color: "#FF7DB6", font: { family: "Nunito", size: 11 } },
      beginAtZero: true,
    },
  },
  animation: {
    duration: 800,
    easing: "easeOutQuart",
  },
};

function LineChart({ data }) {
  const labels = data.map((d) => d.date.slice(5));
  const dataset = {
    labels,
    datasets: [
      {
        label: "Hours",
        data: data.map((d) => d.hours),
        fill: true,
        backgroundColor: "rgba(255, 95, 162, 0.12)",
        borderColor: "#FF5FA2",
        borderWidth: 2.5,
        pointBackgroundColor: "#FF5FA2",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
      },
    ],
  };

  return (
    <ChartContainer>
      <Line data={dataset} options={chartOptions} />
    </ChartContainer>
  );
}

export default memo(LineChart);
