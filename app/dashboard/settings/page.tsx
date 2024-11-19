"use client"
import InputSwitch from "@/components/input/InputSwitch";
import { useTheme } from "@/context/ThemeContext";

export default function Settings() {
  const { toggleDarkMode } = useTheme();


  return (
    <div className="flex flex-col items-start min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Configuración</h1>

      <div className="flex flex-row justify-between w-full">
        <label>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">Modo oscuro</h3>
        <h3 className="text-lg font-medium dark:text-white">Habilita el modo oscuro del dashboard</h3>
        </label>

          <InputSwitch onToggle={toggleDarkMode}/>
      </div>
    
    </div>
  );
}