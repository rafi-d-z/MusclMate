import React from 'react';

const Sidebar = ({ links }) => {
  return (
    <div className="sidebar">
      {links.map((link, index) => (
        <a key={index} href={link.href}>{link.title}</a>
      ))}
    </div>
  );
};

export default Sidebar;
