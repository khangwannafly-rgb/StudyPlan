import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartContainer from "./ui/ChartContainer";

ChartJS.register(ArcElement, Tooltip, Legend);

const PINK_PALETTE = [
  "#FF5FA2",
  "#FF7DB6",
  "#FFC7DD",
  "#FF94C8",
  "#FFEAF5",
  "#E64A8D",
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: "65%",
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#FF7DB6",
        font: { family: "Nunito", size: 11 },
        padding: 16,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
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
  animation: {
    animateRotate: true,
    duration: 900,
    easing: "easeOutQuart",
  },
};

function DonutChart({ data }) {
  const labels = data.map((d) => d.subject);
  const values = data.map((d) => d.percent);
  const dataset = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: PINK_PALETTE.slice(0, values.length),
        borderColor: "#FFFFFF",
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <ChartContainer>
      <Doughnut data={dataset} options={chartOptions} />
    </ChartContainer>
  );
}

export default memo(DonutChart);
