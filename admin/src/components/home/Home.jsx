import React from "react";

const Home = ({ data, workers, clients }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
      ))}
      <h2>workers</h2>
      {workers.map((item) => (
        <div key={item.id}>
          <h1>{item.userName}</h1>
          <p>{item.jobTitle}</p>
        </div>
      ))}
      <h3>clients</h3>
      {clients.map((item) => (
        <div key={item.id}>
          <h1>{item.userName}</h1>
          <p>{item.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
