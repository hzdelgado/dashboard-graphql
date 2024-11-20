"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "../input/PasswordInput";
import { setTokenInCookie } from "@/utils/cookies";
import TextInput from "../input/TextInput";
import { useLoader } from "@/context/LoaderContext";
import { loginUser } from "@/services/authService";

const LoginForm = () => {
    const router = useRouter();
    const { showLoader, hideLoader } = useLoader(); // Hook para manipular el estado de carga global

    // Estados para el formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      showLoader();
      try {
        const userData = await loginUser(email, password);
        // Guardamos el token en una cookie con una fecha de expiración
        console.log('userData', userData)
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("userName", userData.userName);
        localStorage.setItem("userProfile", userData.profile);
        setTokenInCookie(userData.token); // Expira en 1 día
        router.push("/dashboard/home")
      } catch (error: any) {
        setError(error.message);
      } finally {
        hideLoader();
      }
    };
  
    return (
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Ingreso</h2>
          <form onSubmit={handleLogin}>
            {/* Correo */}
            <TextInput
              label="Correo electrónico"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={setEmail}
            />
            {/* Contraseña */}
            <PasswordInput
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={setPassword}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Ingresar
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿No estas registrado?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:underline"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
    );
  };
  
  export default LoginForm;
  