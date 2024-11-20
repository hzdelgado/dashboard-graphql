// app/not-found.tsx
"use client";

const AccessDenied = () => {
  // Redirigir a una ruta específica (por ejemplo, /home)

  return (
    <div className="dark:text-white p-6">
      <h1 className="font-2xl">Acceso denegado</h1>
      <p>Lo sentimos, el contenido de esta página no esta disponible.</p>
    </div>
  );
};

export default AccessDenied;
