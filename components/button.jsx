import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button className="w-8 h-8 flex items-center justify-center btn" onClick={onClick}>
      <span className="w-8 bg-gray-300 p-1">{children}</span>
    </button>
  );
};

export default Button;