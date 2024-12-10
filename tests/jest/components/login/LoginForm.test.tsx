import '@testing-library/jest-dom';
import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import LoginForm from "@/components/login/LoginForm";
import { useLoader } from "@/context/LoaderContext";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";

// Mock de dependencias externas
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/LoaderContext", () => ({
    useLoader: jest.fn(),
  }));

jest.mock("@/services/authService", () => ({
  loginUser: jest.fn(),
}));

jest.mock("@/utils/cookies", () => ({
  setTokenInCookie: jest.fn(),
}));

describe("LoginForm", () => {
  const mockPush = jest.fn();
  const mockShowLoader = jest.fn();
  const mockHideLoader = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useLoader as jest.Mock).mockReturnValue({
      showLoader: mockShowLoader,
      hideLoader: mockHideLoader,
    });
  });

  it("renders the login form correctly", async () => {
    render(<LoginForm />);

    await waitFor(() => {
        expect(screen.getByText("Ingreso")).toBeInTheDocument();
        expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
        expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Ingresar" })).toBeInTheDocument();
    });
  });

  it("updates email and password fields on input", () => {
    render(<LoginForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("displays an error message when login fails", async () => {
    (loginUser as jest.Mock).mockRejectedValueOnce(new Error("Credenciales inválidas"));

    render(<LoginForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByRole("button", { name: "Ingresar" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    
    await act(async () => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Credenciales inválidas")).toBeInTheDocument();
    });

    expect(mockShowLoader).toHaveBeenCalled();
    expect(mockHideLoader).toHaveBeenCalled();
  });

  it("redirects to dashboard on successful login", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({
      userId: "123",
      userName: "Test User",
      profile: "admin",
      token: "fakeToken",
    });

    render(<LoginForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByRole("button", { name: "Ingresar" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    await act(async () => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard/home");
    });

    expect(mockShowLoader).toHaveBeenCalled();
    expect(mockHideLoader).toHaveBeenCalled();
  });

  it("shows loader during login process", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({
      userId: "123",
      userName: "Test User",
      profile: "admin",
      token: "fakeToken",
    });

    render(<LoginForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByRole("button", { name: "Ingresar" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
  
    await act(async () => {
        fireEvent.click(submitButton);
    });
    await waitFor(() => {
        expect(mockShowLoader).toHaveBeenCalled();
        expect(mockHideLoader).toHaveBeenCalled(); 
    });
  });
});
