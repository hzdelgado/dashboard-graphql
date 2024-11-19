import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Sesión cerrada' });

  // Elimina la cookie configurando una expiración inmediata
  response.cookies.set('auth_token', '', {
    maxAge: -1, // Expira inmediatamente
    path: '/', // Aplica a todo el sitio
    httpOnly: true, // Solo accesible desde el servidor
    secure: true, // Solo se envía por HTTPS
    sameSite: 'strict', // Protege contra CSRF
  });

  return response;
}
