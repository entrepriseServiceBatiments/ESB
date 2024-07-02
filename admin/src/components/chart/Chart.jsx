import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data, workers, clients }) => {
  const productData = data.map((item) => ({
    name: item.name,
    value: item.value || 1, // Replace with appropriate statistic if available
  }));

  const workerData = workers.map((worker) => ({
    name: worker.userName,
    value: worker.value || 1, // Replace with appropriate statistic if available
  }));

  const clientData = clients.map((client) => ({
    name: client.userName,
    value: client.value || 1, // Replace with appropriate statistic if available
  }));

  return (
    <div className="container">
      <h2>Statistics</h2>
      <div className="chart-container">
        <div className="chart">
          <h3>Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart">
          <h3>Workers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workerData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart">
          <h3>Clients</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart;
