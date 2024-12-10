import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

// Test component to consume ThemeContext
const TestComponent = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div>
      <p data-testid="theme-status">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
      <button data-testid="toggle-button" onClick={toggleDarkMode}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    document.documentElement.className = '';
  });

  test('should provide default light mode', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status').textContent).toBe('Light Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('should toggle to dark mode and update localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('theme-status').textContent).toBe('Dark Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');
  });

  test('should toggle back to light mode and update localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton); // Switch to dark mode
    fireEvent.click(toggleButton); // Switch back to light mode

    expect(screen.getByTestId('theme-status').textContent).toBe('Light Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });

  test('should load dark mode from localStorage on mount', () => {
    localStorage.setItem('darkMode', 'true');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status').textContent).toBe('Dark Mode');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('should throw an error when useTheme is used outside ThemeProvider', () => {
    const renderWithoutProvider = () => render(<TestComponent />);

    expect(renderWithoutProvider).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
  });
});
