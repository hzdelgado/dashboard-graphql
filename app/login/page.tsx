"use client";
import Logo from "@/components/Logo";
import LoginForm from "@/components/login/LoginForm";
import React from "react";

const LoginPage = () => {

  return (
    <div className="flex flex-col gap-y-5 items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-500">
      <Logo src="/images/logo-colored.svg" />
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
