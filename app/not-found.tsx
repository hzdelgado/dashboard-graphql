// app/not-found.tsx
"use client";
import { redirect } from 'next/navigation';

const NotFound = () => {
  // Redirigir a una ruta específica (por ejemplo, /home)
  redirect('/login');  // Aquí puedes cambiar '/home' a cualquier ruta que desees

  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, esta página no existe.</p>
    </div>
  );
};

export default NotFound;
