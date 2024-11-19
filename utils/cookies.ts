import Cookies from "js-cookie";

// Función para guardar el token en la cookie
export const setTokenInCookie = (token: string) => {
  Cookies.set('auth_token', token, {
    expires: 1,  // Expiración de 1 día
    path: '/',   // Asegura que la cookie sea accesible desde todo el dominio
    sameSite: 'Strict', // Previene que se envíe la cookie en solicitudes cross-site
    secure: true,
  });
};

export const removeAuthTokenCookie = () => {
  // Elimina la cookie 'auth_token'
  Cookies.remove('auth_token', {
    path: '/', // Asegúrate de especificar el mismo path que usaste al configurarla
  });
};