import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "@/components/input/PasswordInput";
import React from "react";

describe("PasswordInput Component", () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    label: "Password",
    placeholder: "Enter your password",
    testId: "password-input",
    value: "",
    onChange: mockOnChange,
  };

  it("renders the component with the correct label and placeholder", () => {
    render(<PasswordInput {...defaultProps} />);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
  });

  it("renders the input as a password field by default", () => {
    render(<PasswordInput {...defaultProps} />);
    const input = screen.getByTestId("password-input");
    expect(input).toHaveAttribute("type", "password");
  });

  it("toggles password visibility when the toggle button is clicked", () => {
    render(<PasswordInput {...defaultProps} />);
    const input = screen.getByTestId("password-input");
    const toggleButton = screen.getByRole("button", { name: /toggle password visibility/i });

    // Default state should be "password"
    expect(input).toHaveAttribute("type", "password");

    // Click to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    // Click again to hide password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("calls the onChange function when the input value changes", () => {
    render(<PasswordInput {...defaultProps} />);
    const input = screen.getByTestId("password-input");

    fireEvent.change(input, { target: { value: "newpassword" } });
    expect(mockOnChange).toHaveBeenCalledWith("newpassword");
  });

  it("renders the correct icon based on password visibility", () => {
    render(<PasswordInput {...defaultProps} />);
    const toggleButton = screen.getByRole("button", { name: /toggle password visibility/i });

    // Default state should show the "EyeIcon"
    expect(screen.queryByTestId("eye-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("eye-slash-icon")).not.toBeInTheDocument();

    // Click to toggle visibility
    fireEvent.click(toggleButton);

    // Now it should show the "EyeSlashIcon"
    expect(screen.queryByTestId("eye-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("eye-slash-icon")).toBeInTheDocument();
  });
});
