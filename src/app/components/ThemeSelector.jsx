import React, { useState } from 'react';
import { useTheme, themes } from "../context/ThemeContext";
import { SwatchIcon } from '@heroicons/react/16/solid';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4">
      <button
        className="mb-4 text-lg font-semibold flex items-center justify-between"
        onClick={toggleDropdown}
      >
        {/* <FaPalette className="mr-2 text-gray-500" /> */}
        <SwatchIcon className="mr-2 text-white w-6 h-6"/>
      </button>
      {isOpen && (
        <div className="grid grid-cols-2 gap-4">
          {themes.map((t, index) => (
            <button
              key={index}
              onClick={() => toggleTheme(t)}
              className={`p-4 rounded shadow ${
                theme.name === t.name ? "ring-4 ring-offset-2" : ""
              } ${t.bg}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;