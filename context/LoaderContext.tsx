"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Crear el contexto del loader
const LoaderContext = createContext<any>(null);

// Proveedor para envolver la aplicación y manejar el estado global del loader
export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Hook personalizado para acceder al estado de carga
export const useLoader = () => useContext(LoaderContext);
