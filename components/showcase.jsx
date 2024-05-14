import React from 'react';


const Showcase = ({ children, onClick }) => {
  return (
    <button className="h-8 flex items-center justify-center btn">
      <span className="h-8 bg-gray-300 p-1">{children}</span>
    </button>
  );
};

export default Showcase;