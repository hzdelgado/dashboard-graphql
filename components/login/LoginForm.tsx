"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "../input/PasswordInput";
import { isValidPassword } from "@/utils/validations";
import { setTokenInCookie } from "@/utils/cookie";
import TextInput from "../input/TextInput";
import { useLoader } from "@/context/LoaderContext";
import { loginUser } from "@/services/authService";
import Cookies from "js-cookie";

const LoginForm = () => {
    const router = useRouter();
    const { showLoader, hideLoader } = useLoader(); // Hook para manipular el estado de carga global

    // Estados para el formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      // Activamos el loader antes de comenzar la operación asíncrona
      showLoader();

      /*if (!isValidPassword(password)) {
        setError(
          "La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial."
        );
        hideLoader()
        return;
      }*/
  
      try {
        const userData = await loginUser(email, password);
        // Guardamos el token en una cookie con una fecha de expiración
        setTokenInCookie(userData.token); // Expira en 1 día
        router.push("/dashboard")
      } catch (error: any) {
        setError(error.message || "Login failed");
      } finally {
        hideLoader();
      }
    };
  
    return (
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login Dashboard</h2>
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
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
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
  