interface TextInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id="email"
        className="w-full p-2 border border-gray-300 text-gray-900 rounded focus:ring focus:ring-blue-200 placeholder:text-slate-900 dark:placeholder:text-slate-400 dark:bg-black dark:text-white"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
};

export default TextInput;
