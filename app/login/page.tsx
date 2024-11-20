"use client";
import Logo from "@/components/Logo";
import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {

  return (
    <div className="flex flex-col gap-y-5 items-center justify-center min-h-screen bg-gray-100">
      <Logo src="/images/logo-colored.svg" />
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
