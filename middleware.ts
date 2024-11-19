import { NextRequest, NextResponse } from "next/server";

// Esta función se ejecuta para todas las rutas de la aplicación
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token');
  // Rutas a proteger
  if (!authToken?.value || authToken.value.length <= 0) {
    // Si no está autenticado, redirige a la página de login
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [ '/dashboard/:path*'], // Aplica a rutas de dashboard
};