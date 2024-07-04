import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WorkersTable.css";

const WorkersTable = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/workers");
        setWorkers(response.data);
        setLoading(false);
        setRefresh(!refresh);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [refresh]);

  const toggleStatus = async (workerId, currentStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/workers/${workerId}`,
        {
          status: !currentStatus,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="workers-container">
      <h2 className="table-title">Workers List</h2>
      <table className="workers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.idworker}>
              <td>{worker.idworker}</td>
              <td>{worker.userName}</td>
              <td>{worker.jobTitle}</td>
              <td>{worker.status ? "verified" : "Inactive"}</td>
              <td>
                <button
                  className="status-btn"
                  onClick={() => toggleStatus(worker.idworker, worker.status)}
                >
                  {worker.status ? "Inactive" : "verified"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkersTable;
