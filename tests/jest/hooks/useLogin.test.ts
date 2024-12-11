import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import client from "@/utils/apolloClient";
import useLogout from "@/hooks/useLogout";
import { renderHook } from "@testing-library/react";
import useLogin from "@/hooks/useLogin";

// Mockear dependencias
jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUser = {
  token: "fakeToken",
  email: "test@example.com",
  userId: "123",
  userName: "Test User",
  profile: "admin",
};

describe("useLogin hook", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Configurar mocks
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("Should set cookie 'auth_token'", async () => {
    const { result } = renderHook(() => useLogin());

    await result.current.login({token: 'fake_token'});

    expect(Cookies.set).toHaveBeenCalledWith('auth_token', 'fake_token', {
    expires: 1,
    path: '/',  
    sameSite: 'Strict', 
    secure: true, 
  });
  });


  it("Should set data in localStorage", async () => {
   
    const { result } = renderHook(() => useLogin());

    await result.current.login(mockUser);

    expect(localStorage.getItem("userId")).toBe("123");
    expect(localStorage.getItem("userName")).toBe("Test User");
    expect(localStorage.getItem("userProfile")).toBe("admin");
    expect(localStorage.getItem("token")).toBe("fakeToken");
  });


  it("Should redirect the user to '/dashboard/home' if the server response is successfull", async () => {
    const { result } = renderHook(() => useLogin());

    await result.current.login(mockUser);

    expect(mockPush).toHaveBeenCalledWith("/dashboard/home");
  });

});
