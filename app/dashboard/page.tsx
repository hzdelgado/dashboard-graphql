"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Para redirigir
import DashboardLayout from "./layout";

const DashboardPage = ({
    children,
  }: {
    children: React.ReactNode;
  })  => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Verifica la autenticación al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("auth_token"); // O puedes usar cookies, etc.
    if (!token) {
      // Si no hay token, redirige al login
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Redirigiendo...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
        {children}
    </DashboardLayout>
  );
};

export default DashboardPage;
