import { useRouter } from "next/navigation";
import { setTokenInCookie } from "@/utils/cookies";

type UseLoginHook = {
  login: (userData: any) => Promise<void>;
};  
const useLogin = (): UseLoginHook  => {
  const router = useRouter();

  const login = async (userData: any): Promise<void> => {
    try {
      localStorage.setItem("userId", userData.userId);
      localStorage.setItem("userName", userData.userName);
      localStorage.setItem("userProfile", userData.profile);
      localStorage.setItem("token", userData.token);

      setTokenInCookie(userData.token); // Expira en 1 día
      router.push("/dashboard/home")

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { login };
}


export default useLogin;
