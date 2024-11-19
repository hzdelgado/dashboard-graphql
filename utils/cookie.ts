import Cookies from "js-cookie";

// Función para guardar el token en la cookie
export const setTokenInCookie = (token: string) => {
  Cookies.set('auth_token', token, {
    expires: 1,  // Expiración de 1 día
    path: '/',   // Asegura que la cookie sea accesible desde todo el dominio
    sameSite: 'Strict', // Previene que se envíe la cookie en solicitudes cross-site
  });
};