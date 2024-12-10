import { render, screen, fireEvent } from "@testing-library/react";
import { LoaderProvider, useLoader } from "@/context/LoaderContext";

// Test component to use LoaderContext
const TestComponent = () => {
  const { loading, showLoader, hideLoader } = useLoader();

  return (
    <div>
      <p data-testid="loader-status">{loading ? "Loading..." : "Not Loading"}</p>
      <button data-testid="show-loader" onClick={showLoader}>
        Show Loader
      </button>
      <button data-testid="hide-loader" onClick={hideLoader}>
        Hide Loader
      </button>
    </div>
  );
};

describe("LoaderContext", () => {
  test("should have default state as not loading", () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    expect(screen.getByTestId("loader-status").textContent).toBe("Not Loading");
  });

  test("should set loading state to true when showLoader is called", () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    const showLoaderButton = screen.getByTestId("show-loader");
    fireEvent.click(showLoaderButton);

    expect(screen.getByTestId("loader-status").textContent).toBe("Loading...");
  });

  test("should set loading state to false when hideLoader is called", () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    const showLoaderButton = screen.getByTestId("show-loader");
    const hideLoaderButton = screen.getByTestId("hide-loader");

    fireEvent.click(showLoaderButton); // Set to loading state
    expect(screen.getByTestId("loader-status").textContent).toBe("Loading...");

    fireEvent.click(hideLoaderButton); // Set back to not loading
    expect(screen.getByTestId("loader-status").textContent).toBe("Not Loading");
  });

  test("should throw an error if useLoader is used outside LoaderProvider", () => {
    const renderWithoutProvider = () => render(<TestComponent />);

    expect(renderWithoutProvider).toThrow(
      "useLoader must be used within a ThemeProvider"
    );
  });
});
