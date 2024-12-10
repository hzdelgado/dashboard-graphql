import '@testing-library/jest-dom';
import InputSwitch from '@/components/input/InputSwitch';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

describe('InputSwitch Component', () => {
  it('renders with the initial state as "Inactivo" by default', () => {
    render(<InputSwitch />);
    expect(screen.getByText('Inactivo')).toBeInTheDocument();
  });

  it('renders with the initial state as "Activo" if initialState is true', () => {
    render(<InputSwitch initialState={true} />);
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });

  it('toggles state when clicked', () => {
    const onToggleMock = jest.fn();
    render(<InputSwitch onToggle={onToggleMock} />);
    // Estado inicial: Inactivo
    const switchElement = screen.getByTestId('switch')
    
    expect(switchElement).toBeInTheDocument();
      // Verificar el estado inicial del switch (debe ser de fondo gris)
    expect(switchElement).toHaveClass("bg-gray-300");

    // Simular clic para activar
    fireEvent.click(switchElement);
    expect(screen.getByText('Activo')).toBeInTheDocument();
    expect(switchElement).toHaveClass("bg-green-500");

    // Verificar que la función onToggle fue llamada con el nuevo estado
    expect(onToggleMock).toHaveBeenCalledWith(true);

    // Simular clic para desactivar
    fireEvent.click(switchElement);
    expect(onToggleMock).toHaveBeenCalledWith(false);
  });

});
