import React, { useState } from "react";
import "./CustomSelect.css";

function CustomSelect({ options, placeholder, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container" onClick={() => setIsOpen(!isOpen)}>
      <div className="custom-select-display">
        {value || placeholder}
        <span className="custom-select-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="custom-select-options">
          {options.map((option, index) => (
            <li
              key={index}
              className="custom-select-option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
