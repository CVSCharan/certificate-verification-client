import React, {
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Initialize theme based on the current time
  const getInitialTheme = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? "light" : "dark";
  };

  const [themeValue, setThemeValue] = useState(getInitialTheme);

  const handleThemeValue = useCallback((content) => {
    setThemeValue(content);
  }, []);

  useEffect(() => {
    // Update theme when the time changes (optional)
    const interval = setInterval(() => {
      setThemeValue(getInitialTheme());
    }, 3600000); // Check every hour

    return () => clearInterval(interval);
  }, []);

  const contextValue = useMemo(
    () => ({
      handleThemeValue,
      themeValue,
    }),
    [handleThemeValue, themeValue]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
