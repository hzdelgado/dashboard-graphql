import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import client from "@/utils/apolloClient";
import useLogout from "@/hooks/useLogout";
import { renderHook } from "@testing-library/react";

// Mockear dependencias
jest.mock("js-cookie", () => ({
  remove: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/utils/apolloClient", () => ({
  clearStore: jest.fn(),
}));
global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true } as Response)
);

describe("useLogout hook", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Configurar mocks
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("Should delete cookie 'auth_token'", async () => {
    const { result } = renderHook(() => useLogout());

    await result.current.logout();

    expect(Cookies.remove).toHaveBeenCalledWith("auth_token", {
      path: "/",
    });
  });

  it("Should fetch '/api/logout' with POST method", async () => {
    const { result } = renderHook(() => useLogout());

    await result.current.logout();

    expect(fetch).toHaveBeenCalledWith("/api/logout", {
      method: "POST",
    });
  });

  it("Should delete data from localStorage", async () => {
    // Configurar datos iniciales
    localStorage.setItem("userId", "123");
    localStorage.setItem("userName", "Test User");
    localStorage.setItem("userProfile", "admin");
    localStorage.setItem("token", "fakeToken");

    const { result } = renderHook(() => useLogout());

    await result.current.logout();

    expect(localStorage.getItem("userId")).toBeNull();
    expect(localStorage.getItem("userName")).toBeNull();
    expect(localStorage.getItem("userProfile")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("Should clear cache of Apollo Client", async () => {
    const { result } = renderHook(() => useLogout());

    await result.current.logout();

    expect(client.clearStore).toHaveBeenCalled();
  });

  it("Should redirect the user to '/login' if the server response is successfull", async () => {
    const { result } = renderHook(() => useLogout());

    await result.current.logout();

    expect(mockPush).toHaveBeenCalledWith("/login");
  });

});
