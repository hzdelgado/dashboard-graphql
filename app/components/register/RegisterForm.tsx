"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "../input/PasswordInput";
import { isValidPassword } from "../../utils/validations";
import EmailInput from "../input/TextInput";
import TextInput from "../input/TextInput";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 bg-white shadow-md rounded-md"
    >
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Registrarse
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Nombre */}
      <TextInput
              label="Nombre Completo"
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={name}
              onChange={setName}
            />
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
        placeholder="Crea una contraseña"
        value={password}
        onChange={setPassword}
      />

      {/* Confirmar contraseña */}
      <PasswordInput
        label="Confirmar Contraseña"
        placeholder="Confirma tu contraseña"
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
  );
};

export default RegisterForm;
