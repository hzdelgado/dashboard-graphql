import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { useLoader } from "@/context/LoaderContext";
import OverlayLoader from "@/components/loader/OverlayLoader";
import { MockedProvider } from '@apollo/client/testing';
import React from "react";

jest.mock("@/context/LoaderContext");

describe("OverlayLoader", () => {
  const mockUseLoader = useLoader as jest.Mock;

  it("renders the loader when 'loading' is true", () => {
    mockUseLoader.mockReturnValue({ loading: true }); // Simulamos que loading es true

    render(
      <MockedProvider>
        <OverlayLoader />
      </MockedProvider>
    );

    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument(); // Verifica que el loader está en el DOM
  });

  it("does not render the loader when 'loading' is false", () => {
    mockUseLoader.mockReturnValue({ loading: false }); // Simulamos que loading es false

    render(
      <MockedProvider>
        <OverlayLoader />
      </MockedProvider>
    );

    const loaderElement = screen.queryByTestId("loader");
    expect(loaderElement).not.toBeInTheDocument(); // Verifica que el loader no está en el DOM
  });

  it("applies the correct styles and animation when loading is true", () => {
    mockUseLoader.mockReturnValue({ loading: true });

    render(
      <MockedProvider>
        <OverlayLoader />
      </MockedProvider>
    );

    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toHaveClass("animate-spin");
    expect(loaderElement).toHaveClass("w-16 h-16"); // Verifica las dimensiones del loader
  });
});
