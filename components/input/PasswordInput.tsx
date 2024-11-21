import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 relative">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 dark:text-white"
      >
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id={label}
        className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white dark:bg-black"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 top-5 right-3 flex items-center text-gray-500 hover:text-gray-700"
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;