import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Esta función se ejecuta para todas las rutas de la aplicación
export function middleware(request: NextRequest) {
  const isAuthenticated = checkIfUserIsAuthenticated(request); // Función personalizada de autenticación

  // Rutas a proteger
  if (request.nextUrl.pathname.startsWith("/dashboard") && !isAuthenticated) {
    // Si no está autenticado, redirige a la página de login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    // Si no está autenticado, redirige a la página de login
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Función de verificación de autenticación (puedes personalizarla según tus necesidades)
function checkIfUserIsAuthenticated(request: NextRequest) {
  // Aquí verificas si el usuario está autenticado.
  // Puede ser a través de cookies, tokens en headers, etc.
  const token = request.cookies.get("auth_token");

  return token !== undefined; // Verifica si el token existe
}