// context/ThemeContext.tsx
"use client";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Definir el tipo para el contexto
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Crear el contexto con un valor predeterminado
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Componente proveedor del contexto
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Cargar el estado inicial del tema desde localStorage (si existe)
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Función para alternar entre los modos
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark'); // Añadir clase 'dark'
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark'); // Remover clase 'dark'
        localStorage.setItem('darkMode', 'false');
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
