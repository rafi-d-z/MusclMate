import React from 'react';
import Tab from './Tab';

const TabList = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="tab-list">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={tab.id === activeTab}
          onClick={() => onTabClick(tab.id)}
        />
      ))}
    </div>
  );
};

export default TabList;
