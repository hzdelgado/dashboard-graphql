import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SidePanel from "@/components/panel/SidePanel";
import React from "react";

// Datos de prueba
const mockData = {
  name: "John Doe",
  isActive: true,
};

const formStructure = [
  { key: "name", label: "Name", type: "text", editable: true },
  { key: "isActive", label: "Active", type: "switch", editable: true },
];

const mockOnChange = jest.fn();

describe("SidePanel", () => {
  it("renders correctly when isOpen is true", async () => {
    render(
      <SidePanel
        isOpen={true}
        onClose={() => {}}
        title="Test Panel"
        data={mockData}
        onChange={mockOnChange}
        formStructure={formStructure}
      />
    );

    await waitFor(() => {
      // Verificar que el panel y los campos se rendericen correctamente
      expect(screen.getByText("Test Panel")).toBeInTheDocument();
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Active")).toBeInTheDocument();
    });
    
  });

  it("does not render when isOpen is false", () => {
    render(
      <SidePanel
        isOpen={false}
        onClose={() => {}}
        title="Test Panel"
        data={mockData}
        onChange={mockOnChange}
        formStructure={formStructure}
      />
    );
    // Verificar que el panel no se muestre
    expect(screen.queryByText("Test Panel")).not.toBeInTheDocument();
  });

  it("updates form data when text input value changes", () => {
    render(
      <SidePanel
        isOpen={true}
        onClose={() => {}}
        title="Test Panel"
        data={mockData}
        onChange={mockOnChange}
        formStructure={formStructure}
      />
    );

    // Cambiar valor del campo de texto
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Jane Doe" },
    });

    // Verificar que el valor del campo cambió y que onChange se llamó
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockData,
      name: "Jane Doe",
    });
  });

  it("toggles checkbox input and updates form data", () => {
    render(
      <SidePanel
        isOpen={true}
        onClose={() => {}}
        title="Test Panel"
        data={mockData}
        onChange={mockOnChange}
        formStructure={formStructure}
      />
    );

    // Cambiar valor del switch
    fireEvent.click(screen.getByLabelText("Active"));

    // Verificar que el switch cambió y que onChange se llamó
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockData,
      isActive: false,
    });
  });

});
