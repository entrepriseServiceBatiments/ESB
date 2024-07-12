import React from "react";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashbord.css";

const Dashboard = ({ data, workers, clients }) => {
  const pieData = {
    labels: ["Workers", "Clients"],
    datasets: [
      {
        data: [workers.length, clients.length],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const lineData = {
    labels: data.map((product) => product.name),
    datasets: [
      {
        label: "Product Stock",
        data: data.map((product) => product.stock),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <div className="chart pie-chart">
          <h3>Workers vs Clients</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart line-chart">
          <h3>Product Stock</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
