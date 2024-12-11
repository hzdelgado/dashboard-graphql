"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidPassword } from "../../utils/validations";
import { signUpUser } from "@/services/authService";
import { setTokenInCookie } from "@/utils/cookies";
import useLogin from '@/hooks/useLogin';
import { useLoader } from "@/context/LoaderContext";
import dynamic from 'next/dynamic';
import React from "react";
const TextInput = dynamic(() => import("../input/TextInput"), { ssr: false });
const PasswordInput = dynamic(() => import("../input/PasswordInput"), { ssr: false });


const RegisterForm = () => {
  const { login } = useLogin();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoader();

    if (!isValidPassword(password)) {
      setError(
        "La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const userData = await signUpUser(name, email, password);
      await login(userData)
    } catch (error: any) {
      setError(error.message);
    } finally {
      hideLoader();
    }

  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded shadow-md dark:bg-black">

    <form
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6 dark:text-white">
        Registro
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Nombre */}
      <TextInput
              label="Nombre Completo"
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={name}
              testId="fullName"
              onChange={setName}
            />
      {/* Correo */}
      <TextInput
              label="Correo electrónico"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              testId="email"
              onChange={setEmail}
            />

      {/* Contraseña */}
      <PasswordInput
        label="Contraseña"
        placeholder="Crea una contraseña"
        testId="password"
        value={password}
        onChange={setPassword}
      />

      {/* Confirmar contraseña */}
      <PasswordInput
        label="Confirmar Contraseña"
        placeholder="Confirma tu contraseña"
        testId="repeatPassword"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Registrarse
      </button>
    </form>
    <p className="mt-4 text-center text-sm text-gray-900 dark:text-white">
    ¿Ya estas registrad@?{" "}
    <a
      href="/login"
      className="text-indigo-900 underline"
    >
      Ingresa aquí
    </a>
  </p>
  </div>
  );
};

export default RegisterForm;
