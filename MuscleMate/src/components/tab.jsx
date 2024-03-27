import React from 'react';

const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`tab-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
