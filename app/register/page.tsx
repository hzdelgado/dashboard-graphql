import RegisterForm from "@/components/register/RegisterForm";
import Logo from "@/components/Logo";

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-y-5 h-screen items-center justify-center bg-gray-100 dark:bg-slate-500">
      <Logo src="/images/logo-colored.svg" />
      <RegisterForm />
    </div>
  );
};
export default RegisterPage;
