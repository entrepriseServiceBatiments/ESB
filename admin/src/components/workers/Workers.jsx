import React from "react";

const Workers = ({ workers }) => {
  return (
    <div>
      <h1>Workers</h1>
      {workers.map((item) => (
        <div key={item.id}>
          <h1>{item.userName}</h1>
          <p>{item.jobTitle}</p>
        </div>
      ))}
    </div>
  );
};

export default Workers;
