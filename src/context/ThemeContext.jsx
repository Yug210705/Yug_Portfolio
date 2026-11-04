import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: "xp",
  setTheme: () => {},
  switching: false,
  targetTheme: null,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => localStorage.getItem("yug_theme") || "xp");
  const [switching, setSwitching] = useState(false);
  const [targetTheme, setTargetTheme] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("yug_theme", theme);
  }, [theme]);

  const switchTheme = (newTheme) => {
    if (newTheme === theme) return;
    setTargetTheme(newTheme);
    setSwitching(true);

    // After brief splash, activate new theme
    setTimeout(() => {
      setThemeState(newTheme);
      setTimeout(() => {
        setSwitching(false);
        setTargetTheme(null);
      }, 450);
    }, 700);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: switchTheme, switching, targetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
