// components/Switch.tsx
import React from 'react';
import { useState } from 'react';

interface SwitchProps {
  initialState?: boolean; // Estado inicial del switch, por defecto es 'false'
  name?: string;
  onToggle?: (state: boolean) => void; // Función que se ejecuta al cambiar el estado
}

const InputSwitch: React.FC<SwitchProps> = ({ initialState = false, onToggle, name = "switch" }: SwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(initialState);

  // Función para cambiar el estado del switch
  const toggleSwitch = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    if (onToggle) {
      onToggle(newState); // Llamar la función onToggle si se pasó como prop
    }
  };

  return (
    <label htmlFor={name} className="flex items-center cursor-pointer">
      <span className="mr-2 dark:text-white">{isEnabled ? "Activo" : "Inactivo"}</span>
      <div
        onClick={toggleSwitch}
        id={name}
        data-testid="switch"
        className={`relative inline-flex items-center h-6 rounded-full w-11 ${isEnabled ? "bg-green-500" : "bg-gray-300"}`}
      >
        <span
          className={`transform transition-all duration-300 ease-in-out inline-block w-6 h-6 rounded-full bg-white ${isEnabled ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>
    </label>
  );
};

export default InputSwitch;
