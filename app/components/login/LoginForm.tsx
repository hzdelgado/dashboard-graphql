"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "../input/PasswordInput";
import { isValidPassword } from "@/app/utils/validations";
import TextInput from "../input/TextInput";
import { useLoader } from "../../../context/LoaderContext"; // Usamos el hook para controlar el loader

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

      if (!isValidPassword(password)) {
        setError(
          "La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial."
        );
        hideLoader()
        return;
      }

      // Activamos el loader antes de comenzar la operación asíncrona

  
      try {
        // Aquí podrías agregar la lógica para autenticar al usuario
        // por ejemplo, enviar los datos a una API
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          // Redirige al dashboard
          router.push("/");
        } else {
          const data = await response.json();
          setError(data.message || "Login failed");
        }
      } catch (err) {
        setError("An unexpected error occurred");
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
  