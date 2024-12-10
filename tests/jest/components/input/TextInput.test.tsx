import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "@/components/input/TextInput";
import React from "react";

describe("TextInput Component", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    label: "Username",
    type: "text",
    testId: "username-input",
    placeholder: "Enter your username",
    value: "",
    onChange: mockOnChange,
  };

  it("renders the component with the correct label, placeholder, and type", () => {
    render(<TextInput {...defaultProps} />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
    const input = screen.getByTestId("username-input");
    expect(input).toHaveAttribute("type", "text");
  });

  it("calls the onChange function when the input value changes", () => {
    render(<TextInput {...defaultProps} />);
    const input = screen.getByTestId("username-input");

    fireEvent.change(input, { target: { value: "newusername" } });
    expect(mockOnChange).toHaveBeenCalledWith("newusername");
  });

  it("renders with the correct value in the input field", () => {
    render(<TextInput {...defaultProps} value="initialValue" />);
    const input = screen.getByTestId("username-input");
    expect(input).toHaveValue("initialValue");
  });

  it("renders a required field", () => {
    render(<TextInput {...defaultProps} />);
    const input = screen.getByTestId("username-input");
    expect(input).toHaveAttribute("required");
  });
});
