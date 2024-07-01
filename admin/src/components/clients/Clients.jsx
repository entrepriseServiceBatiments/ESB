import React from "react";

const Clients = ({ clients }) => {
  return (
    <div>
      <h1>Clients</h1>
      {clients.map((item) => (
        <div key={item.id}>
          <h1>{item.userName}</h1>
          <p>{item.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default Clients;
