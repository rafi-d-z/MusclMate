import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="card" style={{ backgroundColor: data.colorBasedOnDifficulty }}>
      <img src={data.image} alt={data.title} />
      <div>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default Card;
