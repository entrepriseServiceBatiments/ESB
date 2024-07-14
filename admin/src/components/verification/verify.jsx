

import React, { useEffect, useState } from "react";
import axios from "axios";
import './WorkersTable.css'

const WorkerTable = () => {
  const [workers, setWorkers] = useState([]);
const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchWorkers();
  }, [refresh]);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/workers");
      setWorkers(response.data);
      setRefresh(!refresh)
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/workers/status/${id}`,
        {
          status: !currentStatus,
        }
      );
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) =>
          worker.idworker === id
            ? { ...worker, status: response.data.status }
            : worker
        )
      );
    } catch (error) {
      console.error("Error updating worker status:", error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {workers.map((worker) => (
          <tr key={worker.idworker}>
            <td>{worker.userName}</td>
            <td>{worker.email}</td>
            <td>{worker.status ? "Active" : "Inactive"}</td>
            <td>
              <button
                onClick={() => toggleStatus(worker.idworker, worker.status)}
              >
                verify
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkerTable;
