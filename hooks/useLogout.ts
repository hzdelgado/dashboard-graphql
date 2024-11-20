import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import client from "@/utils/apolloClient";

type UseLogoutHook = {
  logout: () => Promise<void>;
};  
const useLogout = (): UseLogoutHook  => {
  const router = useRouter();

  const logout = async (): Promise<void> => {
    try {
       // Eliminar la cookie 'auth_token'
       Cookies.remove('auth_token', {
        path: '/', // Asegúrate de que el path coincida con el que se usó al configurar la cookie
      });

      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("token");
      client.clearStore();  // Limpiar la cache de Apollo Client

      if (response.ok) {
        // Redirigir al usuario a la página de login
        router.push('/login');
      }

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { logout };
}


export default useLogout;
