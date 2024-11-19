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
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id="email"
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
};

export default TextInput;
