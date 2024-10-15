import { useState, useEffect } from "react";

export const UseTheme = () => {
  const [isDark, setDark] = useState(false);

  const modeToggler = () => {
    setDark(!isDark);
  };

  useEffect(() => {
    document.body.className = isDark ? "dark-mode" : "light-mode";
  }, [isDark]);

  return { isDarkMode: isDark, modeToggler };
};
