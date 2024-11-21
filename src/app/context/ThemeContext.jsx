import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const themes = [
  {
    name: "light",
    bg: "bg-white text-black",
    button: "bg-blue-500 hover:bg-blue-700 text-white",
    input: "bg-white text-black",
  },
  {
    name: "light-red",
    bg: "bg-red-300 text-red-900",
    button: "bg-red-500 hover:bg-red-700 text-white",
    input: "bg-red-50 text-red-900",
  },
  {
    name: "light-blue",
    bg: "bg-blue-300 text-blue-900",
    button: "bg-blue-500 hover:bg-blue-700 text-white",
    input: "bg-blue-50 text-blue-900",
  },
  {
    name: "light-green",
    bg: "bg-green-300 text-green-900",
    button: "bg-green-500 hover:bg-green-700 text-white",
    input: "bg-green-50 text-green-900",
  },
  {
    name: "light-violet",
    bg: "bg-violet-300 text-violet-900",
    button: "bg-violet-500 hover:bg-violet-700 text-white",
    input: "bg-violet-50 text-violet-900",
  },
  {
    name: "dark",
    bg: "bg-black text-white",
    button: "bg-blue-500 hover:bg-blue-700 text-white",
    input: "bg-black text-white",
  },
  {
    name: "dark-red",
    bg: "dark: bg-red-900 dark: text-red-300",
    button: "dark: bg-red-700 dark: hover:bg-red-900 text-white",
    input: "dark: bg-red-50 dark: text-red-900",
  },
  {
    name: "dark-blue",
    bg: "dark: bg-blue-900 dark: text-blue-300",
    button: "dark: bg-blue-700 dark: hover:bg-blue-900 text-white",
    input: "dark: bg-blue-50 dark: text-blue-900",
  },
  {
    name: "dark-green",
    bg: "dark: bg-green-900 dark: text-green-300",
    button: "dark: bg-green-700 dark: hover:bg-green-900 text-white",
    input: "dark: bg-green-50 dark: text-green-900",
  },
  {
    name: "dark-violet",
    bg: "dark: bg-violet-900 dark: text-violet-300",
    button: "dark: bg-violet-700 dark: hover:bg-violet-900 text-white",
    input: "dark: bg-violet-50 dark: text-violet-900",
  },
];

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes[5]);

  useEffect(() => {
    const loadTheme = () => {
      try {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
          const parsedTheme = JSON.parse(savedTheme);
          const themeFromStorage = themes.find(t => t.name === parsedTheme.name) || themes[5];
          setTheme(themeFromStorage);
        }
      } catch (error) {
        console.error("Error loading theme from localStorage:", error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    try {
      localStorage.setItem('selectedTheme', JSON.stringify(selectedTheme));
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme, themes };
